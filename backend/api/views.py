from rest_framework import viewsets
from djoser.views import UserViewSet
from rest_framework.permissions import AllowAny

from users.models import User
from subscription.models import Сategories, Subscription

from django_filters.rest_framework import DjangoFilterBackend

from api import serializers

from api.filters import SubFilter

from api import permissions


class CustomUserViewSet(UserViewSet):
    queryset = User.objects.all()
    serializer_class = serializers.CustomUserSerializer
    pagination_class = None

    def get_permissions(self):
        if self.action == 'list':
            return [AllowAny()]
        return super().get_permissions()


class CategoriesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Сategories.objects.all()
    serializer_class = serializers.СategoriesSerializer
    pagination_class = None


class SubscriptionViewSet(viewsets.ModelViewSet):
    queryset = Subscription.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_class = SubFilter

    http_method_names = ['get', 'post', 'delete', 'patch']

    def perform_create(self, serializer):
        author_id = self.request.data.get('author')  # Получить ID автора из запроса
        serializer.save(author_id=author_id)  # Сохранить ID автора вместо объекта пользователя


    def get_serializer_class(self):
        if self.action in ('list', 'retrieve'):
            return serializers.SubscriptionSerializer
        return serializers.NewSubscriptionSerializer
