import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './pages.css'
export default function Loginpage(){
    const [userCredentials, setUserCredentials] = useState({email: "",password: ""})
    const navigate = useNavigate();
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
        <div className="divlogin">
        <div>
        <h1>User Login</h1>
        <form onSubmit={handleSubmit} >
            <input type='email' name='email' placeholder='Email' onChange={handleInputs} required/>
            <input type='password' name='password' placeholder="Password" onChange={handleInputs} required/>
            <button type="submit">Submit</button>
            </form>
            <div style={{display:"flex",justifyContent:"center"}}>
                <p>Dont have account? </p>
                <p  onClick={ () => { navigate("/signup")}} style={{color:'blueviolet',marginLeft:'5px'}}> Sign Up</p>
            </div>
</div>
</div>
    )
}