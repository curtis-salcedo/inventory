# Generated by Django 4.2 on 2023-07-13 23:20

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0012_remove_inventory_inventory_items'),
    ]

    operations = [
        migrations.DeleteModel(
            name='ProductMixTemplate',
        ),
    ]