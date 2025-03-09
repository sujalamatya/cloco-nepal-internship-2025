from django.db import models

class Author(models.Model):
    name = models.CharField(max_length=50)
    genre = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


class Category(models.Model):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Publisher(models.Model):
    name = models.CharField(max_length=50)
    contact_info = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


class Book(models.Model):
    title = models.CharField(max_length=50)
    stock_quantity = models.IntegerField(default=0)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL)
    publisher = models.ForeignKey(Publisher, null=True, blank=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.title


class Customer(models.Model):
    name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, unique=True)

    def __str__(self):
        return self.name


class Employee(models.Model):
    ROLE_CHOICES = [
        ('Manager', 'Manager'),
        ('Cashier', 'Cashier'),
        ('Stock Manager', 'Stock Manager'),
    ]
    name = models.CharField(max_length=50)
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    salary = models.DecimalField(max_digits=10, decimal_places=2)
    hire_date = models.DateField()

    def __str__(self):
        return self.name


class User(models.Model):
    ROLE_CHOICES = [
        ('admin', 'Admin'),
        ('customer', 'Customer'),
        ('employee', 'Employee'),
    ]
    username = models.CharField(max_length=50, unique=True)
    password = models.TextField()  # Store hashed passwords!
    role = models.CharField(max_length=50, choices=ROLE_CHOICES)
    employee = models.OneToOneField(Employee, null=True, blank=True, on_delete=models.SET_NULL, unique=True)
    customer = models.OneToOneField(Customer, null=True, blank=True, on_delete=models.SET_NULL, unique=True)

    def __str__(self):
        return self.username


class Inventory(models.Model):
    book = models.OneToOneField(Book, on_delete=models.CASCADE)
    stock_quantity = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.book.title} - {self.stock_quantity} in stock"


class OrderDetail(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"Order {self.id} - {self.customer.name}"


class OrderItem(models.Model):
    order = models.ForeignKey(OrderDetail, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    quantity = models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.book.title} x {self.quantity}"
