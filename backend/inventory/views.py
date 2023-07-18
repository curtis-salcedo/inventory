from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.core import serializers
from django.utils import timezone
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.auth import authenticate, login, logout
from django.views.decorators.csrf import csrf_exempt
from django.db import models

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import viewsets, status

from .serializers import CustomUserSerializer, BusinessSerializer, LocationSerializer, CategorySerializer, ProductSerializer, InventoryItemSerializer, InventorySerializer, SubCategorySerializer

from .models import CustomUser, Business, Location, Category, Product, InventoryItem, Inventory, SubCategory

from .forms import CustomSignupForm

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

class SubCategoryView(viewsets.ModelViewSet):
    serializer_class = SubCategorySerializer
    queryset = SubCategory.objects.all()

def home(request):
    return render(request, 'home.html')

# Keeping this commented out for now to see if this can work at some point
# The google_login_proxy is working for now
# def google_auth_callback(request):
#     print('Google Login Proxy request:', request)
#     redirect_url = 'http://localhost:8000/accounts/google/login/' 
#     # return JsonResponse({'redirect_url': redirect_url})
#     return JsonResponse({'redirect_url': redirect_url}, status=status.HTTP_200_OK, safe=False)

def import_products(request):
    user = request.user
    if request.method == 'POST':
        # Define the file being uploaded
        uploaded_file = request.FILES['file']
        # Read the file, which was saved in 8 bit format
        file_content = uploaded_file.read().decode('utf-8').splitlines()
        # Create a reader object to iterate through the file
        reader = csv.reader(file_content)
        # Skip the first row of the file
        next(reader)
        # Iterate through the file and create a product for each row
        for row in reader:
            # Guard against duplicate products
            if Product.objects.filter(models.Q(number=row[0]) | models.Q(name=row[2])).exists():
                print(f"Product exists: {row[0]}")
                continue
            # Guard against duplicate categories, and create a new category if it doesn't exist
            if Category.objects.filter(name=row[4]).exists():
                cat = Category.objects.get(name=row[4])
                print(f"Category exists: {cat.category_id}")
                
            else:
                cat = Category.objects.create(
                    name=row[4],
                    business=user.business,
                )
                print(f"Category created: {cat.name}")
            # Check for Sub Category, and create a new sub category if it doesn't exist
            subcategories = SubCategory.objects.filter(name=row[3], category=cat)
            if subcategories.exists():
                sub = subcategories.first()
                print(f"Sub Category exists: {sub.name}")
            else:
                sub = SubCategory.objects.create(
                    name=row[3],
                    category=cat,
                )
                print(f"Sub Category created: {sub.name}")
            product = Product.objects.create(
                number=row[0],
                vendor=row[1],
                name=row[2],
                sub_category=sub,
                category=cat,
                case_size=row[5],
                pack_type=row[6],
                count_by=row[7],
                price=float(row[8]),
            )
            print(f"Product created: {product.name}")
            product.save()
    else:
        print('Test Import is not a POST request', request.method)
        return
    return JsonResponse({'message': 'Data Import successful'}, status=status.HTTP_200_OK, safe=False)

def proxy_login(request):
    print('Proxy Login request:', request)
    redirect_url = 'http://localhost:8000/accounts/login/'
    login_success = True
    if login_success:
        close_script = '''
        <script>
            window.opener.postMessage('login_success', '*');
            window.close();
        </script>
        '''
        return JsonResponse({'redirect_url': redirect_url, 'login_success': True, 'close_script': close_script}, status=status.HTTP_200_OK, safe=False)
    else:
        return JsonResponse({'redirect_url': redirect_url, 'login_success': False}, status=status.HTTP_200_OK, safe=False)

def google_login_proxy(request):
    print('Google Login Proxy request:', request)
    redirect_url = 'http://localhost:8000/accounts/google/login/' 
    return JsonResponse({'redirect_url': redirect_url}, status=status.HTTP_200_OK, safe=False)

def redirect_view(request):
    print("Redirect request:", request)
    redirect_url = 'http://localhost:3000/'
    return HttpResponseRedirect(redirect_url)

@api_view(['POST'])
def user_login(request):
    email = request.data['email']
    password = request.data['password']
    user = authenticate(request, email=email, password=password)
    business = user.business
    print(business)
    if user is not None:
        login(request, user)
        user_data = {
            'email': user.email,
            'name': user.name,
            'business_id': user.business.business_id,
            'business_name': user.business.name,
        }
        print(user_data)
        return Response(user_data, status=status.HTTP_200_OK)
    else:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
def get_user(request):
    print("Check User Request data:", request)
    if request.user.is_authenticated:
        user_data = {
            'email': request.user.email,
            'name': request.user.name,
            'business': request.user.business.business_id,
        }
        print(user_data)
        return JsonResponse(user_data, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'User is not authenticated.'})
    
@api_view(['POST'])
def user_logout(request):
    print("User Logout request:", request)
    logout(request)
    redirect_url = 'http://localhost:3000/'
    return Response(redirect_url, status=status.HTTP_200_OK)

def signup(request):
    print('Sign Up Proxy request:', request)
    redirect_url = 'http://localhost:8000/accounts/login/'
    return JsonResponse({'redirect_url': redirect_url}, status=status.HTTP_200_OK, safe=False)



@api_view(['POST'])
def create_inventory(request):
    print("Request data:", request.data)
    month = int(request.data['month'])
    year = int(request.data['year'])
    print( request.data['user'] )
    location_id = request.data['location']
    # find the location
    foundLocation = Location.objects.get(location_id=location_id)
    new_inventory = Inventory.objects.create(
        location=foundLocation,
        created_at=timezone.now(),
        month=month,
        year=year,
        name=request.data['name'],
        user=request.user,
    )
    new_inventory.save()
    print(f"New inventory created with the name of {new_inventory.name} and the id of: {new_inventory.inventory_id}")
    # Automatically create items based on the list of products and push into the inventory under item_list
    items = auto_create_inventory_list(new_inventory.inventory_id)
    for item in items:
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
        # print(f"The following inventory items were created: {items}")
    return items

def update_item_list_categories(product_id):
    # Find the product
    product = Product.objects.get(product_id=product_id)
    # Find the product's category
    return product.category


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


@api_view(['GET'])
def get_inventory_items(request):
    inventory_id = request.GET.get('inventory_id')
    inventory_items = Inventory.objects.get(inventory_id=inventory_id).item_list.all()
    active_inventory_items = []
    for item in inventory_items:
        inventory_item_id = item.inventory_item_id
        name = item.product.name.upper()
        category = item.category.name.upper()
        count_by = item.product.count_by.upper()
        quantity = item.quantity
        total = item.total
        price = item.price
        vendor = item.product.vendor.upper()
        sub_category = item.product.sub_category.name.upper()
        active_inventory_items.append({
            'inventory_item_id': inventory_item_id,
            'name': name,
            'category': category,
            'count_by': count_by,
            'quantity': quantity,
            'total': total,
            'price': price,
            'vendor': vendor,
            'sub_category': sub_category,
            'product_number': Product.objects.get(product_id=item.product_id).number.upper(),
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
        number = product.number
        name = product.name
        category = product.category.name
        sub_category = product.sub_category.name
        vendor = product.vendor
        pack_type = product.pack_type
        count_by = product.count_by
        case_size = product.case_size
        price = product.price
        product_list.append({
            'product_id': product_id,
            'number': number,
            'name': name,
            'category': category,
            'sub_category': sub_category,
            'vendor': vendor,
            'pack_type': pack_type,
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
    total_inventory = 0
    for item in request_items:
        total_inventory = total_inventory + int(item.total)
        export_data.append({
            'name': item.product.name,
            'category': item.category.name,
            'count_by': item.product.count_by,
            'quantity': item.quantity,
            'total': item.total,
            'price': item.price,
        })
    export_inventory = {
        'business': request_inventory.location.business.name,
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
    print('Total Inventory:', total_inventory)
    print("Export inventory:", export_inventory)
    response = HttpResponse(content_type='text/csv')
    response['Content-Disposition'] = f"attachment; filename='{request_inventory.name}.csv'"
    # writer.writerow({
    #     'Business Name': request_inventory.location.business.name,
    #     'Location': request_inventory.location.name,
    #     'Period': f"{request_inventory.month} / {request_inventory.year}",
    #     })
    fieldnames = ['name', 'category', 'count_by', 'quantity', 'total', 'price', 'Business Name', 'Location', 'Period', 'Total']
    writer = csv.DictWriter(response, fieldnames=fieldnames)
    writer.writeheader()
    writer.writerows(export_data)
    writer = csv.DictWriter(response, fieldnames=fieldnames)
    writer.writerow({
        'Business Name': request_inventory.location.business.name,
        'Location': request_inventory.location.name,
        'Period': f"{request_inventory.month} / {request_inventory.year}",
        })
    writer.writerow({
        'Total': total_inventory,
    })
    return response
    # return JsonResponse(export_inventory, status=status.HTTP_200_OK, safe=False)

# Business Views
@api_view(['POST'])
def get_business_users(request):
    print("Request get_business_users data:", request.data)
    business_id = request.data['business_id']
    business = Business.objects.get(business_id=business_id)
    users = business.users.all()
    
    pass