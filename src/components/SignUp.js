import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
const Axios = require("axios");

const SignUp = () =>{
const [name ,setName] = useState([]);
const [lastname ,setLastname] = useState([]);
const [username ,setUsername] = useState([]);
const [password,setpassword]=useState([]);
const navigate = useNavigate();
const [errors,setErrors]=useState([]);
const signUpHandler =()=>{
    const article = {name:name, lastname:lastname, username:username, password:password}
    Axios.post("https://movie-bookings-system.herokuapp.com/SignUp", article)
    .then((response)=>{
        if(response.data.a){
            navigate("/");
        }else{
            setErrors("Unable to create new user")
        }
    });    
}
return(
    <div className="app">       
        <h1>Movie Booking System</h1>
        <div className="SignUpDiv">
                <div className="signIn" id={""} >
                    <h2>Sign Up</h2><br/>
                    <p style={{color :'red'}}>{errors}</p>
                    <input className="" type="firstname" placeholder="Name?" value={name}
                             onChange ={(e)=>setName(e.target.value)}></input><br/>
                    <input className="" type="lastname" placeholder="Lastname?" value={lastname}
                             onChange ={(e)=>setLastname(e.target.value)}></input><br/>
                    <input className="" type="email" placeholder="What's your email?" value={username}
                             onChange ={(e)=>setUsername(e.target.value)}></input><br/>
                    <input className="" type="password" placeholder="password" value={password}
                            onChange ={(e)=>setpassword(e.target.value)} ></input>
                            <br/>
                </div>
                <div className="signUpButton">
                    <button value={"Login In"} onClick={() => signUpHandler()}>Sign Up</button>
                </div>
            </div>
        


</div>
)}
export default SignUp;