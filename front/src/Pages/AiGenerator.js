import React, { useState } from "react";
// import { loadGraphModel } from '@tensorflow/tfjs-converter';
import * as tf from "@tensorflow/tfjs";
import { ReactDOM } from "react";
import axios from 'axios';
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
            setimages([...images,image])
        }
    }
    if(file){
        reader.readAsDataURL(file)
    }
    console.log(images)
}
const handleSubmit=(e)=>{
    e.preventDefault()
    console.log(tf.version)
    model()
}
const model=async()=>{
    // const model= await tf.loadGraphModel('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2',{fromTFHub:true,mode:'no-cors'})
    // const model1=await axios.get('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2', {mode: 'no-cors'})
    // console.log(model1)
// const zeros = tf.zeros([1, 224, 224, 3]);
// model.predict(zeros).print();
    // const styled_image= model.predict(load_img(images[0]))
    const modeltransformer= await tf.loadGraphModel('/Styletransfertfjs/model.json')
    // const transformer_image= modeltransformer.execute([load_img(images[0]),load_img(images[1])])
    // console.log(transformer_image)
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