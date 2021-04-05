from rest_framework import viewsets, permissions, parsers
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
    parser_classes = (parsers.MultiPartParser, parsers.JSONParser)
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

        # Delete removed images, if any
        ProductImage.objects.filter(
            product=self.get_object()).exclude(image__in=originalImages).delete()

        # Add new images, if any
        for image in imagesToUpload:
            ProductImage.objects.create(
                product=self.get_object(), image=image)

        serializer = self.get_serializer(
            self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        # Do ViewSet work.
        self.perform_update(serializer)
        request.data._mutable = False
        return Response(serializer.data)
