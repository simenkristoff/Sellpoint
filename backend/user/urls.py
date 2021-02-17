from django.urls import path
from user.views import RegisterView
from rest_framework_jwt.views import obtain_jwt_token


urlpatterns = [
    path('login/', obtain_jwt_token),
    path('register/', RegisterView.as_view(), name='user_register'),
]
