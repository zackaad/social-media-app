from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated  # Restricts to authenticated users
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets

from social_co.models import Post, Comment
from social_co.serializers.comments import CommentSerializer
from social_co.serializers.posts import PostSerializer


class PostViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        post = self.get_object()
        comments = post.comment_set.all()
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)