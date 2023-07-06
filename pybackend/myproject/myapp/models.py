from django.db import models

# Create your models here.
class MyModel(models.Model):
    image1 = models.ImageField(upload_to='images1/')