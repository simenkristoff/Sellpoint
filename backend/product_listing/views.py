from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import ProductListing
from .serializers import ProductListingSerializer


class ProductListingViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product listings. 
    """
    serializer_class = ProductListingSerializer
    queryset = ProductListing.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
