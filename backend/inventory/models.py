from django.db import models

# User Model
class User(models.Model):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=100)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=20)
    email = models.CharField(max_length=50)
    phone = models.CharField(max_length=20)
    password = models.CharField(max_length=100)
    business = models.ForeignKey('Business', on_delete=models.CASCADE, related_name='users')
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_manager = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    def __str__(self):
        return self.username


# Business Model
class Business(models.Model):
    business_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)

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



# Inventory Model
class Inventory(models.Model):
    inventory_id = models.AutoField(primary_key=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='inventories')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='inventories')
    quantity = models.IntegerField()
    total = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


# MonthlyInventory Model
class MonthlyInventory(models.Model):
    monthly_inventory_id = models.AutoField(primary_key=True)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='monthly_inventories')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    date = models.DateField()
    quantity = models.IntegerField()
    notes = models.CharField(max_length=2500)

    def __str__(self):
        return f"{self.product} - {self.location} - {self.month}"
