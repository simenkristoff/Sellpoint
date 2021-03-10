from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User

CATEGORY_CHOICES = [
    ('Category name', 'Category name')
]


def user_directory_path(instance, filename):

    # file will be uploaded to sellpoint/backend/media/user_<id>/product_id_<pk>/<filename>
    return f'user_{instance.owner.id}/{filename}'


class ProductListing(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="ownerID")
    purchaser = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, related_name="purchaserID")
    upload_date = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    title = models.CharField(max_length=50)
    description = models.TextField(default=None, blank=True, null=True)
    has_been_sold = models.BooleanField(default=False)
    category = models.CharField(
        choices=CATEGORY_CHOICES, max_length=20, blank=True, null=True)
    image = models.ImageField(
        upload_to=user_directory_path, blank=True, null=True)

    class Meta:
        ordering = ['-upload_date']
