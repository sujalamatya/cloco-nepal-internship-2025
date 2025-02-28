from django.urls import path
from .views import (
    AuthorListCreateAPIView,AuthorDetailAPIView,BookListCreateAPIView,BookDetailAPIView,CategoryListCreateAPIView,CategoryDetailAPIView)

urlpatterns = [
    path('authors/', AuthorListCreateAPIView.as_view(), name='author-list'),
    path('authors/<int:pk>/', AuthorDetailAPIView.as_view(), name='author-detail'),
    
    path('books/', BookListCreateAPIView.as_view(), name='book-list'),
    path('books/<int:pk>/', BookDetailAPIView.as_view(), name='book-detail'),

    path('categories/', CategoryListCreateAPIView.as_view(), name='category-list'),
    path('category/<int:pk>/', CategoryDetailAPIView.as_view(), name='category-detail'),
]
