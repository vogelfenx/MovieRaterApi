from django.contrib.auth.models import User as auth_User
from django.core.validators import MaxValueValidator, MinValueValidator
from django.db import models
from django.utils.translation import gettext as _


class Movie(models.Model):
    title = models.CharField(_("Movie"), max_length=32)
    description = models.TextField(_("Description"), max_length=360)
    added_by_user = models.ForeignKey(auth_User, on_delete=models.CASCADE)

    def no_of_ratings(self):
        ratings = Rating.objects.filter(movie=self)
        return len(ratings)

    def avg_rating(self):
        sum = 0
        ratings = Rating.objects.filter(movie=self)

        for rating in ratings:
            sum += rating.stars

        if len(ratings) > 0:
            return sum / len(ratings)
        else:
            return 0


class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(auth_User, on_delete=models.CASCADE)
    stars = models.IntegerField(_("stars"), validators=[MinValueValidator(1), MaxValueValidator(5)])

    class Meta:
        unique_together = (('user', 'movie'))
        index_together = (('user', 'movie'))
