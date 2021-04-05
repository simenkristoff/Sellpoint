from .views import CategoriesViewSet, ProductListingViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'products', ProductListingViewSet)
router.register(r'categories', CategoriesViewSet)
urlpatterns = router.urls
