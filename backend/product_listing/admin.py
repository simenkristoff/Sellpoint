from django.contrib import admin
# Register your models here.
admin.site.register(Category)

from .models import Category, ProductListing, ProductImage


class ProductImageAdmin(admin.StackedInline):
    model = ProductImage


@admin.register(ProductListing)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin]

    class Meta:
        model = ProductListing
