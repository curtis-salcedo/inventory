from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.hashers import make_password
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):

    def create_user(self, email, name, password, **extra_fields):
        if not email:
            raise ValueError("The Email must be set to create account")
        
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, **extra_fields)

        user.password = make_password(password)
        user.save()

        return user