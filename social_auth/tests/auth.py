from django.test import TestCase


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
