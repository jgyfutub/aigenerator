import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";
import { ReactDOM } from "react";
import axios from 'axios';
import './pages.css';
import genimages from './media/images.png';
export default function Aigenerator(){
const [images,setimages]=useState([])
const [imageSrc, setImageSrc] = useState('')
const handleImageInput=(event)=>{
    const file=event.target.files[0]
    setimages([...images,file])
    console.log(images)
    console.log(genimages)
}
const handleSubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('image1',images[0])
    formdata.append('image2',images[1])
    console.log(formdata)
    const senddata=await axios.post('http://127.0.0.1:8000/neuralstyletransfer/',formdata)
    const url=senddata.data.imageurl
    setImageSrc(url)
    console.log(imageSrc)
}
return(
    <div className="aidiv">
    <form onSubmit={handleSubmit}>
    <div>
    <input type='file' onChange={handleImageInput}/>
    <input type='file' onChange={handleImageInput}/>
    </div>
    <button type='submit'>Submit</button>
    </form>
    <img src={genimages} alt="Generated image by nerual style"/>
    </div>
)
}