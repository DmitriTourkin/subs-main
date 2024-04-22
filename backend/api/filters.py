import django_filters
from django_filters.rest_framework import FilterSet, filters

from subscription.models import Subscription, Сategories


class SubFilter(FilterSet):
    categories = django_filters.ModelMultipleChoiceFilter(
        field_name='categories__slug',
        to_field_name='slug',
        queryset=Сategories.objects.all())

    class Meta:
        model = Subscription
        fields = ['author', 'categories']
