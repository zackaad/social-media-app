from django.contrib import admin
from django.urls import path, include
from social_auth.views.auth import SignupView, UserLogin, UserLogout

urlpatterns = [
    path('register/', SignupView.as_view(), name='example'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', UserLogout.as_view(), name='logout'),
]
