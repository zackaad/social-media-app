from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.password_validation import validate_password
from django.core.serializers import get_serializer
from django.core.validators import validate_email
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, permissions
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView

from django.contrib.auth import authenticate

from rest_framework.permissions import IsAuthenticated

from social_auth.models import Profile
from social_auth.serializers.auth import ProfileSerializer, UserLoginSerializer


class SignupView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            profile = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = Profile.objects.filter(email=email).first()

        if user is None:
            raise AuthenticationFailed('Not found')
        if not user.check_password(password):
            raise AuthenticationFailed('Invalid password')
        login(request, user)
        return Response({
            'message': 'success'
        })

class UserLogout(APIView):
    permission_classes = [permissions.AllowAny]
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
