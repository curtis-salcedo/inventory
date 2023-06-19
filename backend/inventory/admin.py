from django.contrib import admin
from .models import Business, Category

class BusinessAdmin(admin.ModelAdmin):
    list = ('name', 'address', 'phone_number', 'email')

    # admin.site.register(Business, BusinessAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list = ('name', 'description', 'business')

    # admin.site.register(Category, CategoryAdmin)

admin.site.register(Category, CategoryAdmin)
admin.site.register(Business, BusinessAdmin)

