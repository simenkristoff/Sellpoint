"""
Backend URL Configuration
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import include, url
from rest_framework_jwt.views import obtain_jwt_token
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('token-auth/', obtain_jwt_token),
    path('user/', include('user.urls')),
    path('product/', include('product_listing.urls')),
    path('admin/', admin.site.urls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
