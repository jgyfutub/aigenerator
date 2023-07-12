import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import axios from 'axios';
export default function TexttoImage(props){
const [userid,setuserid]=useState("")
const [caption,setcaption]=useState("")
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
    setcaption(e.target.caption)
    }

const handleSubmit=async(e)=>{
    e.preventDefault()
    const formdata=new FormData()
    formdata.append('userid',userid)
    formdata.append('caption',caption)
    const response=await axios.post('http://127.0.0.1:8000/texttoimage/',formdata)
    console.log(response)

}
        return (
            <div>
            <Header userid={userid}/>
            <form onSubmit={handleSubmit} style={{marginTop:'50px'}}>
                <input type='text' onChange={handleInputs}/>
                <button type='submit' name='caption'>Submit</button>
            </form>

            </div>
        )
}