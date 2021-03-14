from rest_framework import serializers
from django.contrib.auth.models import User
from user.serializers import UserDetailsSerializer
from .models import Advert


class AdvertSerializer(serializers.ModelSerializer):

    class Meta:
        model = Advert
        fields = ('id', 'title', 'duration', 'active',
                  'image', 'user', 'date_created')

    def get_field_names(self, declared_fields, info):
        expanded_fields = super(AdvertSerializer, self).get_field_names(
            declared_fields, info)

        if getattr(self.Meta, 'extra_fields', None):
            return expanded_fields
        else:
            return expanded_fields
