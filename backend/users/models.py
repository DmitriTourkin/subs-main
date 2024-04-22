from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    username = models.CharField(max_length=200,
                                unique=True,
                                blank=False,
                                null=False,
                                verbose_name='Никнейм')

    email = models.EmailField(max_length=200,
                              unique=True,
                              blank=False,
                              null=False,
                              verbose_name="Почта")

    first_name = models.CharField(max_length=200,
                                  blank=False,
                                  null=False,
                                  verbose_name="Имя")

    last_name = models.CharField(max_length=200,
                                 blank=False,
                                 null=False,
                                 verbose_name="Фамилия")

    password = models.CharField(max_length=200,
                                verbose_name="Пароль")

    telephone = models.CharField(max_length=20,
                                 verbose_name="Телефон")

    def __str__(self):
        return self.username
