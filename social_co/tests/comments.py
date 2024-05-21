from django.contrib.auth.models import User  # Assuming user authentication

from rest_framework import status
from rest_framework.test import APITestCase

from social_auth.models import Profile
from social_co.models import Post, Comment
from social_co.serializers.comments import CommentSerializer


class TestCommentViewSet(APITestCase):

    def setUp(self):
        self.user = Profile.objects.create_user(
            username="test_user", password="123", email="random@mail.com"
        )

        self.post = Post.objects.create(content="Test post 1", author=self.user, title="my title")
        self.comment = Comment.objects.create(content="Test comment", post=self.post, author=self.user)
        self.client.force_login(self.user)

        response = self.client.post(
            "/api/token/", data={"username": "test_user", "password": "123"}
        )
        # Access raw JSON content
        raw_content = response.content.decode()  # Decode bytes to string

        # Parse JSON manually (if needed)
        import json
        data = json.loads(raw_content)

        # Assuming access token is under the key 'access'
        self.access_token = data.get('access')
        self.headers = {"Authorization": f"Bearer {self.access_token}"}

    def test_comment_creation(self):
        data = {
            "content": "Test comment",
            'post': self.post.pk
        }
        http_response = self.client.post("/feed/comments/", data=data, format="json", headers=self.headers)

        self.assertEqual(http_response.status_code, status.HTTP_201_CREATED, http_response.content)


        response = http_response.json()


    def test_comment_deletion(self):

        http_response = self.client.delete('/feed/comments/1')
        print(http_response.status_code)

        self.assertEqual(http_response.status_code, status.HTTP_204_NO_CONTENT, http_response.content)

