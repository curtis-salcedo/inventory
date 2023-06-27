# Generated by Django 4.2 on 2023-06-27 17:17

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0009_alter_inventoryitem_price_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='category',
            name='sub_category',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='product',
            name='sub_category',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.CreateModel(
            name='InventorySubmission',
            fields=[
                ('submission_id', models.AutoField(primary_key=True, serialize=False)),
                ('submitted_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('updated_date', models.DateTimeField(auto_now=True, null=True)),
                ('category_totals', models.DecimalField(decimal_places=2, max_digits=10, null=True)),
                ('inventory', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inventorysubmissions', to='inventory.inventory')),
                ('submitted_by', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='inventorysubmissions', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]