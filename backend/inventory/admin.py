from django.contrib import admin
from .models import Business, Category

class Business(admin.ModelAdmin):
    list = ('name', 'address', 'phone_number', 'email')

    admin.site.register(Business)

class Category(admin.ModelAdmin):
    list = ('name', 'description', 'business')

    admin.site.register(Category)

