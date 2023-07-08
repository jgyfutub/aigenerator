import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function SignUppage(){
    const [userCredentials, setUserCredentials] = useState({email: "",password: "",cpassword:""})
    const [informUser,informUserfunc]=useState("")
    const navigate = useNavigate();
    const handleInputs = (e) => {
        const Name = e.target.name;
        const Value = e.target.value;
        setUserCredentials({ ...userCredentials, [Name]: Value });
   };
   const handleSubmit=async (e)=>{
    e.preventDefault()
    if (userCredentials.password===userCredentials.cpassword){
    console.log( "sending request");
    const response= await fetch('http://localhost:8080/signup',{
        method:'POST',
         body: JSON.stringify({email:userCredentials.email,password:userCredentials.password}),
         headers: {
         "Content-Type": "application/json",
        },
    })
    localStorage.setItem("CurrentUser",userCredentials)
    const data=await response.json()
    console.log(data)
    if(data==null){
       informUserfunc("account already registerd!! better login!!")
    }else{
        informUserfunc("registered!!")
    }
}
    else{
        informUserfunc("password not same")
    }
   }

   useEffect(() => {
    console.log(informUser); 
  }, [informUser]);

    return (
        <div className="divlogin">
        <div>
        <h1>User SignUp</h1>
        <form onSubmit={handleSubmit} >
            <input type='email' name='email' placeholder='Email' onChange={handleInputs} required/>
            <input type='password' name='password' placeholder="Password" onChange={handleInputs} required/>
            <input type='password' name='cpassword' placeholder="Confirm Password" onChange={handleInputs} required/>
            <button type="submit">Submit</button>
            </form>
            <p style={{color:'red'}}>{informUser}</p>
            <div style={{display:"flex",justifyContent:"center"}}>
                <p>Already have a account?</p>
                <p  onClick={ () => { navigate("/login")}} style={{color:'blueviolet',marginLeft:'5px'}}> login</p>
            </div>
</div>
</div>
    )
}