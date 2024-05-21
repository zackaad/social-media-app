from django.db.models import Q
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
from rest_framework_simplejwt.authentication import JWTAuthentication


class PostViewSet(viewsets.ModelViewSet):
    authentication_classes = [JWTAuthentication]
    queryset = Post.objects.all()
    serializer_class = PostSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        search_id = self.request.query_params.get('id', None)  # Get search ID from query params
        if search_id:
            try:
                int_id = int(search_id)
                queryset = queryset.filter(pk=int_id)  # Filter by exact ID
            except ValueError:
                print("Invalid search ID format")  # Handle non-integer search ID
        return queryset

    @action(detail=True, methods=['get'])
    def comments(self, request, pk=None):
        # Check for user authentication
        if request.user.is_authenticated:

            post = self.get_object()
            comments = post.comment_set.all()
            serializer = CommentSerializer(comments, many=True)
            return Response(serializer.data)
        else:
            # User is not authenticated, return a 403 response
            return Response({'error': 'Unauthorized'}, status=status.HTTP_403_FORBIDDEN)



