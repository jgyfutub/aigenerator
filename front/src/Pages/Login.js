import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function Loginpage(){
    const [userCredentials, setUserCredentials] = useState({email: "",password: ""})
    const handleInputs = (e) => {
        const Name = e.target.name;
        const Value = e.target.value;
        setUserCredentials({ ...userCredentials, [Name]: Value });
   };
   const handleSubmit=async (e)=>{
    e.preventDefault()
    const response= await fetch('http://localhost:8080/login',{
        method:'POST',
         body: JSON.stringify(userCredentials),
         headers: {
         "Content-Type": "application/json",
        },
    })
    const data=response.json()
    console.log(data)
    if(data==null){
        alert("email not registered")
    }
    if (data){
        alert("logged in")
    }
   }
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
        <form style={{display:"grid",justifyContent:'center',marginTop:'50px',borderColor:'black',borderWidth:'5px',borderStyle:'solid',width:'200px',padding:'10px'}} onSubmit={handleSubmit} >
             <p>Email</p>
            <input type='email' name='email' onChange={handleInputs} style={{width:"150px"}} required/>
            <p>password</p>
            <input type='password' name='password' onChange={handleInputs} style={{width:"150px"}} required/>
            <button style={{marginTop:"30px",paddingInline:'10px',width:'70px'}} type="submit">Submit</button>
            </form>
</div>
    )
}