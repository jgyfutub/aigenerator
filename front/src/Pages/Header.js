import React ,{useState,useEffect}from "react";
import { useNavigate } from "react-router-dom";
import './pages.css';
export default function Header(){
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
            <hr/>
            <button>Neural transfer Paint</button>
            <hr/>
            <button>Image Caption generator</button>
            <hr/>
            <button>Image ennhancer</button>
            <hr/>
            <button>Saved Images</button>
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