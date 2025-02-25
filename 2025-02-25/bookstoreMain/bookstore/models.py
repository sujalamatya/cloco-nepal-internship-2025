# 4 bookstore models
from django.db import models
from django.contrib.auth.models import AbstractUser

class Author(models.Model):
    name = models.CharField(max_length=50)
    genre = models.CharField(max_length=50, blank=True, null=True)  # Optional

    def __str__(self):
        return self.name

class Customer(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name

class Book(models.Model):
    title = models.CharField(max_length=50)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class User(models.Model):
    class Role(models.TextChoices):  # Enum-like choices for PostgreSQL
        ADMIN = 'admin', 'Admin'
        CUSTOMER = 'customer', 'Customer'
        EMPLOYEE = 'employee', 'Employee'

    username = models.CharField(max_length=50, unique=True)
    password = models.TextField()  # Store hashed passwords!
    role = models.CharField(max_length=50, choices=Role.choices)
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True, blank=True)

    def __str__(self):
        return self.username
