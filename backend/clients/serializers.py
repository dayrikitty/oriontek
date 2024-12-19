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

    def update(self, instance, validated_data):
        addresses_data = validated_data.pop("addresses", [])
        instance.name = validated_data.get("name", instance.name)
        instance.email = validated_data.get("email", instance.email)
        instance.save()

        # Handle addresses
        existing_address_ids = [address.id for address in instance.addresses.all()]
        new_addresses = []
        updated_addresses = []

        for address_data in addresses_data:
            if "id" in address_data:
                address_id = address_data.pop("id")
                if address_id in existing_address_ids:
                    # Update existing address
                    address = Address.objects.get(id=address_id, client=instance)
                    for key, value in address_data.items():
                        setattr(address, key, value)
                    address.save()
                    updated_addresses.append(address)
            else:
                # Create new address
                new_addresses.append(Address(client=instance, **address_data))

        # Delete addresses not included in the payload
        Address.objects.filter(client=instance).exclude(
            id__in=[addr.id for addr in updated_addresses]
        ).delete()

        # Bulk create new addresses
        Address.objects.bulk_create(new_addresses)

        return instance
