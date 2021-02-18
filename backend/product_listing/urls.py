from .views import ProductListingViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductListingViewSet)
urlpatterns = router.urls
