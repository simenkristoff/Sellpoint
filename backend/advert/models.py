from django.utils import timezone
from dateutil.relativedelta import relativedelta
from django.db import models

from django.contrib.auth.models import User


def advert_directory_path(instance, filename):

    return f'advertiser_{instance.user.id}/{filename}'


class Advert(models.Model):
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="advertiserID")
    title = models.CharField(max_length=100)
    link = models.URLField(max_length=200, null=True)
    duration = models.IntegerField(default=1, null=False)
    active = models.BooleanField(default=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title

    @property
    def expiry_date(self):
        return self.created_date + relativedelta(weeks=self.duration)

    class Meta:
        ordering = ['-created_date']


class AdvertImage(models.Model):
    advert = models.ForeignKey(Advert, default=None, on_delete=models.CASCADE)
    image = models.FileField(upload_to='images/')

    def __str__(self):
        return self.name
