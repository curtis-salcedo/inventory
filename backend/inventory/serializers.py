from rest_framework import serializers
from .models import CustomUser, Business, Location, Category, Product, InventoryItem, Inventory, ProductMixTemplate, SubCategory

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email',)

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
        fields = ('product_id', 'category', 'name', 'description', 'product_number', 'description', 'price', 'case_size', 'count_by', 'sub_category')

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = ('inventory_item_id', 'inventory_id', 'product', 'category', 'quantity', 'total', 'price')

class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = ('inventory_id', 'location', 'created_at', 'updated_at', 'name', 'month', 'year', 'item_list')

class ProductMixTemplateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductMixTemplate
        fields = ('product_mix_template_id', 'location_id', 'name', 'description', 'item_list')

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ('sub_category_id', 'category', 'name')