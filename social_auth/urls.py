from django.contrib import admin
from django.urls import path, include
from social_auth.views.auth import SignupView

urlpatterns = [
    path('register/', SignupView.as_view(), name='example')
]
