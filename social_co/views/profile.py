from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from social_auth.models import Profile
from social_auth.serializers.auth import ProfileSerializer
from social_co.models import Post, Comment
from social_co.serializers.comments import CommentSerializer
from social_co.serializers.posts import PostSerializer


class ProfileViewSet(viewsets.ModelViewSet):
    serializer_class = ProfileSerializer
    queryset = Profile.objects.all()

    @action(methods=['GET'], detail=False)
    def me(self, request):
        return self.get_serializer_class()(instance=request.user)


class ProfilePostsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user  # Get the currently logged-in user

        # Filter posts by user ID (current user)
        posts = Post.objects.filter(author=user)
        serializer = PostSerializer(posts, many=True)

        return Response(serializer.data)


class ProfileCommentsAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user  # Get the currently logged-in user

        # Filter posts by user ID (current user)
        comments = Comment.objects.filter(author=user)
        serializer = CommentSerializer(comments, many=True)

        return Response(serializer.data)
