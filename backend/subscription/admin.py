from django.contrib import admin

# Register your models here.
from .models import Сategories, Subscription

admin.site.register(Сategories)
admin.site.register(Subscription)