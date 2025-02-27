from django.urls import path
from .views import author_list,book_list,add_book,add_author,edit_author,delete_author,edit_book,delete_book
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path('authors/', author_list, name='author_list'),
    path('books/', book_list, name='book_list'),
    path("books/add/", add_book, name="add_book"),
    path("authors/add/", add_author, name="add_author"),
    path('authors/edit/<int:author_id>/', edit_author, name='edit_author'),
    path('authors/delete/<int:author_id>/',delete_author, name='delete_author'),
    path('books/edit/<int:book_id>/', edit_book, name='edit_book'),
    path('books/delete/<int:book_id>/', delete_book, name='delete_book'),
]