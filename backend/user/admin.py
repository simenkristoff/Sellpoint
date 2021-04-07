from django.contrib import admin
from django.contrib.auth.models import User
from django.contrib.auth.admin import UserAdmin as AuthUserAdmin
from .models import UserRating

# Register your models here.
class UserRatingAdmin(admin.StackedInline):
    model = UserRating
    fk_name = "rated"

class UserAdmin(AuthUserAdmin):
    inlines = [UserRatingAdmin]


admin.site.unregister(User)
admin.site.register(User, UserAdmin)