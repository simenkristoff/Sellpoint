from django.db import models
from django.contrib.auth.models import User, Group
from django.core.validators import MaxValueValidator, MinValueValidator

# Initialize Custom User-groups
default_group, created = Group.objects.get_or_create(name='default')
admin_group, created = Group.objects.get_or_create(name='admin')
advert_group, created = Group.objects.get_or_create(name='advertiser')

class UserRating(models.Model):
    rated = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rated")
    rater = models.ForeignKey(User, on_delete=models.CASCADE, related_name="rater")
    rating = models.IntegerField(default=1, validators=[MaxValueValidator(5), MinValueValidator(1)])

    class Meta:
        unique_together = ('rated', 'rater')