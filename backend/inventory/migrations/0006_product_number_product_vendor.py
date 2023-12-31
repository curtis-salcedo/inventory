# Generated by Django 4.2 on 2023-07-03 20:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0005_product_pack_type'),
    ]

    operations = [
        migrations.AddField(
            model_name='product',
            name='number',
            field=models.CharField(default='Null', max_length=100, unique=True),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='product',
            name='vendor',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
