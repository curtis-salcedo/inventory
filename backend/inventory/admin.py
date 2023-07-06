from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser, Business, Location, Category, Product, InventoryItem, Inventory, ProductMixTemplate, SubCategory, InventorySubmission
from .forms import CustomUserCreationForm, CustomUserChangeForm

class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = CustomUser
    list_display = ("email", "is_staff", "is_active", "business")
    list_filter = ("email", "is_staff", "is_active", "business")
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active", "groups", "user_permissions")}),
        ("Business", {"fields": ("business",)}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": (
                "email", "password1", "password2", "is_staff", "is_manager",
                "is_active", "groups", "user_permissions", "business"
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
    list = ('name', 'description', 'number', 'category', 'sub_category', 'price', 'case_size', 'count_by', 'vendor', 'pack_type')

class InventoryItemAdmin(admin.ModelAdmin):
    list = ('inventory', 'product', 'qauntity', 'total', 'price')

class InventoryAdmin(admin.ModelAdmin):
    list = ('location', 'product', 'quantity', 'total', 'created_at', 'updated_at')

class ProductMixTemplateAdmin(admin.ModelAdmin):
    list = ('business', 'name', 'created_at', 'updated_at', 'description', 'item_list')

class SubCategoryAdmin(admin.ModelAdmin):
    list = ('name', 'category')

class InventorySubmissionAdmin(admin.ModelAdmin):
    list = ('inventory', 'submitted_by', 'submitted_at', 'category_totals')

admin.site.register(CustomUser, CustomUserAdmin)
admin.site.register(Business, BusinessAdmin)
admin.site.register(Location, LocationAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(InventoryItem, InventoryItemAdmin)
admin.site.register(Inventory, InventoryAdmin)
admin.site.register(ProductMixTemplate, ProductMixTemplateAdmin)
admin.site.register(SubCategory, SubCategoryAdmin)

