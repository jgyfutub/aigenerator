from django.shortcuts import render,redirect
import tensorflow as tf
import tensorflow_hub as tfhub
from rest_framework.views import APIView
from django.http import HttpResponse
from django.http import JsonResponse
import json
import os
import keras
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

#api so that neural style transfer can occur

class ReactView(APIView):

    def post(self,request):
        id=request.POST['user_details']
        print(id)
        image1=request.FILES['image1']
        image2=request.FILES['image2']
        image1 = Image.open(image1)
        image_array1= tf.image.resize(np.array(image1),[512,512])/255.0
        image_array1=tf.cast(image_array1,tf.float32)[:,:,:3]
        image2 = Image.open(image2)
        image_array2= tf.image.resize(np.array(image2),[512,512])/255.0
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
        imagegenerated.save('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/images/imagesid'+str(id)+'.png','PNG' )
        imagegenerated.save('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/images/imageid'+str(id)+'no'+str(len(os.listdir('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/images'))+1)+'.png','PNG' )
        imagegenerated_bytes=imagegenerated.tobytes()
        imagegenerated_base64=base64.b64encode(imagegenerated_bytes).decode('utf-8')
        return JsonResponse({'message':'django connected!!','image':imagegenerated_base64,'imageurl':'./images/imagesid'+str(id)+'no'+str(len(os.listdir('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/images')))+'.png'})
    
    def get(self,request):
        return JsonResponse({'message':'neural style transfer api'})
    
#api for sending images' url of particular id

class ImagesView(APIView):

    def post(self,request):
        id=request.POST['id']
        arr=[]
        print("oiuytfdz")
        for i in os.listdir('C:/Users/Acer/OneDrive/Desktop/imagegenerator/front/public/images'):
            if id in i:
                print(id)
                if id==i[7:].split('no')[0]:
                    print(i)
                    arr.append('./images/'+i)
        print(arr)
        return JsonResponse({'array':arr})
    
    def get(self,request):
        return JsonResponse({'message':'saved images api'})

class TexttoImage(APIView):

    def post(self,request):
        id=request.POST['id']
        Imageq=request.FILES['image']
        image=Image.open(Imageq)
        image= tf.image.resize(np.array(image),[512,512])
        image=tf.cast(image, tf.float32)[:,:,:3]
        image=tf.expand_dims(image,0)
        model=tfhub.load('https://tfhub.dev/captain-pool/esrgan-tf2/1')
        print(model)
        gen_arr=model(image)
        gen_arr=tf.squeeze(gen_arr)
        array=tf.cast(gen_arr,tf.uint8)
        print(array)
        array=array.numpy()
        imagegenerated = Image.fromarray(array)
        imagegenerated.save('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/supimages/imagesid'+str(id)+'.png','PNG' )
        imagegenerated.save('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/supimages/imageid'+str(id)+'no'+str(len(os.listdir('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/supimages'))+1)+'.png','PNG' )
        return JsonResponse({"message":"post"})
    
    def get(self,request):
        return JsonResponse({"message":"get"})
    
class EnhancedImageView(APIView):
    def post(self,request):
        id=request.POST['id']
        arr=[]
        for i in os.listdir('C:/Users/Acer/OneDrive/Desktop/imagegenerator/front/public/supimages'):
            if id in i:
                print(id)
                if id==i[7:].split('no')[0]:
                    print(i)
                    arr.append('./supimages/'+i)
        print(arr)
        return JsonResponse({'array':arr})
    
    def get(self,request):
        return JsonResponse({'message':'saved images api'})