from django.contrib.auth import authenticate
from django.test import TestCase

from social_auth.models import Profile


class SignUpViewTest(TestCase):

    def test_signup(self):
        http_response = self.client.post(
            path="/auth/create/",
            data={
                'email': 'foo@gmail.com',
                'username': 'OK',
                'password': '123'
            }
        )

        self.assertEqual(http_response.status_code, 201)


class login_test(TestCase):
    def setUp(self):
        self.user = Profile.objects.create_user(
            username="test_user", password="123",
        )

        self.api_token_response = self.client.post(
            "/api/token/", data={"username": "test_user", "password": "123"}
        )

        self.raw_content = self.api_token_response.content.decode()  # Decode bytes to string

        # Parse JSON manually (if needed)
        import json
        self.data = json.loads(self.raw_content)

        # Assuming access token is under the key 'access'
        self.access_token = self.data.get('access')
        self.headers = {"Authorization": f"Bearer {self.access_token}"}

    def test_login_valid_data(self):
        response = self.client.post(
            path="/auth/login/",
            data={
                'username': 'test_username',
                'password': 'Aasd1239900!'
            }
        )

        self.assertTrue(response.status_code, 200)

    def test_login_invalid_data(self):
        response = self.client.post(
            path="/api/token/",
            data={
                'email': 'invalid_user',
                'password': '555'
            }
        )

        self.assertEqual(response.status_code, 400)
        self.assertTrue(self.user.is_authenticated)

    def test_logout(self):
        #print(self.data.get("refresh"))
        response_logout = self.client.post(
            path="/auth/blacklist/",
            data={
                "refresh_token": self.data.get("refresh"),
                "acceess_token": self.data.get("access")
            }
        )

        self.assertEqual(response_logout.status_code, 205)

    def test_whoami(self):
        data = {'user_id': self.user.id}
        response = self.client.post('/auth/whoami/', data=data, content_type='application/json')

        self.assertEqual(response.status_code, 200)
