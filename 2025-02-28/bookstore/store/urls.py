from django.urls import path
from .views.author_views import AuthorListCreateAPIView, AuthorDetailAPIView
from .views.book_views import BookListCreateAPIView,BookDetailAPIView
from .views.category_views import CategoryListCreateAPIView,CategoryDetailAPIView
from .views.publisher_views import PublisherDetailAPIView,PublisherListCreateAPIView
from .views.customer_views import CustomerListCreateAPIView,CustomerDetailAPIView
from .views.employee_views import EmployeeDetailAPIView,EmployeeListCreateAPIView
from .views.orderdetail_views import OrderDetailDetailAPIView,OrderDetailListCreateAPIView
from .views.user_views import UserDetailAPIView,UserListCreateAPIView
from .views.invertory_views import InventoryDetailAPIView,InventoryListCreateAPIView
from .views.orderitem_views import OrderItemDetailAPIView,OrderItemListCreateAPIView

urlpatterns = [
    path('authors/', AuthorListCreateAPIView.as_view(), name='author-list'),
    path('authors/<int:pk>/', AuthorDetailAPIView.as_view(), name='author-detail'),
    
    path('books/', BookListCreateAPIView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailAPIView.as_view(), name='book-detail'),

    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list'),
    path('category/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),

    path('publisher/', PublisherListCreateAPIView.as_view(), name='Publisher-list'),
    path('publisher/<int:pk>/', PublisherDetailAPIView.as_view(), name='Publisher-detail'),

    path('customer/', CustomerListCreateAPIView.as_view(), name='customer-list'),
    path('customer/<int:pk>/', CustomerDetailAPIView.as_view(), name='customer-detail'),

    path('employee/', EmployeeListCreateAPIView.as_view(), name='employee-list'),
    path('employee/<int:pk>/', EmployeeDetailAPIView.as_view(), name='employee-detail'),

    path('orderdetail/', OrderDetailListCreateAPIView.as_view(), name='orderdetail-list'),
    path('orderdetail/<int:pk>/', OrderDetailDetailAPIView.as_view(), name='orderdetail-detail'),

    path('orderitem/', OrderItemListCreateAPIView.as_view(), name='orderitem-list'),
    path('orderitem/<int:pk>/', OrderItemDetailAPIView.as_view(), name='orderitem-detail'),

    path('user/', UserListCreateAPIView.as_view(), name='user-list'),
    path('user/<int:pk>/', UserDetailAPIView.as_view(), name='user-detail'),

    path('inverntory/', InventoryListCreateAPIView.as_view(), name='inverntory-list'),
    path('inverntory/<int:pk>/', InventoryDetailAPIView.as_view(), name='inverntory-detail'),
]
