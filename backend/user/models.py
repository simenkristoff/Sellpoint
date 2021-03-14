from django.db import models
from django.contrib.auth.models import Group

# Initialize Custom User-groups
default_group, created = Group.objects.get_or_create(name='default')
admin_group, created = Group.objects.get_or_create(name='admin')
advert_group, created = Group.objects.get_or_create(name='advertiser')
