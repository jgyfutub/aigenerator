import React ,{useState,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import './pages.css';
export default function Header(props){
    const [bool,funcbool]=useState(false)
    const navigate = useNavigate()
    const handleClick=()=>{
        funcbool(prevBool => !prevBool)
    }
    const logoutfunction=async()=>{
        console.log(localStorage.getItem('Currentuser'))
        await localStorage.removeItem('Currentuser')
        navigate('/')
    }
    useEffect(() => {
        console.log(bool); 
      }, [bool]);
    const handleClick1=()=>{
        console.log(bool)
    }
    useEffect(() => {
        const buttons = document.getElementsByClassName('HeaderButton')
        Array.from(buttons).forEach((button) => {
        button.addEventListener('click', handleClick);})
    
        return () => {
            Array.from(buttons).forEach((button) => {
          button.removeEventListener('click', handleClick1);})
        };
      }, []); 
    return(
        <div>
        <div className="Header">
            <button className="HeaderButton">≡</button>
            <p>AiGenerator</p>
        </div>
        {bool ? (
        <div className="PopUp">
            <p style={{color:'white'}}>Welcome, {props.userid}</p>
            <hr/>
            <button onClick={()=>{navigate('/Aigenerator')}}>Neural transfer Paint</button>
            <hr/>
            <button>Image Caption generator</button>
            <hr/>
            <button onClick={()=>{navigate('/SuperResolution')}}>Image enhancer</button>
            <hr/>
            <button onClick={()=>{navigate('/savedimages')}}>Saved Neural transfer Paint Images</button>
            <hr/>
            <button onClick={()=>{navigate('/savedenhancedimages')}}>Saved Image enhancer Images</button>
            <hr/>
            <button  onClick={logoutfunction}>Log Out</button>
            <hr/>
            </div>)
            :
            (<div></div>)
            }
        </div>
    )
}