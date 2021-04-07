from django.contrib import admin
from .models import Category, ProductListing, ProductImage

# Register your models here.
admin.site.register(Category)

class ProductImageAdmin(admin.StackedInline):
    model = ProductImage


@admin.register(ProductListing)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin]

    class Meta:
        model = ProductListing
