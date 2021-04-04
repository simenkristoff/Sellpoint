from django.contrib.auth.models import User
from django.db import models


def user_directory_path(instance, filename):

    # file will be uploaded to sellpoint/backend/media/user_<id>/product_id_<pk>/<filename>
    return f'user_{instance.owner.id}/{filename}'


class Category(models.Model):
    name = models.CharField(max_length=24, primary_key=True)

    def save(self, *args, **kwargs):
        self.name = self.name[0].upper() + self.name[1:].lower()
        return super(Category, self).save(*args, **kwargs)

    class Meta:
        verbose_name_plural = 'categories'


class ProductListing(models.Model):
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="ownerID")
    purchaser = models.ForeignKey(
        User, null=True, blank=True, on_delete=models.SET_NULL, related_name="purchaserID")
    category = models.ForeignKey(
        Category, blank=True, null=True, on_delete=models.SET_NULL)
    upload_date = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    title = models.CharField(max_length=50)
    description = models.TextField(default=None, blank=True, null=True)
    has_been_sold = models.BooleanField(default=False)
    image = models.ImageField(
        upload_to=user_directory_path, blank=True, null=True)

    class Meta:
        ordering = ['-upload_date']
