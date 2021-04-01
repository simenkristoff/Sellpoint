from django.contrib import admin

from .models import ProductListing, ProductImage


class ProductImageAdmin(admin.StackedInline):
    model = ProductImage


@admin.register(ProductListing)
class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageAdmin]

    class Meta:
        model = ProductListing
