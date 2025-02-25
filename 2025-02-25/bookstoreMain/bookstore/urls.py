from django.urls import path
from .views import author_list,book_list,add_book
from . import views

urlpatterns = [
    path("", views.index, name="index"),
     path('authors/', author_list, name='author_list'),
     path('books/', book_list, name='book_list'),
      path("books/add/", add_book, name="add_book"),
]