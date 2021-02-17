from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer


class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
