from django.utils import timezone
from .models import Advert


def deactivate_expired_ads():
    """
    Deactivates expired advertisements
    """

    for ad in Advert.objects.all():
        if(ad.expiry_date <= timezone.now()):
            ad.active = False
            ad.save()
        else:
            ad.active = True
            ad.save()
