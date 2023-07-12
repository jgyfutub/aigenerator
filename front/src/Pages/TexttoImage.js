import React, { useState,useEffect } from "react";
export default function TexttoImage(props){
const [userid,setuserid]=useState("")

    
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

        return (
            <div>
            <form onSubmit={handleSubmit} >
                <input type='text' onChange={handleInputs}/>
            </form>
            
            </div>
        )
}