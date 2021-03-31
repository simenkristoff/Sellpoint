from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404

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

    def retrieve_favourites(self, request, pk=None):
        queryset = ProductListing.objects.filter(favourited_by__id=pk)
        serializer = ProductListingSerializer(queryset, many=True)
        return Response(serializer.data)