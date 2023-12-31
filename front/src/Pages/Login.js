import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './pages.css'

export default function Loginpage(){
    const [userCredentials, setUserCredentials] = useState({email: "",password: ""})
    const [informUser,informUserfunc]=useState("")
    const navigate = useNavigate();
    useEffect(()=>{
        const currentUser_ = JSON.parse(localStorage.getItem("Currentuser"));
        if(currentUser_!=null){
            alert("you are already logged in!!")
            navigate('/aigenerator')
        }
        },[])
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
    const data=await response.json()
    const UserData={
        id:data.id,
        email:data.email,
        password:data.password,
        v:data.v
    }
    localStorage.setItem("Currentuser",JSON.stringify(UserData))
    console.log(data)
    informUserfunc(data.status)
    navigate('/aigenerator')
   }
   useEffect(() => {
    const currentUser_ = JSON.parse(localStorage.getItem("Currentuser"));
    console.log(currentUser_)
},[])
   useEffect(() => {
    console.log(informUser); 
  }, [informUser]);
    return (
        <div className="divlogin">
        <div>
        <p style={{color:'red',fontSize:'small'}}>Note:please wait for max 6 seconds after clicking submit</p>
        <h1>User Login</h1>
        <form onSubmit={handleSubmit} >
            <input type='email' name='email' placeholder='Email' onChange={handleInputs} required/>
            <input type='password' name='password' placeholder="Password" onChange={handleInputs} required/>
            <button type="submit">Submit</button>
            </form>
            <p style={{color:'red'}}>{informUser}</p>
            <div style={{display:"flex",justifyContent:"center"}}>
                <p>Dont have account? </p>
                <p  onClick={ () => { navigate("/signup")}} style={{color:'blueviolet',marginLeft:'5px'}}> Sign Up</p>
            </div>
</div>
</div>
    )
}