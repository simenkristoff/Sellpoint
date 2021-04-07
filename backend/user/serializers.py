from rest_framework import serializers
from rest_framework_jwt.settings import api_settings
from django.contrib.auth.models import User, Group
from django.contrib.contenttypes.models import ContentType
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
import django.core as core


class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

    def to_representation(self, obj):
        return obj.name


class UserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name')


class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True)

    def get_favourites(self, obj):
        return obj.productlisting_set.all().values()

    class Meta:
        model = User
        fields = ('id', 'username', 'email',
                  'is_superuser', 'first_name', 'last_name', 'groups')


class RegisterSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()
    email = serializers.EmailField(
        required=True,
        validators=[UniqueValidator(queryset=User.objects.all())]
    )
    permissions = serializers.CharField(write_only=True, required=False)
    password = serializers.CharField(
        write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('token', 'username', 'password', 'password2',
                  'email', 'first_name', 'last_name', 'permissions')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
        }

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError(
                {"password": "Password fields didn't match."})

        return attrs

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name']
        )

        # Add user to groups
        if(validated_data['permissions']):
            user.groups.add(Group.objects.get(
                name=validated_data['permissions']))

        user.set_password(validated_data['password'])
        user.save()

        return user
