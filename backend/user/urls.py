from django.urls import path
from user.views import RegisterView
from rest_framework_jwt.views import obtain_jwt_token
from .views import UserViewSet, RegisterView

user_list = UserViewSet.as_view({
    'get': 'list'
}) 
user_detail = UserViewSet.as_view({
    'get': 'retrieve', 
})

urlpatterns = [
    path('users/', user_list, name='user-list'),
    path('users/<int:pk>/', user_detail, name='user-detail'),
    path('rate/<int:pk>/', UserViewSet.as_view({'put': 'set_rating'})),
    path('login/', obtain_jwt_token),
    path('register/', RegisterView.as_view(), name='user_register'),
]
