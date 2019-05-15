
from django.db import models
from django.contrib.auth.models import User
from django.db import models

# Create your models here.


class Location(models.Model):
    name = models.CharField(max_length=50)
    address = models.TextField(max_length=100)


class Cinema(models.Model):
    name = models.CharField(max_length=50)
    image_url = models.CharField(max_length=255,
                                 default='https://experienceluxury.co/wp-content/uploads/2016/08/private-cinema.jpg')
    contact = models.CharField(max_length=100, default='+7 (702) 232 78 87')
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='cinemas')


class Movie(models.Model):
    name = models.CharField(max_length=50)
    price = models.IntegerField(default=1500)
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE,related_name='movies')
    image_url = models.CharField(max_length=255,
                                 default='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ6gu_chwEZr3JKjCwec5bDeh8CdeVEz3iqvhzL6MYAa6bb4rU')

    class Meta:
        verbose_name = 'Movie'
        verbose_name_plural = 'Movies'

    def __str__(self):
        return '{}'.format(self.name)

    def to_json_list(self):
        return {
            'id': self.id,
            'name': self.name,
        }

    def to_json_detail(self):
        return {
            'id': self.id,
            'name': self.name,
            'price': self.price,
            'cinema': self.cinema,
        }


class Review(models.Model):
    text = models.TextField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    cinema = models.ForeignKey(Cinema, on_delete=models.CASCADE,
                              related_name='reviews')

    def __str__(self):
        return '{}: {}'.format(self.user, self.cinema)


class FilmManager(models.Manager):
    def for_user(self, user):
        return self.filter(user=user)


class Ticket(models.Model):
    movie_name = models.CharField(max_length=50)
    count = models.IntegerField()
    user = models.ForeignKey(User, on_delete=models.CASCADE, default=1)

    objects = FilmManager()

    def __str__(self):
        return '{}: {}'.format(self.movie_name, self.count)
