from django.db import models


class Client(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(unique=True)

    def __str__(self):
        return self.name


class Address(models.Model):
    client = models.ForeignKey(
        Client, related_name="addresses", on_delete=models.CASCADE
    )
    street = models.CharField(max_length=200)
    city = models.CharField(max_length=100)
    number = models.IntegerField(blank=True, null=True)
    apartment = models.IntegerField(blank=True, null=True)
    postal_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return f"{self.street}, {self.city}"
