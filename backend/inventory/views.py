from django.shortcuts import render
from rest_framework import viewsets
from .serializers import BusinessSerializer, CategorySerializer
from .models import Business, Category

# Create your views here.

class BusinessView(viewsets.ModelViewSet):
    serializer_class = BusinessSerializer
    queryset = Business.objects.all()

class CategoryView(viewsets.ModelViewSet):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()