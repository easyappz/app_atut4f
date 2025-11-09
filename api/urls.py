from django.urls import path
from .views import (
    HelloView,
    UserRegistrationView,
    UserLoginView,
    UserProfileView
)

urlpatterns = [
    path("hello/", HelloView.as_view(), name="hello"),
    path("register/", UserRegistrationView.as_view(), name="register"),
    path("login/", UserLoginView.as_view(), name="login"),
    path("profile/", UserProfileView.as_view(), name="profile"),
]
