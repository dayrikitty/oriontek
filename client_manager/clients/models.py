from django.db import models

# Create your models here.


class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)


class Address(models.Model):
    client = models.ForeignKey(
        Client, related_name="addresses", on_delete=models.CASCADE
    )
    street = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    number = models.IntegerField()
    apartment = models.IntegerField()
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)
