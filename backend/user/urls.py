from django.urls import path
from .views import current_user, Register

urlpatterns = [
    path('current_user/', current_user),
    path('register/', Register.as_view())
]
