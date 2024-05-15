from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated, AllowAny  # Restricts to authenticated users

from rest_framework import status, viewsets
from rest_framework.response import Response

from social_co.models import Post, Comment
from social_co.serializers.comments import CommentSerializer


class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    queryset = Comment.objects.all()

