# Generated by Django 5.1.4 on 2024-12-19 18:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('clients', '0002_alter_address_apartment_alter_address_number'),
    ]

    operations = [
        migrations.AlterField(
            model_name='address',
            name='country',
            field=models.CharField(blank=True, max_length=100),
        ),
    ]
