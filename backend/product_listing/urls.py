from .views import ProductListingViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter(trailing_slash=False)
router.register(r'product', ProductListingViewSet)
urlpatterns = router.urls
