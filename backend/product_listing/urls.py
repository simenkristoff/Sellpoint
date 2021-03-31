from .views import ProductListingViewSet
from rest_framework.routers import DefaultRouter
from django.urls import path

router = DefaultRouter()
router.register(r'products', ProductListingViewSet)
urlpatterns = [
    path('favourites/<int:pk>', ProductListingViewSet.as_view({'get': 'retrieve_favourites'}))
] + router.urls
