from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Author, Category, Publisher, Book, Customer, Employee, User, Inventory, OrderDetail, OrderItem

from .serializers import (
    AuthorSerializer,CategorySerializer,PublisherSerializer,BookSerializer,CustomerSerializer,EmployeeSerializer,UserSerializer,InventorySerializer,OrderDetailSerializer,OrderItemSerializer
)
# 1 Authors APIView
class AuthorListCreateAPIView(APIView):
    def get(self,request):
        authors=Author.objects.all()
        serializer=AuthorSerializer(authors,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer=AuthorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)   
    
class AuthorDetailAPIView(APIView):
    def get_object(self,pk):
        try:
            return Author.objects.get(pk=pk)
        except Author.DoesNotExist:
            return None
        
    def get(self,request,pk):
        author=self.get_object(pk)
        if author is None:
            return Response({"error":"Author not Found"},status=status.HTTP_404_NOT_FOUND)
        serializer= AuthorSerializer(author)
        return Response(serializer.data)
    
    def put(self,request,pk):
        author=self.get_object(pk)
        if author is None:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AuthorSerializer(author, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        author = self.get_object(pk)
        if author is None:
            return Response({"error": "Author not found"}, status=status.HTTP_404_NOT_FOUND)
        author.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 2 Books APIView
class BookListCreateAPIView(APIView):
    def get(self,request):
        books=Book.objects.all()
        serializer=BookSerializer(books,many=True)
        return Response(serializer.data,status=status.HTTP_200_OK)
    
    def post(self,request):
        serializer=BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.data,status=status.HTTP_400_BAD_REQUEST)
    
class BookDetailAPIView(APIView):
    def get_object(self,pk):
        try:
            return Book.objects.get(pk=pk)
        except Book.DoesNotExist:
            return None
    
    def get(self,request,pk):
        book=self.get_object(pk)
        if book is None:
            return Response({"error":"Book not found"},status=status.HTTP_400_BAD_REQUEST)
        serializer=BookSerializer(book)
        return Response(serializer.data)
    
    def put(self,request,pk):
        book=self.get_object(pk)
        if book is None:
            return Response({"error":"Book not found"},status=status.HTTP_400_BAD_REQUEST)
        serializer = BookSerializer(book, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        book = self.get_object(pk)
        if book is None:
            return Response({"error": "Book not found"}, status=status.HTTP_404_NOT_FOUND)
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    
# 3 Category APIView
class CategoryListCreateAPIView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CategoryDetailAPIView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Category, pk=pk)

    def get(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category)
        return Response(serializer.data)

    def put(self, request, pk):
        category = self.get_object(pk)
        serializer = CategorySerializer(category, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        category = self.get_object(pk)
        category.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 4 Publisher API Views
class PublisherListCreateAPIView(APIView):
    def get(self, request):
        publishers = Publisher.objects.all()
        serializer = PublisherSerializer(publishers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = PublisherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PublisherDetailAPIView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Publisher, pk=pk)

    def get(self, request, pk):
        publisher = self.get_object(pk)
        serializer = PublisherSerializer(publisher)
        return Response(serializer.data)

    def put(self, request, pk):
        publisher = self.get_object(pk)
        serializer = PublisherSerializer(publisher, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        publisher = self.get_object(pk)
        publisher.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# 5 Customer APIView
class CustomerListCreateAPIView(APIView):
    def get(self, request):
        customers = Customer.objects.all()
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CustomerDetailAPIView(APIView):
    def get_object(self, pk):
        return get_object_or_404(Customer, pk=pk)

    def get(self, request, pk):
        customer = self.get_object(pk)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data)

    def put(self, request, pk):
        customer = self.get_object(pk)
        serializer = CustomerSerializer(customer, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        customer = self.get_object(pk)
        customer.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)




