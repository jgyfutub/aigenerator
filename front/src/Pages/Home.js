import React from "react";
import './pages.css';
import { useNavigate } from "react-router-dom";
export default function HomePage(){
    const navigate = useNavigate();
    return(
        <div className="HomePage">
            <h1 style={{marginBottom:'50px'}}>Home page</h1>
            <div>
            <button onClick={ () => { navigate("/login")}}>Login</button>
            <button onClick={ () => { navigate("/signup")}}>Sign Up</button>
            </div>
        </div>
    )
}