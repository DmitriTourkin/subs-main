from django.db import models

from users.models import User


class Сategories(models.Model):
    name = models.CharField(max_length=200,
                            verbose_name='Название', unique=True)
    slug = models.SlugField(max_length=300,
                            verbose_name='Cлаг', unique=True)

    class Meta:
        verbose_name = 'Категории'

    def __str__(self):
        return self.name


class Subscription(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE,
                               verbose_name='Автор подписки')
    name = models.CharField(max_length=200,
                            verbose_name='Название')
    categories = models.ManyToManyField(Сategories, verbose_name='Категории')
    price = models.IntegerField(default=0, verbose_name='Цена за подписку')
    subscription_date = models.DateTimeField(verbose_name=
                                             'Дата первого списания',
                                             auto_now_add=False)
    period = models.IntegerField(default=0, verbose_name='Период списания')
    pub_date = models.DateTimeField(verbose_name='Дата', auto_now_add=True)

    class Meta:
        verbose_name = 'Подписка'
        ordering = ['-pub_date']

    def __str__(self):
        return self.name
