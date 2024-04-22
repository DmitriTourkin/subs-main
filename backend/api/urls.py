from django.urls import path, include
from rest_framework.routers import SimpleRouter

from api import views

router = SimpleRouter()

router.register('users', views.CustomUserViewSet)
router.register('categories', views.CategoriesViewSet)
router.register('subscription', views.SubscriptionViewSet)


urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('djoser.urls.authtoken'))
]