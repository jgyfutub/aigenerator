import React, { useState } from "react";
// import fs from 'fs'
import * as tfhub from '@tensorflow-models/hub';
import * as tf from "@tensorflow/tfjs";
import { ReactDOM } from "react";
import { render } from "ejs";
export default function Aigenerator(){
const [images,setimages]=useState([])

const load_img=async(image)=>{
    console.log(image)
    const imgfloattensor=await tf.cast(image,'float32')
    const resizedimage=tf.image.resizeBilinear(imgfloattensor,[512,512])
    console.log(resizedimage)
    return resizedimage
}
const handleImageInput=(event)=>{
    const file=event.target.files[0]
    const reader=new FileReader()
    reader.onloadend=()=>{
        const dataUrl = reader.result;
        const image=new Image()
        image.src=dataUrl
        image.onload=()=>{
            setimages([...images,tf.browser.fromPixels(image)])
        }
    }
    if(file){
        reader.readAsDataURL(file)
    }
    console.log(images)
}
const handleSubmit=(e)=>{
    e.preventDefault()
    for(const i of images){
        console.log(load_img(i))
    }
    model()
}
const model=()=>{
    const model= tfhub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2')
    const styled_image=model(tf.tensor(load_img(images[0]),tf.tensor(load_img(images[1]))))
}

return(
    <div>
    <form onSubmit={handleSubmit}>
    <input type='file' onChange={handleImageInput}/>
    <input type='file' onChange={handleImageInput}/>
    <button type='submit'>Submit</button>
    </form>
    </div>
)
}