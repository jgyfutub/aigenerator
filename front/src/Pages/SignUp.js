import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUppage(){
    const [userCredentials, setUserCredentials] = useState({email: "",password: "",cpassword:""})
    const handleInputs = (e) => {
        const Name = e.target.name;
        const Value = e.target.value;
        setUserCredentials({ ...userCredentials, [Name]: Value });
   };
   const handleSubmit=async (e)=>{
    if (userCredentials.password===userCredentials.cpassword){
    e.preventDefault()
    console.log( "sending request");
    const response= await fetch('http://localhost:8080/signup',{
        method:'POST',
         body: JSON.stringify({email:userCredentials.email,password:userCredentials.password}),
         headers: {
         "Content-Type": "application/json",
        },
    })
    const data=await response.json()
    console.log(data)
    if(data==null){
        alert("oih")
    }
    console.log( "end:");
}
    else{
        alert("password not same")
        navigate('/signup')
    }
   }
   const navigate = useNavigate();
    return (
        <div style={{display:'flex',justifyContent:'center'}}>
        <form style={{display:"grid",justifyContent:'center',marginTop:'50px',borderColor:'black',borderWidth:'5px',borderStyle:'solid',width:'200px',padding:'10px'}} onSubmit={handleSubmit} >
             <p>Email</p>
            <input type='email' name='email' onChange={handleInputs} style={{width:"150px"}} required/>
            <p>password</p>
            <input type='password' name='password' onChange={handleInputs} style={{width:"150px"}} required/>
            <p>Confirm password</p>
            <input type='password' name='cpassword' onChange={handleInputs} style={{width:"150px"}} required/>
            <button style={{marginTop:"30px",width:'70px'}} type="submit">Submit</button>
            <p>Already have a account?Login instead</p>
            <button onClick={ () => { navigate("/login")}} style={{width:'70px'}}>Login</button>
            </form>
</div>
    )
}