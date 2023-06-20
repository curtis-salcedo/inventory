from django.shortcuts import render
from rest_framework import viewsets
from .serializers import UserSerializer, BusinessSerializer, LocationSerializer, CategorySerializer, ProductSerializer, InventorySerializer, MonthlyInventorySerializer
from .models import User, Business, Location, Category, Product, Inventory, MonthlyInventory

# Create your views here.

class UserView(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class BusinessView(viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    queryset = Business.objects.all()

class LocationView(viewsets.ModelViewSet):
    serializer_class = LocationSerializer
    queryset = Location.objects.all()

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class ProductView(viewsets.ModelViewSet):
    serializer_class = ProductSerializer
    queryset = Product.objects.all()

class InventoryView(viewsets.ModelViewSet):
    serializer_class = InventorySerializer
    queryset = Inventory.objects.all()

class MonthlyInventoryView(viewsets.ModelViewSet):
    serializer_class = MonthlyInventorySerializer
    queryset = MonthlyInventory.objects.all()