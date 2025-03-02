from django.urls import path
from .views import (
    AuthorListCreateAPIView,AuthorDetailAPIView,BookListCreateAPIView,BookDetailAPIView,CategoryListCreateAPIView,CategoryDetailAPIView,PublisherListCreateAPIView,PublisherDetailAPIView, CustomerDetailAPIView,CustomerListCreateAPIView)

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
]
