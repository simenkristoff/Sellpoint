from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from django.shortcuts import render
from rest_framework import viewsets, generics
from django.contrib.auth.models import User
from django.db.models import Avg
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .serializers import UserSerializer, RegisterSerializer, UserDetailsSerializer
from .models import UserRating

class UserViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for listing or retrieving users.
    """
    queryset = User.objects.all()
    serializer_class = UserDetailsSerializer

    def list(self, request):
        queryset = User.objects.all()
        serializer = UserSerializer(queryset, many=True)
        return Response(serializer.data)

    def set_rating(self, request, pk=None):
        rated = User.objects.get(id=pk)
        rater = User.objects.get(id=request.data["rater"])
        obj, created = UserRating.objects.update_or_create(
            rated=rated, rater=rater,
            defaults={"rating": request.data["rate"]},
        )
        queryset = UserRating.objects.filter(rated=pk).aggregate(rating=Avg('rating'))
        rating = queryset["rating"]
        if rating is None:
            rating = 0

        return Response(int(rating))

    def retrieve(self, request, pk=None):
        queryset = User.objects.all()
        user = get_object_or_404(queryset, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)


class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (AllowAny,)
    serializer_class = RegisterSerializer
