from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.

class Profile(AbstractUser):
    #USERNAME_FIELD = 'email'


    REQUIRED_FIELDS = []

