import React , { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './pages.css';
import Header from "./Header";
import axios from 'axios'
export default function SavedImages(){
    const [id,setid]=useState('')
    const [arrimg,setarrimg]=useState([])
    const navigate = useNavigate();
    useEffect(()=>{
        const currentUser_=JSON.parse(localStorage.getItem('Currentuser'))
        if (currentUser_ == null) {
            navigate("/");
            }
        else if(currentUser_!=null){
                console.log(currentUser_)
                setid(currentUser_.id)
            }
    },[])
    const getimgpaths=async(formdata)=>{
        const response=await axios.post('http://127.0.0.1:8000/savedimages/',formdata)
        return await response
    }
    useEffect(()=>{
        console.log(id)
        const formdata=new FormData()
        formdata.append("id",id)
        console.log(id)
        getimgpaths(formdata).
        then((result)=>{
            console.log(result.data.array)
            for(let i of result.data.array){
                setarrimg(previmg=>[...previmg,i])
            }
        })
    },[id])
    useEffect(()=>{
        console.log(arrimg)
    },[arrimg])
    return(
        <div>
            <Header/>
            <h1 style={{marginTop:'60px'}}>Saved Images</h1>
            <div>
            {arrimg.map((item,index)=>{
                <div>
                <p>item:{item}</p>
                <img key={index} src={item}/></div>
            })}
        </div>
        </div>
    )
}