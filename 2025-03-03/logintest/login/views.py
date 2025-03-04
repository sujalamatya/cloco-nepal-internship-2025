from django.shortcuts import render
from .models import Student
from .serializers import StudentSerializer, LoginSerializer
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework import filters
from rest_framework.generics import ListAPIView

class StudentAPI(ListAPIView):  
    # permission_classes = [IsAuthenticated]
    queryset = Student.objects.all()
    serializer_class = StudentSerializer
    filter_backends = [filters.SearchFilter]
    search_fields = ['name']  

class LoginAPI(APIView):
    def post(self, request):
        data = request.data
        serializer = LoginSerializer(data=data)
        
        if not serializer.is_valid():
            return Response({
                "status": False,
                "data": serializer.errors
            }, status=status.HTTP_400_BAD_REQUEST)

        username = serializer.validated_data["username"]
        password = serializer.validated_data["password"]
        
        user_obj = authenticate(username=username, password=password)
        if user_obj:
            token, _ = Token.objects.get_or_create(user=user_obj)
            return Response({
                "status": True,
                "data": {"token": str(token)}  
            }, status=status.HTTP_200_OK)

        return Response({
            "status": False,
            "data": {},
            "message": "Invalid credentials"
        }, status=status.HTTP_401_UNAUTHORIZED)
