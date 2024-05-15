from django.contrib.auth import authenticate
from rest_framework import serializers
from django.contrib.auth.models import AbstractUser
from rest_framework.exceptions import ValidationError

from social_auth import models
from social_auth.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=False)
    email = serializers.CharField(write_only=False)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance

    class Meta:
        model = Profile
        fields = ('username', 'email', 'password')



class UserLoginSerializer(serializers.Serializer):
    email = serializers.CharField()
    password = serializers.CharField()


class TokenSerializer(serializers.Serializer):
    """
    This serializer serializes the token data
    """
    token = serializers.CharField(max_length=255)
