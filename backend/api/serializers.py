from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from rest_framework.exceptions import ValidationError

from users.models import User
from subscription.models import Сategories, Subscription

from djoser.serializers import UserCreateSerializer, UserSerializer
from rest_framework import serializers
from rest_framework.validators import UniqueValidator


class CustomUserCreateSerializer(UserCreateSerializer):
    username = serializers.CharField(
        max_length=200, required=True)

    email = serializers.EmailField(max_length=200, required=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                  'password', 'telephone')


class CustomUserSerializer(UserSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name',
                  'password', 'telephone')


class СategoriesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Сategories
        fields = '__all__'


class SubscriptionSerializer(serializers.ModelSerializer):
    categories = СategoriesSerializer(many=True)
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Subscription
        fields = ('id', 'author', 'name', 'categories', 'price',
                  'subscription_date', 'period')


class NewSubscriptionSerializer(serializers.ModelSerializer):
    categories = PrimaryKeyRelatedField(queryset=Сategories.objects.all(),
                                        many=True)
    author = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())

    class Meta:
        model = Subscription
        fields = ('id', 'author', 'name', 'categories', 'price',
                  'subscription_date', 'period')

    def validate(self, data):
        period = data.get('period')
        subscription_date = data.get('subscription_date')
        price = data.get('price')
        categories = data.get('categories')
        if not price or not categories or not subscription_date or not period:
            raise ValidationError('Надо указать обязательные поля!')
        return data

    def create(self, validated_data):
        categories_data = validated_data.get('categories')
        validated_data.pop('categories', None)
        subscription = Subscription.objects.create(**validated_data)
        subscription.categories.set(categories_data)
        return subscription

    def update(self, subscription, validated_data):
        categories_data = validated_data.get('categories')
        validated_data.pop('categories', None)
        subscription = super().update(subscription, validated_data)
        subscription.tags.set(categories_data)
        return subscription

    def to_representation(self, instance):
        return SubscriptionSerializer(instance, context=self.context).data
