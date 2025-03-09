from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from ..models import Book
from ..serializers import (
    BookSerializer)
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