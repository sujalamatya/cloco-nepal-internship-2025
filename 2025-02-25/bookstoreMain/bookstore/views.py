from django.http import HttpResponse
from django.shortcuts import render
from .models import Author,Book

def index(request):
    return render(request, 'bookstore/index.html')  # Load the template

def author_list(request):
    authors = Author.objects.all()  # Get all authors from the database
    return render(request, 'bookstore/author_list.html', {'authors': authors})

def book_list(request):
    books = Book.objects.all()  # Get all books from the database
    return render(request, 'bookstore/book_list.html', {'books': books})


