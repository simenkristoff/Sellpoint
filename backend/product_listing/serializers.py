from rest_framework import serializers
from django.contrib.auth.models import User
from user.serializers import UserDetailsSerializer
from .models import Category, ProductListing, ProductImage


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = ('id', 'image')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class ProductListingSerializer(serializers.ModelSerializer):
    owner_details = serializers.SerializerMethodField('get_owner')
    purchaser_username = serializers.SerializerMethodField(
        'get_purchaser_username')
    images = serializers.SerializerMethodField('get_images')

    class Meta:
        model = ProductListing
        fields = '__all__'
        extra_fields = ['owner']

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(ProductListingSerializer, self).get_field_names(
            declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields + self.Meta.extra_fields
        else:
            return expanded_fields

    def get_owner(self, product_listing):
        if product_listing.owner is not None:
            user = User.objects.get(id=product_listing.owner.id)
            owner_details = {"username": user.username, "first_name": user.first_name,
                             "last_name": user.last_name, "email": user.email}
            return UserDetailsSerializer(user).data
        return None

    def get_purchaser_username(self, product_listing):
        if product_listing.purchaser is not None:
            username = User.objects.get(
                id=product_listing.purchaser.id).username
            return username
        return None

    def get_images(self, product):
        images = ProductImage.objects.filter(product=product.id)
        return ImageSerializer(images, read_only=True, many=True).data
