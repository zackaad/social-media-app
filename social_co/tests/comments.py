from django.contrib.auth.models import User  # Assuming user authentication

from rest_framework import status
from rest_framework.test import APITestCase

from social_auth.models import Profile
from social_co.models import Post, Comment
from social_co.serializers.comments import CommentSerializer


class TestCommentViewSet(APITestCase):

    def setUp(self):
        self.user = Profile.objects.create_user(
            username="test_user", password="123",
        )

        self.post = Post.objects.create(content="Test post 1", author=self.user)
        self.client.force_login(self.user)  # Force login the user

    def test_comment_creation(self):
        data = {
            "content": "Test comment",
            'post': self.post.pk,
            'author': self.user.pk,
        }

        response = self.client.post("/feed/comments/", data=data, format="json")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED, response.content)

        self.assertEqual(response.data['author'], self.user.pk)

        comment = Comment.objects.get(content=data['content'])
        self.assertEqual(comment.author, self.user)
