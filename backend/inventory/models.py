from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _
from django.utils import timezone

from .managers import CustomUserManager

# CustomUser Model
class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(_("email address"), unique=True)
    is_staff = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return self.email


# Business Model
class Business(models.Model):
    business_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    products = models.ManyToManyField('Product', related_name='businesses')

    def __str__(self):
        return self.name


# Location Model
class Location(models.Model):
    location_id = models.AutoField(primary_key=True)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='locations')
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Category Model
class Category(models.Model):
    category_id = models.AutoField(primary_key=True)
    business = models.ForeignKey(Business, on_delete=models.CASCADE, related_name='categories')
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)

    def __str__(self):
        return self.name


# Product Model
class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='products')
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500, null=True)
    product_number = models.CharField(max_length=100)
    vendor = models.CharField(max_length=100, null=True)
    vendor_product_number = models.CharField(max_length=100, null=True)
    price = models.FloatField()
    case_size = models.IntegerField(null=True)
    count_by = models.CharField(max_length=100)

    def __str__(self):
        return self.name

# InventoryItem Model for putting products into a countable object
class InventoryItem(models.Model):
    inventory_item_id = models.AutoField(primary_key=True)
    inventory_name = models.CharField(max_length=100, null=True)
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventoryitems')
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='inventoryitems', null=True)
    quantity = models.IntegerField(default=0)
    total = models.FloatField(default=0.0)
    price = models.FloatField(null=True)

    def __str__(self):
        return (f"{self.product.name} - {self.category}")

class ProductMixTemplate(models.Model):
    product_mix_template_id = models.AutoField(primary_key=True)
    location_id  = models.ForeignKey(Location, on_delete=models.CASCADE, related_name = 'productmixtemplates')
    location_name = models.CharField(max_length=100, null=True)
    name = models.CharField(max_length=100, null=True)
    description = models.CharField(max_length=100, null=True)
    item_list = models.ManyToManyField(InventoryItem, related_name='productmixtemplates')

    def __str__(self):
        return self.name

# Inventory Model
class Inventory(models.Model):
    inventory_id = models.AutoField(primary_key=True)
    # inventory_items = models.ForeignKey(InventoryItem, on_delete=models.CASCADE, related_name='inventoryshell', null=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='inventoryshell')
    month = models.CharField(max_length=100, null=True)
    year = models.CharField(max_length=100, null=True)
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    updated_at = models.DateTimeField(auto_now=True, null=True)
    name = models.CharField(max_length=100)
    item_list = models.ManyToManyField(InventoryItem)

    def __str__(self):
        return self.name
    