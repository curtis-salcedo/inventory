from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.utils import timezone
from .serializers import UserSerializer, BusinessSerializer, LocationSerializer, CategorySerializer, ProductSerializer, InventoryItemSerializer, InventorySerializer, ProductMixTemplateSerializer
from .models import User, Business, Location, Category, Product, InventoryItem, Inventory, ProductMixTemplate

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

class InventoryItemView(viewsets.ModelViewSet):
    serializer_class = InventoryItemSerializer
    queryset = InventoryItem.objects.all()

class InventoryView(viewsets.ModelViewSet):
    serializer_class = InventorySerializer
    queryset = Inventory.objects.all()
    
class ProductMixTemplateView(viewsets.ModelViewSet):
    serializer_class = ProductMixTemplateSerializer
    queryset = ProductMixTemplate.objects.all()

@api_view(['POST'])
def create_inventory(request):
    request.data['created_at'] = timezone.now()
    request.data['month'] = timezone.now().month
    request.data['year'] = timezone.now().year
    # Run serializer validation
    serializer = InventorySerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        # Print the saved serializer data for debugging purposes
        # print("Saved serializer data:", serializer.data)  
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    print("Serializer errors:", serializer.errors)  # Print the serializer errors if the data is invalid
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_product_mix(request):
    print("Request data:", request.data)

    location = request.data['location']
    products = request.data['products']
    name = request.data['name']

    # Create new inventory items for each product
    for product in products:
        p = Product.objects.get(product_id=product)
        product_name = p.name
        product_price = p.price
        product_category = p.category
        inventory_item = InventoryItem.objects.create(
            product = p,
            category = product_category,
            quantity = 0,
            total = 0.0,
            price = product_price
        )

        inventory_item.save()

    response_data = {
        'message': 'Product mix created successfully',
    }

    return Response(response_data, status=status.HTTP_201_CREATED)