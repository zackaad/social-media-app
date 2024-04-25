from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from social_auth.models import Profile
from social_auth.serializers.auth import ProfileSerializer

class SignupView(APIView):
    def post(self, request):
        serializer = ProfileSerializer(data=request.data)
        if serializer.is_valid():
            profile = serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        profiles = Profile.objects.all()
        serializer = ProfileSerializer(profiles)
        return Response(serializer.data)