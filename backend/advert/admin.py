from django.contrib import admin

from .models import Advert, AdvertImage


class AdvertImageAdmin(admin.StackedInline):
    model = AdvertImage


@admin.register(Advert)
class AdvertAdmin(admin.ModelAdmin):
    inlines = [AdvertImageAdmin]

    class Meta:
        model = Advert
