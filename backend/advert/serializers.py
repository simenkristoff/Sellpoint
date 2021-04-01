from rest_framework import serializers
from django.contrib.auth.models import User
from user.serializers import UserDetailsSerializer
from .models import Advert, AdvertImage


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdvertImage
        fields = ('id', 'image')


class AdvertSerializer(serializers.ModelSerializer):
    expiry_date = serializers.ReadOnlyField()
    images = serializers.SerializerMethodField('get_images')

    class Meta:
        model = Advert
        fields = ('id', 'title', 'link', 'duration', 'active',
                  'user', 'created_date', 'expiry_date', 'images')

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(AdvertSerializer, self).get_field_names(
            declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields
        else:
            return expanded_fields

    def get_images(self, advert):
        images = AdvertImage.objects.filter(advert=advert.id)
        return ImageSerializer(images, read_only=True, many=True).data
