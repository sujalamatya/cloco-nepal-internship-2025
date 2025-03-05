from django.contrib.auth import authenticate
from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import CustomUserSerializer
from .models import CustomUser

# Helper function to generate JWT tokens
def get_tokens_for_user(user):
    try:
        token = RefreshToken.for_user(user)
        return {
            'refresh': str(token),
            'access': str(token.access_token),
            'exp': token.access_token.payload['exp'],
        }
    except Exception as e:
        return {'error': str(e)}

# User Signup
@api_view(['POST'])
def user_signup(request):
    try:
        # Deserialize the incoming data
        serializer = CustomUserSerializer(data=request.data)
        if serializer.is_valid():
            # Create the user using serializer
            user = serializer.save()
            # Get tokens for the newly created user
            tokens = get_tokens_for_user(user)
            # Return success response with the tokens
            return Response({'message': 'User created successfully', 'tokens': tokens}, status=status.HTTP_201_CREATED)
        # Return validation errors if serializer fails
        return Response({'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

# User Login
@api_view(['POST'])
def user_login(request):
    try:
        email = request.data.get("email")
        password = request.data.get("password")

        # Validate that email and password are provided
        if not email or not password:
            return Response({'error': 'Email and password are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Authenticate the user using the email and password
        user = authenticate(email=email, password=password)

        if user:
            # If user is authenticated, generate tokens
            tokens = get_tokens_for_user(user)
            return Response({'message': 'User logged in successfully', 'tokens': tokens}, status=status.HTTP_200_OK)
        
        # If authentication fails, return invalid credentials error
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

