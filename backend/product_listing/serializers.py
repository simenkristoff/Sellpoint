from rest_framework import serializers

from .models import ProductListing


class ProductListingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductListing
        fields = '__all__'
