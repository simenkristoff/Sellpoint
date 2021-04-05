from django.test import TestCase
from django.contrib.auth.models import User
from django.test import Client


class RegisterTestCase(TestCase):
    def test_registration(self):
        """
        Tests post request to register api (creating new user)
        """
        c = Client()
        response = c.post(
            '/user/register/',
            {
                "username": "perry",
                "password": "Skole123",
                "password2": "Skole123",
                "email": "perry@gmail.com",
                "first_name": "Per Erik",
                "last_name": "Hansen"
            }
        )
        self.assertEqual(response.status_code, 201)


class LoginTestCase(TestCase):
    """
    Tests correct response when logging in with 
    correct username and password
    """
    def setUp(self):
        User.objects.create_user(
            username='john',
            email='jlennon@beatles.com',
            password='glass onion'
        )
    
    def test_login(self):
        c = Client()
        response = c.post(
            '/user/login/', 
            {
                'username': 'john', 
                'password': 'glass onion'
            }
        ) 
        self.assertEqual(response.status_code, 200)
