import io
from os import path
from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Advert, AdvertImage
from .serializers import AdvertSerializer


class AdvertViewSet(viewsets.ModelViewSet):
    """
    A viewset for viewing and editing adverts.
    """
    serializer_class = AdvertSerializer
    queryset = Advert.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]

    def list(self, request):
        if(request.method == 'GET'):
            queryset = Advert.objects.all()
            user_param = request.GET.get('by', None)
            if user_param is not None:
                queryset = queryset.filter(user=user_param)
            serializer = AdvertSerializer(queryset, many=True)
            return Response(serializer.data)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        for image in request.data.pop("images"):
            AdvertImage.objects.create(
                advert=serializer.instance, image=image)

        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        # Unify PATCH and PUT
        request.data._mutable = True
        partial = True
        # Create each AdvertImage
        images = request.data.pop("images")
        if(len(images) > 0 and type(images[0]) != str):
            AdvertImage.objects.filter(
                advert=self.get_object()).delete()
            for image in images:
                AdvertImage.objects.create(
                    advert=self.get_object(), image=image)

        serializer = self.get_serializer(
            self.get_object(), data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        # Do ViewSet work.
        self.perform_update(serializer)
        request.data._mutable = False
        return Response(serializer.data)
