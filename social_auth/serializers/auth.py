from rest_framework import serializers
from django.contrib.auth.models import AbstractUser
from social_auth import models
from social_auth.models import Profile


class ProfileSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=True)

    class Meta:
        model = Profile
        fields = ('username', 'email', 'password')