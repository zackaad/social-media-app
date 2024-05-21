from django.contrib.sites import requests
from django.test import TestCase
from rest_framework import status

from social_auth.models import Profile
from social_co.models import Post
from social_co.serializers.posts import PostSerializer
from rest_framework import status, permissions


class PostListViewSetTest(TestCase):
    def setUp(self):
        self.user = Profile.objects.create_user(
            username="test_user", password="123",
        )

        self.post1 = Post.objects.create(content="Test post 1", author=self.user, title="test title1")
        #self.post2 = Post.objects.create(content="Test post 2", author=self.user)
        #self.client.force_login(self.user)


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

    def test_get_posts_list(self):
        response = self.client.get(path="/feed/posts/", headers=self.headers)

        self.assertEqual(response.status_code, 200)

    def test_posts_list_unauthenticated(self):
        self.client.logout()

        response = self.client.get("/feed/posts/")

        self.assertEqual(response.status_code, 401)

    def test_post_creation_successful(self):
        data = {
            "title": "test title",
            "content": "this is",
            "comments": []

        }

        http_response = self.client.post("/feed/posts/", data=data, format="json", headers=self.headers)

        self.assertEqual(http_response.status_code, 201, http_response.content_type)

        response = http_response.json()




    def test_post_deletion(self):
        response = self.client.delete(f'/feed/posts/{self.post1}', headers=self.headers)
        self.assertEqual(response.status_code, 204)
        #self.assertFalse(Post.objects.filter(pk=self.post1.pk).exists())

    def test_profile_me_posts(self):
        http_response = self.client.get(path='/feed/profiles/me/posts/', format="json", headers=self.headers)


        self.assertEqual(http_response.status_code, 200)


