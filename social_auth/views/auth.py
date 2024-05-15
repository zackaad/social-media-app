from django.shortcuts import get_object_or_404
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework import permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView

import social
from social_auth.models import Profile
from social_auth.serializers import auth
from social_auth.serializers.auth import ProfileSerializer, TokenSerializer
from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate, logout, login
from rest_framework_simplejwt.tokens import RefreshToken


class CustomUserCreate(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, format='json'):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            if user:
                json = serializer.data
                return Response(json, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HelloWorldView(APIView):

    def get(self, request):
        return Response(data={"hello": "world"}, status=status.HTTP_200_OK)

class LogoutAndBlacklistRefreshTokenForUserView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data["refresh_token"]
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)
