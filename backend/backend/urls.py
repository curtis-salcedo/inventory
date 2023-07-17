"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from inventory import views

router = routers.DefaultRouter()
router.register('users', views.CustomUserView)
router.register('businesses', views.BusinessView)
# Look at adding a custom route for the user business view
# router.register('users/(?P<user_id>\d+)/businesses', views.UserBusinessView, basename='userbusiness')
router.register('locations', views.LocationView)
router.register('categories', views.CategoryView)
router.register('products', views.ProductView)
router.register('inventory_items', views.InventoryItemView)
router.register('inventories', views.InventoryView)
router.register('sub_categories', views.SubCategoryView)

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    path('proxy/accounts/login/', views.proxy_login, name='proxy_login'),
    # path('proxy/accounts/logout/', views.proxy_logout, name='proxy_logout'),
    path('proxy/accounts/google/login/request/', views.google_login_proxy, name='google_login_proxy'),
    path('accounts/google/login/request/', views.google_login_proxy, name='google_login_proxy'),
    path('redirect/', views.redirect_view, name='redirect'),

    # Authenication URLs
    path('api/signup/', views.signup, name='signup'),
    path('api/login/', views.user_login, name='user_login'),
    path('api/logout/', views.user_logout, name='user_logout'),
    path('api/get_user/', views.get_user, name='get_user'),

    # path('api/logout/', views.logout, name='logout'),

    # Data URLs
    path('api/data/import/products', views.import_products, name='import_products'),
    path('api/data/export/inventories', views.export_inventory, name='export_inventory'),

    # Business URLs
    path('api/businesses/users', views.get_business_users, name='get_business_users'),

    # Inventory URLs
    path('api/inventory/create/', views.create_inventory, name='create_inventory'),
    path('api/inventory/update/<int:id>', views.update_inventory_sheet, name='update_inventory_sheet'),

    # Inventory Item URLs
    path('api/inventory/items/find', views.find_inventory_item, name='find_inventory_item'),
    path('api/inventory/items/', views.get_inventory_items, name='get_inventory_items'),
    path('api/inventory/items/<int:id>', views.get_item_detail, name='get_item_detail'),

    # Products URLs
    path('api/products/', views.get_products, name='get_products'),
    path('api/products/create', views.create_product, name='create_product'),

]

