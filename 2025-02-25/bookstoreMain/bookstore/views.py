from django.http import HttpResponse
from django.shortcuts import render,redirect
from .models import Author,Book
from .forms import BookForm , AuthorForm

def index(request):
    return render(request, 'bookstore/index.html')  # Load the template

def author_list(request):
    authors = Author.objects.all()  # Get all authors from the database
    return render(request, 'bookstore/author_list.html', {'authors': authors})

def book_list(request):
    books = Book.objects.all()  # Get all books from the database
    return render(request, 'bookstore/book_list.html', {'books': books})

def add_book(request):
    if request.method == "POST":
        form = BookForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("book_list")  # Redirect to the book list page
    else:
        form = BookForm()
    
    return render(request, "bookstore/add_book.html", {"form": form})

def add_author(request):
    if request.method == "POST":
        form = AuthorForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("author_list")  # Redirect to the author list page
    else:
        form = AuthorForm()
    
    return render(request, "bookstore/add_author.html", {"form": form})