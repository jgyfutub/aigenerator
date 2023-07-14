import React,{ useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import './pages.css';
import axios from "axios";
export default function Savedenhancedimages(){
const [userid,setuserid]=useState("")
const [arrimg,setarrimg]=useState([])
const [id,setid]=useState("") 
const navigate = useNavigate()

    useEffect(()=>{
        const currentUser_ = JSON.parse(localStorage.getItem("Currentuser"))
        if (currentUser_ == null) {
        navigate("/")
        }
        else if(currentUser_!=null){
            console.log(currentUser_)
            setuserid(currentUser_.email)
            setid(currentUser_.id)
        }
        },[])
        const getimgpaths=async(formdata)=>{
            const response=await axios.post('http://127.0.0.1:8000/savedenhancedimages/',formdata)
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
    return (<div>
    <Header userid={userid}/>
    <h1 style={{marginTop:'60px'}}>Saved Images</h1>
            <div>
            {arrimg.map((item,index)=>{
               return (
                <img key={index} src={item} height={200} width={200} style={{margin:'10px'}}/>)
            })}
        </div>
    </div>)
}