from django.contrib import admin
from .models import Author,Category,Publisher,Book,Customer,Employee,User,Inventory,OrderDetail,OrderItem

admin.site.register(Author)
admin.site.register(Category)
admin.site.register(Publisher)
admin.site.register(Book)
admin.site.register(Customer)
admin.site.register(Employee)
admin.site.register(User)
admin.site.register(Inventory)
admin.site.register(OrderDetail)
admin.site.register(OrderItem)