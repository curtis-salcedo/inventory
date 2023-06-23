from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Business, Location, Category, Product, InventoryItem, Inventory, ProductMixTemplate
from .forms import CustomUserCreationForm, CustomUserChangeForm

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ("email", "is_staff", "is_manager", "is_active",)
    list_filter = ("email", "is_staff", "is_manager", "is_active",)
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_manager", "is_active", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "is_staff", "is_manager",
                "is_active", "groups", "user_permissions"
            )}
        ),
    )
    search_fields = ("email",)
    ordering = ("email",)

class BusinessAdmin(admin.ModelAdmin):
    list = ('name', 'address', 'phone_number', 'email')


class LocationAdmin(admin.ModelAdmin):
    list = ('name', 'address', 'business')


class CategoryAdmin(admin.ModelAdmin):
    list = ('name', 'description', 'business')

class ProductAdmin(admin.ModelAdmin):
    list = ('name', 'description', 'product_number', 'category')

class InventoryItemAdmin(admin.ModelAdmin):
    list = ('id', 'inventory', 'product', 'qauntity')

class InventoryAdmin(admin.ModelAdmin):
    list = ('location', 'product', 'quantity', 'total', 'created_at', 'updated_at')

class ProductMixTemplateAdmin(admin.ModelAdmin):
    list = ('business', 'name', 'created_at', 'updated_at', 'description', 'item_list')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Business, BusinessAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(InventoryItem, InventoryItemAdmin)
admin.site.register(Inventory, InventoryAdmin)
admin.site.register(ProductMixTemplate, ProductMixTemplateAdmin)

