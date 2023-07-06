import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { ReactDOM } from "react";
import axios from 'axios';
export default function Aigenerator(){
const [images,setimages]=useState([])

const handleImageInput=(event)=>{
    const file=event.target.files[0]
    setimages([...images,file])
    console.log(images)
}
const handleSubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('image1',images[0])
    formdata.append('image2',images[1])
    console.log(formdata)
    const senddata=await axios.post('http://127.0.0.1:8000/neuralstyletransfer/',formdata)
    const imgai=document.getElementsByClassName('imgai')
    imgai.src='data:image/png;base64,'+senddata.data.image
    console.log(imgai.src)
}

return(
    <div>
    <form onSubmit={handleSubmit}>
    <input type='file' onChange={handleImageInput}/>
    <input type='file' onChange={handleImageInput}/>
    <button type='submit'>Submit</button>
    <img src="" className="imgai" alt="Generated image by nerual style"/>
    </form>
    </div>
)
}