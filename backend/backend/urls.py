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
router.register('user', views.CustomUserView)
router.register('business', views.BusinessView)
router.register('location', views.LocationView)
router.register('category', views.CategoryView)
router.register('products', views.ProductView)
router.register('inventory_items', views.InventoryItemView)
router.register('inventory', views.InventoryView)
router.register('product_mix', views.ProductMixTemplateView)
router.register('sub_category', views.SubCategoryView)

urlpatterns = [
    path('', views.home, name='home'),
    path('admin/', admin.site.urls),
    path('accounts/', include('allauth.urls')),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

    # path('auth/google/callback/', views.google_auth_callback, name='google_auth_callback'),

    path('api/test_import/', views.test_import, name='test_import'),

    # path('accounts/google/login/callback/', views.google_auth_callback, name='google_auth_callback'), 

    path('accounts/google/login/request/', views.google_login_proxy, name='google_login_proxy'),
    path('redirect/', views.redirect_view, name='redirect'),

    # Authenication URLs
    path('api/signup/', views.signup, name='signup'),
    path('api/login/', views.user_login, name='user_login'),
    path('api/logout/', views.user_logout, name='user_logout'),
    path('api/get_user/', views.get_user, name='get_user'),

    # path('api/logout/', views.logout, name='logout'),

    # Export URLs
    path('api/export_inventory/', views.export_inventory, name='export_inventory'),

    # Inventory URLs
    path('api/create_inventory/', views.create_inventory, name='create_inventory'),
    path('api/create_inventory_sheet/', views.create_inventory_sheet, name='create_inventory_sheet'),

    # Product Mix URLs
    path('api/create_product_mix/', views.create_product_mix, name='create_product_mix'),
    path('api/update_product_mix_items/', views.update_product_mix_items, name='update_product_mix_items'),
    path('api/get_product_mix_items/', views.get_product_mix_items, name='get_product_mix_items'),

    # Inventory Item URLs
    path('api/find_inventory_item/', views.find_inventory_item, name='find_inventory_item'),
    path('api/get_inventory_items/', views.get_inventory_items, name='get_inventory_items'),
    path('api/update_inventory_sheet/<int:id>', views.update_inventory_sheet, name='update_inventory_sheet'),
    path('api/get_item_detail/<int:id>', views.get_item_detail, name='get_item_detail'),

    # Products URLs
    path('api/get_products/', views.get_products, name='get_products'),
    path('api/create_product/', views.create_product, name='create_product'),
]

