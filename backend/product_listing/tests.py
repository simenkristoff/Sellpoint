from django.test import TestCase
from .models import ProductListing
from django.contrib.auth.models import User
from django.test import Client
import json


class RetrieveProductListingTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(
            username='john',
            email='jlennon@beatles.com',
            password='glass onion'
        )
        ProductListing.objects.create(
            owner=User.objects.get(email='jlennon@beatles.com'),
            price=123,
            title="Copy of Sgt. Pepper's", 
        )

    def test_retieve_product(self):
        c = Client()
        sgt_peppers = ProductListing.objects.get(title="Copy of Sgt. Pepper's")
        response = c.get(f'/product/products/{sgt_peppers.id}/')
        self.assertEqual(response.status_code, 200)


class FavouritesTestCase(TestCase):
    def setUp(self):
        User.objects.create_user(
            username='john',
            email='jlennon@beatles.com',
            password='glass onion'
        )
        User.objects.create_user(
            username='yoko',
            email='yoko@ono.com',
            password='devil123'
        )
        ProductListing.objects.create(
            owner=User.objects.get(email='jlennon@beatles.com'),
            price=123,
            title="Copy of Sgt. Pepper's",
        )
    
    def test_adding_to_favourites(self):
        sgt_peppers = ProductListing.objects.get(title="Copy of Sgt. Pepper's")
        yoko = User.objects.get(email='yoko@ono.com')
        self.assertEqual(sgt_peppers.favourited_by.filter(username='yoko').count(), 0)
        sgt_peppers.favourited_by.add(yoko)
        self.assertEqual(sgt_peppers.favourited_by.filter(username='yoko').count(), 1)