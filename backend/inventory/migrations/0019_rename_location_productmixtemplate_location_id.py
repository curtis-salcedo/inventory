# Generated by Django 4.2 on 2023-06-21 21:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0018_remove_productmixtemplate_business_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='productmixtemplate',
            old_name='location',
            new_name='location_id',
        ),
    ]
