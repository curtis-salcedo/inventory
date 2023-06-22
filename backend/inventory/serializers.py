from rest_framework import serializers
from .models import User, Business, Location, Category, Product, InventoryItem, Inventory, ProductMixTemplate

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'username', 'email', 'password', 'first_name', 'last_name', 'email', 'phone', 'business', 'is_active', 'is_staff', 'is_manager', 'is_admin', 'is_superuser')

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        model = Business
        fields = ('business_id', 'name')

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ('location_id', 'name', 'address', 'business')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ('category_id', 'name', 'description', 'business')

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ('product_id', 'category', 'name', 'description', 'product_number', 'description', 'vendor', 'vendor_product_number', 'price', 'case_size', 'count_by')

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = ('inventory_item_id', 'product', 'category', 'quantity', 'total', 'price')

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ('inventory_id', 'location', 'created_at', 'updated_at', 'name', 'month', 'year')

class ProductMixTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMixTemplate
        fields = ('product_mix_template_id', 'business', 'name', 'created_at', 'updated_at', 'description', 'item_list')