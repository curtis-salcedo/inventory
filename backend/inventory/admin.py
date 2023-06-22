from django.contrib import admin
from .models import User, Business, Location, Category, Product, InventoryItem, Inventory, ProductMixTemplate

class UserAdmin(admin.ModelAdmin):
    list = ('username', 'first_name', 'last_name', 'email', 'phone', 'business', 'is_active', 'is_staff', 'is_manager', 'is_admin', 'is_superuser')

    # admin.site.register(User, UserAdmin)

class BusinessAdmin(admin.ModelAdmin):
    list = ('name', 'address', 'phone_number', 'email')

    # admin.site.register(Business, BusinessAdmin)

class LocationAdmin(admin.ModelAdmin):
    list = ('name', 'address', 'business')

    # admin.site.register(Location, LocationAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list = ('name', 'description', 'business')

    # admin.site.register(Category, CategoryAdmin)

class ProductAdmin(admin.ModelAdmin):
    list = ('name', 'description', 'product_number', 'category')

    # admin.site.register(Product, ProductAdmin)

class InventoryItemAdmin(admin.ModelAdmin):
    list = ('id', 'inventory', 'product', 'qauntity')

    # admin.site.register(InventoryItem, InventoryItemAdmin)

class InventoryAdmin(admin.ModelAdmin):
    list = ('location', 'product', 'quantity', 'total', 'created_at', 'updated_at')

    # admin.site.register(Inventory, InventoryAdmin)

class ProductMixTemplateAdmin(admin.ModelAdmin):
    list = ('business', 'name', 'created_at', 'updated_at', 'description', 'item_list')

    # admin.site.register(ProductMixTemplate, ProductMixTemplateAdmin)

admin.site.register(User, UserAdmin)
admin.site.register(Business, BusinessAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(InventoryItem, InventoryItemAdmin)
admin.site.register(Inventory, InventoryAdmin)
admin.site.register(ProductMixTemplate, ProductMixTemplateAdmin)

