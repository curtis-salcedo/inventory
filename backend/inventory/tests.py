from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse
from .models import Inventory, InventoryItem, Category, Location, Business, Product, ProductMixTemplate, SubCategory


class UsersManagersTests(TestCase):

    def test_create_user(self):
        User = get_user_model()
        user = User.objects.create_user(email="normal@user.com", password="foo")
        self.assertEqual(user.email, "normal@user.com")
        self.assertTrue(user.is_active)
        self.assertFalse(user.is_staff)
        self.assertFalse(user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(user.username)
        except AttributeError:
            pass
        with self.assertRaises(TypeError):
            User.objects.create_user()
        with self.assertRaises(TypeError):
            User.objects.create_user(email="")
        with self.assertRaises(ValueError):
            User.objects.create_user(email="", password="foo")

    def test_create_superuser(self):
        User = get_user_model()
        admin_user = User.objects.create_superuser(email="super@user.com", password="foo")
        self.assertEqual(admin_user.email, "super@user.com")
        self.assertTrue(admin_user.is_active)
        self.assertTrue(admin_user.is_staff)
        self.assertTrue(admin_user.is_superuser)
        try:
            # username is None for the AbstractUser option
            # username does not exist for the AbstractBaseUser option
            self.assertIsNone(admin_user.username)
        except AttributeError:
            pass
        with self.assertRaises(ValueError):
            User.objects.create_superuser(
                email="super@user.com", password="foo", is_superuser=False)
            
class CreateCSVTests(TestCase):

    def test_create_csv(self):
        businesstest = Business.objects.create(
            business_id=1,
            name="Test Business Name",
        )
        categorytest = Category.objects.create(
            category_id=1,
            business=businesstest,
            name="Test Category Name",
            description="Test Description",
        )
        subcategorytest = SubCategory.objects.create(
            sub_category_id=1,
            category=categorytest,
            name="Test Subcategory Name",
        )
        producttest = Product.objects.create(
            product_id=1,
            category=categorytest,
            name="Test Product Name",
            description="Test Description",
            product_number="Test Product Number",
            price=1.00,
            case_size=1,
            count_by="Test Count By",
            sub_category=subcategorytest,
        )

        locationtest = Location.objects.create(
            location_id=1,
            business=businesstest,
            name="Test Location Name",
            address="Test Location Address",
        )

        inventorytest = Inventory.objects.create(
            inventory_id=1,
            name="Test Inventory Name",
            location=locationtest,
        )
        item1 = InventoryItem.objects.create(
            product=producttest,
            quantity=1,
            inventory=inventorytest,
            category=categorytest,
            price=1.00,
            total=1.00,
        )
        item2 = InventoryItem.objects.create(
            product=producttest,
            quantity=2,
            inventory=inventorytest,
            category=categorytest,
            price=2.00,
            total=4.00,
        )
        
        inventorytest.item_list.add(item1, item2)

        # Test request to export inventory view
        url = reverse('export_inventory')
        response = self.client.get(url, {'inventoryId': inventorytest.inventory_id})

        # Assertions
        self.assertEqual(response.status_code, 200)