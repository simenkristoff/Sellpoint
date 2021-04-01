from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import ProductListing, ProductImage
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
        # Create each PostImage
        for image in request.data.pop("images"):
            ProductImage.objects.create(
                product=self.get_object(), image=image)

        serializer = self.get_serializer(
            self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        # Do ViewSet work.
        self.perform_update(serializer)
        request.data._mutable = False
        return Response(serializer.data)
