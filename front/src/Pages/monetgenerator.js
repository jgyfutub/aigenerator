import React ,{useState,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import './pages.css';
import Header from "./Header";
import axios from 'axios';
export default function Monetgenerator(){
    const [userid,setuserid]=useState("")
    const [image,setimage]=useState(null)
    const [arrimg,setarrimg]=useState([])
    const [id,setid]=useState("")
    const [time,settime]=useState("")
    const navigate = useNavigate()
    
    useEffect(()=>{
        const currentUser_ = JSON.parse(localStorage.getItem("Currentuser"));
        if (currentUser_ == null) {
        navigate("/");
        }
        else if(currentUser_!=null){
            console.log(currentUser_)
            setuserid(currentUser_.email)
            setid(currentUser_.id)
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
        formdata.append('id',id)
        formdata.append('image',image)
        settime(toString(new Date().getTime()))
        formdata.append('time',time)
        const response=await axios.post('http://127.0.0.1:5000/monetgenerator/',formdata)
        console.log(response)
        window.location.reload()
    }
            return (
                <div>
                <Header userid={userid}/>
                <div class="SuperResolution">
                <div>
                <h1>Monet style art generator</h1>
                <p style={{color:'red'}}>plz wait for 10-20 seconds for image to be loaded</p></div>
                <form onSubmit={handleSubmit}>
                    <input type='file' onChange={handleInputs} required/>
                    <button type='submit' name='caption'>Submit</button>
                </form>
                <img src={'./Monetimages/imagesid'+id+'.png'} width={300} height={300} style={{marginLeft:'40px'}}/>
                </div>
                </div>
            )
    }
