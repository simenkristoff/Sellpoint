"""
Backend URL Configuration
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from rest_framework_jwt.views import obtain_jwt_token

urlpatterns = [
    path('user/', include('user.urls')),
    path('admin/', admin.site.urls),
]
