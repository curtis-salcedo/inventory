from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.utils import timezone
from .serializers import CustomUserSerializer, BusinessSerializer, LocationSerializer, CategorySerializer, ProductSerializer, InventoryItemSerializer, InventorySerializer, ProductMixTemplateSerializer
from .models import CustomUser, Business, Location, Category, Product, InventoryItem, Inventory, ProductMixTemplate
from django.core import serializers
import json


# Create your views here.

class CustomUserView(viewsets.ModelViewSet):
    serializer_class = CustomUserSerializer
    queryset = CustomUser.objects.all()

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

# @api_view(['POST'])
# def create_inventory(request):
#     request.data['created_at'] = timezone.now()
#     request.data['month'] = timezone.now().month
#     request.data['year'] = timezone.now().year
#     # Run serializer validation
#     serializer = InventorySerializer(data=request.data)
#     if serializer.is_valid():
#         serializer.save()
#         # Print the saved serializer data for debugging purposes
#         print("Saved serializer data:", serializer.data)  
#         return Response(serializer.data, status=status.HTTP_201_CREATED)
    
#     print("Serializer errors:", serializer.errors)  # Print the serializer errors if the data is invalid
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def create_inventory(request):
    request.data['created_at'] = timezone.now()
    request.data['month'] = timezone.now().month
    request.data['year'] = timezone.now().year

    location_id = request.data['location']
    print('location', location_id)

    # find the location
    foundLocation = Location.objects.get(location_id=location_id)

    new_inventory = Inventory.objects.create(
        location=foundLocation,
        created_at=request.data['created_at'],
        month=request.data['month'],
        year=request.data['year'],
        name=request.data['name'],

    )
    new_inventory.save()

    print("New inventory created called:", new_inventory, 'Amount of item list', new_inventory.item_list , new_inventory.inventory_id)
    # Automatically create items based on the list of products and push into the inventory under item_list
    items = auto_create_inventory_list(new_inventory.inventory_id)

    print(items)

    for item in items:
        print(item)
        new_inventory.item_list.add(item.inventory_item_id)
        new_inventory.save()

    print("New inventory item list:", new_inventory.item_list)
    
    return Response(status=status.HTTP_201_CREATED)

def auto_create_inventory_list(inventory_id):
    # Get all products
    products = Product.objects.all()
    # Create an inventory item for each product
    items = []
    for product in products:
        inventory_item = InventoryItem.objects.create(
            inventory_id=inventory_id,
            product=product,
            category=product.category,
            quantity=0,
            total=0.0,
            price=product.price
        )
        inventory_item.add(items)
        print("Inventory item created:", inventory_item)
        print(items)
    return 


@api_view(['POST'])
def create_product_mix(request):
    print("Request data:", request.data)
    # Get the data from the request
    location = request.data['location_id']
    description = request.data['description']
    name = request.data['name']
    # Find the location
    foundLocation = Location.objects.get(location_id=location)
    # Create the product mix template
    product_mix_template = ProductMixTemplate.objects.create(
        location_id=foundLocation,
        location_name=foundLocation.name,
        description=description,
        name=name,
    )
    product_mix_template.save()
    response_data = {
        'message': 'Product mix created successfully',
    }
    return Response(response_data, status=status.HTTP_201_CREATED)


@api_view(['PUT'])
def update_product_mix_items(request):
    mix = request.data['activeProductMix']
    items = request.data['productArray']
    # Clear all items from the product mix template
    product_mix = ProductMixTemplate.objects.get(product_mix_template_id=mix)
    
    # Create or update item_list based on req.data
    for item in items:
            inventory_item = InventoryItem.objects.create(
                product_id=item,
                category=update_item_list_categories(item)
            )
            inventory_item.save()
            # Add the inventory item to the product mix template
            product_mix.item_list.add(inventory_item.inventory_item_id)
            product_mix.save()
    response_data = {
        'message': 'Product mix items created successfully',
    }
    return Response(response_data, status=status.HTTP_201_CREATED)


def update_item_list_categories(product_id):
    # Find the product
    product = Product.objects.get(product_id=product_id)
    # Find the product's category
    return product.category


@api_view(['GET'])
def get_product_mix_items(request):
    # Get the product mix template id from the request
    print("Request data:", request)


@api_view(['GET'])
def find_inventory_item(request):
    # print("Request data:", request.GET.get('data[item_list][0]'))
    
    item_list = []

    for key, value in request.GET.items():
        if key.startswith('inventoryItems[item_list]'):
            id = item_list.append(value)

    inventory_items = []
    for item in item_list:
        inventory_items.append(InventoryItem.objects.get(inventory_item_id=item))

    serialized_inventory_items = serializers.serialize('json', inventory_items)
    parsed_inventory_items = json.loads(serialized_inventory_items)
    print(parsed_inventory_items)
    return Response(parsed_inventory_items, status=status.HTTP_200_OK)

@api_view(['POST'])
def create_inventory_sheet(request):
    print("Request data:", request.data)
    return Response(status=status.HTTP_200_OK)
