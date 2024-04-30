from django.contrib.sites import requests
from django.test import TestCase
from rest_framework import status

from social_auth.models import Profile
from social_co.models import Post
from social_co.serializers.posts import PostSerializer


class PostListViewSetTest(TestCase):
    def setUp(self):
        self.user = Profile.objects.create_user(
            username="test_user", password="123",
        )

        self.post1 = Post.objects.create(content="Test post 1", author=self.user)
        self.post2 = Post.objects.create(content="Test post 2", author=self.user)

        self.client.force_login(self.user)

    def test_posts_list(self):
        response = self.client.get("/feed/posts/")

        self.assertEqual(response.status_code, 200)

    def test_posts_list_unauthenticated(self):
        self.client.logout()

        response = self.client.get("/feed/posts/")

        self.assertEqual(response.status_code, 403, response.content)

    def test_post_creation_successful(self):
        data = {
            "content": "Test content"
        }

        http_response = self.client.post("/feed/posts/", data=data, format="json")

        self.assertEqual(http_response.status_code, status.HTTP_201_CREATED)

        response = http_response.json()

        self.assertDictEqual(response, {
            'id': response['id'],
            'content': 'Test content',
            'author': self.user.pk,
        })