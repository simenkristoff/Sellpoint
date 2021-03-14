from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.decorators import action

from .models import Advert
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
