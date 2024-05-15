from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated  # Restricts to authenticated users
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status, viewsets
from rest_framework.permissions import AllowAny
from social_co.models import Post, Comment
from social_co.serializers.comments import CommentSerializer
from social_co.serializers.posts import PostSerializer
from rest_framework.authentication import SessionAuthentication, BasicAuthentication



class PostViewSet(viewsets.ModelViewSet):

    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get(self, request):
        user = self.request.user
        if user:
            print(user.is_anonymous)
        else:
            print("User not authenticated")

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        # Check for user authentication
        if request.user.is_authenticated:
            print(request.user.is_authenticated)
            # User is authenticated, proceed with the request logic

            post = self.get_object()
            comments = post.comment_set.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        else:
            # User is not authenticated, return a 403 response
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)



