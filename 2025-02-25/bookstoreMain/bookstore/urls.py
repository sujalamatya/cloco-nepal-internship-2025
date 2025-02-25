from django.urls import path
from .views import author_list,book_list
from . import views

urlpatterns = [
    path("", views.index, name="index"),
     path('authors/', author_list, name='author_list'),
     path('books/', book_list, name='book_list'),
]