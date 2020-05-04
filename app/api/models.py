from django.db import models
from django.utils.translation import gettext as _
from django.contrib.auth.models import User as auth_User
from django.core.validators import MaxLengthValidator, MinValueValidator


class Movie(models.Model):
    title = models.CharField(_("Movie"), max_length=32)
    description = models.TextField(_("Description"), max_length=360)


class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    user = models.ForeignKey(auth_User, on_delete=models.CASCADE)
    stars = models.IntegerField(_("stars"), validators=[MinValueValidator(1), MaxLengthValidator(5)])

    class Meta:
        unique_together = (('user', 'movie'))
        index_together = (('user', 'movie'))
