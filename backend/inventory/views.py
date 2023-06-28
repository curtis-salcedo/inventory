from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, status
from django.utils import timezone
from .serializers import CustomUserSerializer, BusinessSerializer, LocationSerializer, CategorySerializer, ProductSerializer, InventoryItemSerializer, InventorySerializer, ProductMixTemplateSerializer, SubCategorySerializer
from .models import CustomUser, Business, Location, Category, Product, InventoryItem, Inventory, ProductMixTemplate, SubCategory
from django.core import serializers
import json, csv


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

class SubCategoryView(viewsets.ModelViewSet):
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.all()


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
    print(f"New inventory created with the name of {new_inventory.name} and the id of: {new_inventory.inventory_id}")
    # Automatically create items based on the list of products and push into the inventory under item_list
    items = auto_create_inventory_list(new_inventory.inventory_id)
    for item in items:
        print(item)
        new_inventory.item_list.add(item)
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
        items.append(inventory_item)
        print(f"The following inventory items were created: {items}")
    return items


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


@api_view(['GET'])
def get_inventory_items(request):
    inventory_id = request.GET.get('inventory_id')
    inventory_items = Inventory.objects.get(inventory_id=inventory_id).item_list.all()
    active_inventory_items = []
    for item in inventory_items:
        inventory_item_id = item.inventory_item_id
        name = item.product.name
        category = item.category.name
        count_by = item.product.count_by
        quantity = item.quantity
        total = item.total
        price = item.price
        active_inventory_items.append({
            'inventory_item_id': inventory_item_id,
            'name': name,
            'category': category,
            'count_by': count_by,
            'quantity': quantity,
            'total': total,
            'price': price,
        })
    return JsonResponse(active_inventory_items, status=status.HTTP_200_OK, safe=False)


@api_view(['PUT'])
def update_inventory_sheet(request, id):
    print("Request data:", request.data)
    print("Request id:", id)
    return Response(status=status.HTTP_200_OK)


@api_view(['GET'])
def get_item_detail(request, id):
    print("Request id:", id)
    inventory_item = InventoryItem.objects.get(inventory_item_id=id)
    inventory_item = {
        'inventory_item_id': inventory_item.inventory_item_id,
        'name': inventory_item.product.name,
        'category': inventory_item.category.name,
        'count_by': inventory_item.product.count_by,
        'quantity': inventory_item.quantity,
        'total': inventory_item.total,
        'price': inventory_item.price,
    }
    return JsonResponse(inventory_item, status=status.HTTP_200_OK, safe=False)

@api_view(['GET'])
def get_products(request):
    print("Request data:", request)
    products = Product.objects.all()
    
    product_list = []
    for product in products:
        product_id = product.product_id
        product_number = product.product_number
        name = product.name
        category = product.category.name
        sub_category = product.sub_category.name
        count_by = product.count_by
        case_size = product.case_size
        price = product.price
        product_list.append({
            'product_id': product_id,
            'product_number': product_number,
            'name': name,
            'category': category,
            'sub_category': sub_category,
            'count_by': count_by,
            'case_size': case_size,
            'price': price,
        })
    return JsonResponse(product_list, status=status.HTTP_200_OK, safe=False)


@api_view(['POST'])
def create_product(request):
    print("Request data:", request.data)

    sub_category = SubCategory.objects.get(name=request.data['sub_category'])

    Product.objects.create(
        category_id=request.data['category'],
        name=request.data['name'],
        description=request.data['description'],
        product_number=request.data['product_number'],
        price=request.data['price'],
        case_size=request.data['case_size'],
        count_by=request.data['count_by'],
        sub_category=sub_category,
    )

    return Response(status=status.HTTP_200_OK)

@api_view(['GET'])
def export_inventory(request):
    request_id = request.GET.get('inventoryId')
    request_inventory = Inventory.objects.get(inventory_id=request_id)
    request_items = request_inventory.item_list.all()

    export_data = []
    for item in request_items:
        export_data.append({
            'name': item.product.name,
            'category': item.category.name,
            'count_by': item.product.count_by,
            'quantity': item.quantity,
            'total': item.total,
            'price': item.price,
        })

    export_inventory = {
        'name': request_inventory.name,
        'inventory_id': request_inventory.inventory_id,
        'location': request_inventory.location.name,
        'month': request_inventory.month,
        'year': request_inventory.year,
        'created_at': request_inventory.created_at,
        'updated_at': request_inventory.updated_at,
        'name': request_inventory.name,
        'item_list': export_data,
    }
    print("Export inventory:", export_inventory)

    response = HttpResponse(content_type='text/csv')
    
    response['Content-Disposition'] = f"attachment; filename='{request_inventory.name}.csv'"

    fieldnames = ['name', 'category', 'count_by', 'quantity', 'total', 'price']

    writer = csv.DictWriter(response, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(export_data)

    return response

    # return JsonResponse(export_inventory, status=status.HTTP_200_OK, safe=False)