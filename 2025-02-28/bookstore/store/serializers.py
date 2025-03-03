from rest_framework import serializers
from .models import Author,Category,Publisher,Book,Customer,Employee,User,Inventory,OrderDetail,OrderItem

class AuthorSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField(max_length=50)
    genre = serializers.CharField(max_length=50, allow_blank=True, required=False)

    def create(self, validated_data):
        return Author.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.genre = validated_data.get('genre', instance.genre)
        instance.save()
        return instance

class CategorySerializer(serializers.Serializer):
    id=serializers.IntegerField(read_only=True)
    name= serializers.CharField(max_length=50)

    def create(self, validated_data):
        return Category.objects.create(**validated_data)
    
    def update(self,instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        return instance

class PublisherSerializer(serializers.Serializer):
    id=serializers.IntegerField(read_only=True)
    name=serializers.CharField(max_length=50)
    contact_info=serializers.CharField(max_length=50,allow_blank=True, required=False)

    def create(self, validated_data):
        return Publisher.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.contact_info = validated_data.get('contact_info', instance.contact_info)
        instance.save()
        return instance

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = '__all__'


class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItem
        fields = '__all__'