from rest_framework import serializers
from .models import Client, Address


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ["id", "street", "city", "postal_code"]


class ClientSerializer(serializers.ModelSerializer):
    addresses = AddressSerializer(many=True)

    class Meta:
        model = Client
        fields = ["id", "name", "email", "addresses"]

    def create(self, validated_data):
        addresses_data = validated_data.pop("addresses", [])
        client = Client.objects.create(**validated_data)

        # Create each address and assign the client instance
        for address_data in addresses_data:
            Address.objects.create(client=client, **address_data)

        return client
