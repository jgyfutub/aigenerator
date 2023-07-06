from django.shortcuts import render,redirect
import tensorflow as tf
import tensorflow_hub as tfhub
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http import JsonResponse
import json
import os
import base64
from PIL import Image
import numpy as np
# Create your views here.
def index(request):
    context={
        'name':'Tensorflow',
        'age':20,
        'version':tf.__version__
    }
    return render(request,'index.html',context)
class ReactView(APIView):
    def post(self,request):
        image1=request.FILES['image1']
        image2=request.FILES['image2']
        image1 = Image.open(image1)
        image_array1= tf.image.resize(np.array(image1),[256,256])/255.0
        image_array1=tf.cast(image_array1,tf.float32)[:,:,:3]
        image2 = Image.open(image2)
        image_array2= tf.image.resize(np.array(image2),[256,256])/255.0
        image_array2=tf.cast(image_array2,tf.float32)[:,:,:3]
        print(image_array1,image_array2)
        model=tfhub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')
        outputs = model(tf.constant(image_array1[tf.newaxis,:]), tf.constant(image_array2[tf.newaxis,:]))
        gen_arr=outputs[0]
        if len(gen_arr.shape)>3:
            gen_arr=tf.squeeze(gen_arr,axis=0)
        array = tf.keras.preprocessing.image.img_to_array(gen_arr)
        array=array*255.0
        array=tf.cast(array,tf.uint8)
        print(array)
        array=array.numpy()
        imagegenerated = Image.fromarray(array)
        imagegenerated.save('C:/Users/Acer/OneDrive/Desktop/imagegenerator/pybackend/myproject/media/images'+str(len(os.listdir('C:/Users/Acer/OneDrive/Desktop/imagegenerator/pybackend/myproject/media'))+1)+'.png','PNG' )
        imagegenerated_bytes=imagegenerated.tobytes()
        imagegenerated_base64=base64.b64encode(imagegenerated_bytes).decode('utf-8')
        return JsonResponse({'message':'django connected!!','image':imagegenerated_base64,'imageurl':'C:/Users/Acer/OneDrive/Desktop/imagegenerator/pybackend/myproject/media/images'+str(len(os.listdir('C:/Users/Acer/OneDrive/Desktop/imagegenerator/pybackend/myproject/media')))+'.png'})
    def get(self,request):
        return JsonResponse({'message':'neural style transfer api'})