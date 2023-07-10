import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import { ReactDOM } from "react";
import axios from 'axios';
import './pages.css';
import Header from "./Header";
export default function Aigenerator(){
const [images,setimages]=useState([])
const navigate = useNavigate()
const [imageSrc, setImageSrc] = useState('')
const [userid,setuserid]=useState("")

useEffect(()=>{
const currentUser_ = JSON.parse(localStorage.getItem("Currentuser"));
if (currentUser_ == null) {
navigate("/");
}
else if(currentUser_!=null){
    console.log(currentUser_)
    setImageSrc(currentUser_.id)
    setuserid(currentUser_.email)
}
},[])

const handleImageInput=(event)=>{
    const file=event.target.files[0]
    setimages([...images,file])
    console.log(images)
}

const handleSubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    const localdata=await JSON.parse(localStorage.getItem('Currentuser'))
    console.log(localdata.id)
    formdata.append("user_details",localdata.id)
    formdata.append('image1',images[0])
    formdata.append('image2',images[1])
    console.log(formdata)
    const senddata=await axios.post('http://127.0.0.1:8000/neuralstyletransfer/',formdata)
    // const sendata=await senddata.json()
    console.log(senddata)
    window.location.reload()
}

useEffect(()=>{
    console.log(imageSrc)
},[imageSrc])

useEffect(()=>{
    console.log(userid)
},[userid])
return(
    <div>
    <Header userid={userid} />
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
    <img src={'./images/imagesid'+imageSrc+'.png'} alt="images" style={{marginBottom:'40px'}}/>
    </div>
    </div>
)
}