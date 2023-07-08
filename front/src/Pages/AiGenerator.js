import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { ReactDOM } from "react";
import axios from 'axios';
import './pages.css';
import genimages from './media/images.png';
import Header from "./Header";
export default function Aigenerator(){
const [images,setimages]=useState([])
const navigate = useNavigate()
const [imageSrc, setImageSrc] = useState('')

useEffect(()=>{
const currentUser_ = JSON.parse(localStorage.getItem("Currentuser"));
console.log(currentUser_)
if (currentUser_ == null) {
navigate("/");
}
},[])
const handleImageInput=(event)=>{
    const file=event.target.files[0]
    setimages([...images,file])
    console.log(images)
    console.log(genimages)
}
const handleSubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    const localdata=await localStorage.getItem('Currentuser')
    formdata.append("user_details",localdata.id)
    formdata.append('image1',images[0])
    formdata.append('image2',images[1])
    console.log(formdata)
    const senddata=await axios.post('http://127.0.0.1:8000/neuralstyletransfer/',formdata)
    const url=senddata.data.imageurl
    setImageSrc(url)
    console.log(imageSrc)
}

return(
    <div>
    <Header/>
    <div className="aidiv">
    <form onSubmit={handleSubmit}>
    <div>
    <div style={{display:'grid'}}>
    <p>choose image</p>
    <input type='file' onChange={handleImageInput}/></div>
    <div style={{display:'grid'}}>
    <p>choose styling image</p>
    <input type='file' onChange={handleImageInput}/>
    </div>
    </div>
    <button type='submit'>Submit</button>
    </form>
    <img src={genimages} alt="Generated image by nerual style"/>
    <div style={{display:'flex',justifyContent:'center',columnGap:'10px'}}>
    <p>Save Image?</p>
    <button>yes</button>
    <button>no</button>
    </div>
    </div>
    </div>
)
}