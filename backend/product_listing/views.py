from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import  Category, ProductListing
from .serializers import CategoriesSerializer, ProductListingSerializer

class CategoriesViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, editing, creating and deleting categories.
    """
    serializer_class = CategoriesSerializer
    queryset = Category.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

class ProductListingViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing product listings. 
    """
    serializer_class = ProductListingSerializer
    queryset = ProductListing.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
