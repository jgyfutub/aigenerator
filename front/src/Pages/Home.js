import React from "react";
import { useNavigate } from "react-router-dom";
export default function HomePage(){
    const navigate = useNavigate();
    return(
        <div>
            <p>Hello and Welcome to Home Page</p>
            <div style={{display:'flex',justifyContent:'space-around'}}>
            <button onClick={ () => { navigate("/login")}}>Login</button>
            <button onClick={ () => { navigate("/signup")}}>Sign Up</button>
            <button onClick={()=>{navigate('/Aigenerator')}}>Aigenerator</button>
        </div></div>
    )
}