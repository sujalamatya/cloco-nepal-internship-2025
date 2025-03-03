from django.db import models

class Student(models.Model):
    name=models.CharField(max_length=50)
    age=models.IntegerField(default=22)
    notes=models.CharField(max_length=100)