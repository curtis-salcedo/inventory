from django.db import models

# Main Business Model for user
class Business(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=100)
    email = models.CharField(max_length=50)

    def _str_(self):
        return self.name
    
# Category Model
# Category can have many products but product can only have one category
class Category(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=100)
    business = models.ForeignKey(Business, on_delete=models.CASCADE)

    def _str_(self):
        return self.name
