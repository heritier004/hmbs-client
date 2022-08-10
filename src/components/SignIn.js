import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
const Axios = require("axios");
const SignIn = () =>{
const [username ,setUsername] = useState([]);
const [password,setpassword]=useState([]);
const navigate = useNavigate();
const [errors,setErrors]=useState([]);
const handleOpen =()=>{
    const article = {username : username,password:password}
    Axios.post("https://movie-booking-system.herokuapp.com/signIn",article)
    .then((response)=>{
        console.log("the article var: ", article)
        if(response.data.bool){
            localStorage.setItem("userSigned",JSON.stringify(response.data.obj));
            navigate("/SeatSelection");
        }else{
            setErrors("invalid credentials")
           // navigate("/SignIn")
        }
    });    
}
return(
    <div className="app">       
        <h1>Movie Booking System</h1>
        <div className="container">
                    <div className="signIn" id={""} >
                    <h2>Sign In</h2><br/>
                    <p style={{color :'red'}}>{errors}</p>
                     <input class="" type="email" placeholder="What's your email?" value={username}
                             onChange ={(e)=>setUsername(e.target.value)}></input><br/>
                     <input class="" type="password" placeholder="password" value={password}
                            onChange ={(e)=>setpassword(e.target.value)} ></input>
                            <br/>
                        <div style={{display:'flex', gap:'25px', top: '65%',}} >
                        <button class="learn-more" value={"Login In"} onClick={() => handleOpen()}>Log in</button>
                        <a style={{color:'white', display:'inline'}} href='/SignUp'>Sign Up</a>
                        </div>
                </div>
            </div>
        


</div>
)}
export default SignIn;