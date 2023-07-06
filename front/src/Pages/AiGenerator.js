import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { ReactDOM } from "react";
import axios from 'axios';
export default function Aigenerator(){
const [images,setimages]=useState([])

// const load_img=async(image)=>{
//     console.log(image)
//     const imgfloattensor=await tf.cast(image,'float32')
//     const resizedimage=tf.image.resizeBilinear(imgfloattensor,[512,512])
//     console.log(resizedimage)
//     return resizedimage
// }
const handleImageInput=(event)=>{
    const file=event.target.files[0]
    const reader=new FileReader()
    reader.onloadend=()=>{
        const dataUrl = reader.result;
        const image=new Image()
        image.src=dataUrl
        image.onload=()=>{
            console.log(tf.browser.fromPixels(image))
            setimages([...images,tf.browser.fromPixels(image)])
        }
    }
    if(file){
        reader.readAsDataURL(file)
    }
    console.log(images)
}
const handleSubmit=async(e)=>{
    e.preventDefault()
    const senddata=await axios.post('http://127.0.0.1:8000/neuralstyletransfer',{array:images})
    console.log(senddata)
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