from rest_framework import serializers
from django.contrib.auth.models import User

from .models import ProductListing


class ProductListingSerializer(serializers.ModelSerializer):

    owner_username = serializers.SerializerMethodField('get_owner_username')
    purchaser_username = serializers.SerializerMethodField('get_purchaser_username')

    class Meta:
        model = ProductListing
        fields = '__all__'
        extra_fields = ['owner_username']

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(ProductListingSerializer, self).get_field_names(declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields

    def get_owner_username(self, product_listing):
        if product_listing.owner is not None:
            username = User.objects.get(id=product_listing.owner.id).username
            return username
        return None

    def get_purchaser_username(self, product_listing):
        if product_listing.purchaser is not None:
            username = User.objects.get(id=product_listing.purchaser.id).username
            return username
        return None
