from django.contrib.auth import authenticate
from django.test import TestCase

from social_auth.models import Profile


class SignUpViewTest(TestCase):

    def test_signup(self):
        http_response = self.client.post(
            path="/auth/register/",
            data={
                'email': 'foo@gmail.com',
                'username': 'OK',
                'password': '123',
                'is_admin': 'True'
            }
        )

        response = http_response.json()

        self.assertDictEqual(response, {
            'email': 'foo@gmail.com',
            'username': 'OK'
        })
        self.assertEqual(http_response.status_code, 201)


class UserLoginTest(TestCase):
    def setUp(self):
        self.user = Profile.objects.create_user(username='test_username', password='Aasd1239900!', email="master@mail.com")
        self.user.save()

    def test_login_valid_data(self):
        response = self.client.post(
            path="/auth/login/",
            data={
                'email': 'master@mail.com',
                'password': 'Aasd1239900!'
            }
        )
        self.assertEqual(response.status_code, 200, response.content)

    def test_login_invalid_data(self):
        response = self.client.post(
            path="/auth/login/",
            data={
                'email': 'invalid_user',
                'password': '555'
            }
        )

        self.assertEqual(response.status_code, 401)


    def test_logout(self):
        self.client.force_login(self.user)
        response = self.client.post(
            path="/auth/logout/",
            data={

            }
        )

        self.assertEqual(response.status_code, 200)


