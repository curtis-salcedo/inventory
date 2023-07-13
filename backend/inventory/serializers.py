from rest_framework import serializers, permissions
from .models import CustomUser, Business, Location, Category, Product, InventoryItem, Inventory, SubCategory
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=128, write_only=True)
    def create(self, validated_data):
        print('create custom user serializer', validated_data)
        password = validated_data.pop('password', None)
        if password:
            validated_data['password'] = make_password(password)
        return super().create(validated_data)
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'business')

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()
    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        user = authenticate(email=email, password=password)
        if not user:
            raise serializers.ValidationError("Invalid email or password.")
        attrs['user'] = user
        return attrs

class BusinessSerializer(serializers.ModelSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Business
        fields = ('business_id', 'name')

class LocationSerializer(serializers.ModelSerializer):
    business_name = serializers.CharField(source='business.name', read_only=True)
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Location
        fields = ('location_id', 'name', 'address', 'business', 'business_name')

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Category
        fields = ('category_id', 'name', 'description', 'business')

class ProductSerializer(serializers.ModelSerializer):
    permission_classees = [permissions.IsAuthenticated]
    category = serializers.CharField(read_only=True)
    sub_category = serializers.CharField(read_only=True)
    class Meta:
        permission_classees = [permissions.IsAuthenticated]
        model = Product
        fields = ('product_id', 'category', 'sub_category', 'name', 'description', 'number', 'description', 'price', 'case_size', 'count_by', 'sub_category', 'pack_type', 'vendor')
    # Auto capitalize all string fields
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {key: value.upper() if isinstance(value, str) else value for key, value in representation.items()}

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = InventoryItem
        fields = ('inventory_item_id', 'inventory_id', 'product', 'sub_category', 'category', 'quantity', 'total', 'price')
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        return {key: value.upper() if isinstance(value, str) else value for key, value in representation.items()}

class InventorySerializer(serializers.ModelSerializer):
    user_email = serializers.CharField(source='user.email', read_only=True)
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = Inventory
        fields = ('inventory_id', 'location', 'created_at', 'updated_at', 'name', 'month', 'year', 'item_list', 'user', 'user_email')

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        permission_classes = [permissions.IsAuthenticated]
        model = SubCategory
        fields = ('sub_category_id', 'category', 'name')