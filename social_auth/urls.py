from django.urls import path

from .views.auth import CustomUserCreate, HelloWorldView, LogoutAndBlacklistRefreshTokenForUserView


urlpatterns = [
    path('create/', CustomUserCreate.as_view(), name="create_user"),
    path('hello/', HelloWorldView.as_view(), name='hello_world'),
    path('blacklist/', LogoutAndBlacklistRefreshTokenForUserView.as_view(), name="blacklist")
]