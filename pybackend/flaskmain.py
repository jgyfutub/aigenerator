import base64
from flask import Flask,request,jsonify
import requests
import tensorflow as tf
import tensorflow_hub as tfhub
import time
from keras.models import load_model
from collections import Counter
import numpy as np
from PIL import Image
from flask_cors import CORS
import os

#api so that neural style transfer can occur
app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/neuralstyletransfer/',methods=['POST'])
def neuralstyletransfer():
    id=request.form.get('user_details')
    print(id)
    image1=request.files['image1']
    image2=request.files['image2']
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
    return jsonify({'message':'django connected!!','image':imagegenerated_base64,'imageurl':'./images/imagesid'+str(id)+'no'+str(len(os.listdir('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/images')))+'.png'})

    
#api for sending images' url of particular id

@app.route('/savedimages/',methods=['POST'])
def savedimages():
    id=request.form.get('id')
    arr=[]
    print("oiuytfdz")
    for i in os.listdir('C:/Users/Acer/OneDrive/Desktop/imagegenerator/front/public/images'):
        if id in i:
            print(id)
            if id==i[7:].split('no')[0]:
                print(i)
                arr.append('./images/'+i)
    print(arr)
    return jsonify({'array':arr})


@app.route('/texttoimage/',methods=['POST'])
def texttoimage():
    id=request.form.get('id')
    Imageq=request.files['image']
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
    return jsonify({"message":"post"})

@app.route('/savedenhancedimages/',methods=['POST'])
def savedenhancedimages():
    id=request.form.get('id')
    arr=[]
    for i in os.listdir('C:/Users/Acer/OneDrive/Desktop/imagegenerator/front/public/supimages'):
        if id in i:
            print(id)
            if id==i[7:].split('no')[0]:
                print(i)
                arr.append('./supimages/'+i)
    print(arr)
    return jsonify({'array':arr})
    
@app.route('/monetgenerator/',methods=['POST'])
def monetgenerator():
    id=request.form.get('id')
    Imageq=request.files['image']
    date=request.form.get('time')
    print(date,Imageq)
    model = load_model('C:/Users/Acer/OneDrive/Desktop/imagegenerator/pybackend/photomodel (1).h5')
    image=Image.open(Imageq)
    image= tf.image.resize(np.array(image),[256,256])
    image = tf.cast(image, tf.float32)
    image=tf.expand_dims(image,0)
    image = (image / 127.5) - 1
    pred=model(image)[0].numpy()
    pred = (pred * 127.5 + 127.5).astype(np.uint8)
    print(pred)
    imagegenerated = Image.fromarray(pred)
    imagegenerated.save('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/Monetimages/imagesid'+str(id)+'.png','PNG' )
    imagegenerated.save("C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/Monetimages/imagesid"+id+'no'+str(len(os.listdir('C://Users/Acer/OneDrive/Desktop/imagegenerator/front/public/Monetimages'))+1)+".png",'PNG')
    return jsonify({"message":"post","date":date})
    
@app.route('/savedmonetimages/',methods=['POST'])
def savedmonetimages():
    id=request.form.get('id')
    arr=[]
    for i in os.listdir('C:/Users/Acer/OneDrive/Desktop/imagegenerator/front/public/Monetimages'):
        if id in i:
            print(id,i,i[8:].split('no'))
            if id==i[8:].split('no')[0]:
                print(i)
                arr.append('./Monetimages/'+i)
    print(arr)
    return jsonify({'array':arr})

if __name__ == '__main__':
    app.run(debug=True,port=5000)
