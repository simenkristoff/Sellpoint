from django.db import models
from django.contrib.auth.models import User

CATEGORY_CHOICES = [
    ('Category name', 'Category name')
]

class ProductListing(models.Model):
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name="owner")
    purchaser = models.ForeignKey(User, null=True, blank=True, on_delete=models.SET_NULL, related_name="purchaser")
    upload_date = models.DateTimeField(auto_now_add=True)
    price = models.IntegerField()
    has_been_sold = models.BooleanField(default=False)
    category = models.CharField(choices=CATEGORY_CHOICES, max_length=20)

    class Meta: 
        ordering = ['-upload_date']

