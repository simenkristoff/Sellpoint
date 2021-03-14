from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User


def user_directory_path(instance, filename):

    return f'advertiser_{instance.user.id}/{filename}'


class Advert(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="advertiserID")
    title = models.CharField(max_length=50)
    duration = models.IntegerField(default=1, null=False)
    active = models.BooleanField(default=True)
    image = models.ImageField(
        upload_to=user_directory_path, blank=True, null=True)
    date_created = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-date_created']
