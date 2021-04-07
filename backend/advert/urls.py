from .views import AdvertViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'_verts', AdvertViewSet)
urlpatterns = router.urls
