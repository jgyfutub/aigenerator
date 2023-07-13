import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from 'axios';
export default function TexttoImage(props){
const [userid,setuserid]=useState("")
const [image,setimage]=useState(null)
const navigate = useNavigate()

useEffect(()=>{
    const currentUser_ = JSON.parse(localStorage.getItem("Currentuser"));
    if (currentUser_ == null) {
    navigate("/");
    }
    else if(currentUser_!=null){
        console.log(currentUser_)
        setuserid(currentUser_.email)
    }
    },[])

const handleInputs=(e)=>{
    setimage(e.target.files[0])
    }
useEffect(()=>{
    console.log(image)
},[image])
const handleSubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('userid',userid)
    formdata.append('image',image)
    const response=await axios.post('http://127.0.0.1:8000/texttoimage/',formdata)
    console.log(response)

}
        return (
            <div>
            <Header userid={userid}/>
            <div>
            <h1>Image Super Resolution</h1>
            <form onSubmit={handleSubmit}>
                <input type='file' onChange={handleInputs}/>
                <button type='submit' name='caption'>Submit</button>
            </form>
</div>
            </div>
        )
}