from rest_framework import viewsets, permissions, parsers
from rest_framework.response import Response
from rest_framework.decorators import action
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
import json

from .models import Category, ProductListing, ProductImage
from .serializers import CategorySerializer, ProductListingSerializer

class CategoryViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing, editing, creating and deleting categories.
    """
    serializer_class = CategorySerializer
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
    parser_classes = (parsers.MultiPartParser, parsers.JSONParser)
    permission_classes = [
        permissions.AllowAny
    ]

    def list(self, request):
        if(request.method == 'GET'):
            queryset = ProductListing.objects.all()
            user_param = request.GET.get('by', None)
            if user_param is not None:
                queryset = queryset.filter(owner=user_param)
            serializer = ProductListingSerializer(queryset, many=True)
            return Response(serializer.data)

    def retrieve_favourites(self, request, pk=None):
        queryset = ProductListing.objects.filter(favourited_by__id=pk)
        serializer = ProductListingSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        for image in request.data.pop("images"):
            ProductImage.objects.create(
                product=serializer.instance, image=image)

        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # Unify PATCH and PUT
        request.data._mutable = True
        partial = True
        # Create each ProductImage
        images = request.data.getlist("images")
        productImages = ProductImage.objects.filter(
            product=self.get_object())
        originalImages = []
        imagesToUpload = []
        for image in images:
            if(type(image) != str):
                filename = "images/"+image.name
                originalImages.append(filename)
                existingImg = ProductImage.objects.filter(
                    product=self.get_object()).filter(image__exact=filename)
                if len(existingImg) == 0:
                    imagesToUpload.append(image)
            else:
                data = json.loads(image)
                originalImages.append(data["image"].replace("/media/", "", 1))

        # Delete removed images, if any
        ProductImage.objects.filter(
            product=self.get_object()).exclude(image__in=originalImages).delete()

        # Add new images, if any
        for image in imagesToUpload:
            ProductImage.objects.create(
                product=self.get_object(), image=image)

        product = self.get_object()
        product.favourited_by.clear()
        

        serializer = self.get_serializer(
            self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        # Do ViewSet work.
        self.perform_update(serializer)
        request.data._mutable = False
        return Response(serializer.data)
