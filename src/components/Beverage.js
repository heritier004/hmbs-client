import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

import Popup from "./Popup";

const Axios =require("axios");
const Beverage= ()=>{

    const[IsOpen, setIsOpen] = useState(false);

const users = JSON.parse(localStorage.getItem("userSigned"));
const [usersData ,setUsersData] = useState([]);
const navigate = useNavigate();
const getAllBeverages =() =>{
    
    Axios.get(`https://movie-booking-system.herokuapp.com/getBeverages`)
    .then((response)=>{
        //console.log(users[0].firstname)
        setUsersData(response.data);

    });
}
const purchaseBeverage=(beverageId,beverageName)=>{
    if(localStorage.getItem("beverage")){
        let purchaseArr =(localStorage.getItem("beverage"));
        purchaseArr+= beverageId+ ":";
        localStorage.setItem("beverage",purchaseArr);
    }else{
        let purchaseArr = "";
        purchaseArr+=beverageId + ":";
        localStorage.setItem("beverage",purchaseArr);
    }
    setIsOpen(!IsOpen);

    document.querySelector(".containerBeverage").style.display = 'none';
    document.querySelector(".headerBtn").style.display = 'none';


}
const backHome =()=>{
    navigate("/SignIn")
}
    useEffect(()=>{
        getAllBeverages();
    },[]);

    const cancelReservation =(id)=>{
        Axios.get(`https://movie-booking-system.herokuapp.com/deleteReservation/${id}`)
        .then((response)=>{
            window.location.reload();
        })
    }
    const handle = () =>{
        window.location.reload();


    }
        return (
            <div className="appBeverage">      
         
            
            
    <h1>Movie Booking System</h1>

     { IsOpen ?<Popup
            handleClose={()=>{handle()}}
            content={<div>
                <p>Snack added !!</p>
                </div>
                }
                />
               : null}
   
    <button onClick={()=>backHome()} class="headerBtn">Continue</button>
    {usersData.length > 0
    ?( <div className="containerBeverage">
           {usersData.map((user)=>(
         
                <div className="scheduleBeverage" id={user.id}>
                {/*onClick={() => handleOpen(schedule)}>*/}
                       <h2> <p className="cinemaTitle">{user.name}</p> </h2>
                        <div class="manageBeverage">
                            <div>
                            <img className="beverageImage"src={user.imagelink}></img>
                            </div>
                            <div className="beverageDetail">
                            <h4>{user.name}</h4>
                            <h4>size :{user.portionsize}</h4>
                            <h4> Price :${user.price}</h4>
                            <button class="purchaseBeverageBtn" onClick={()=>purchaseBeverage(user.id,user.name)}>purchase</button>
                            </div>
                            </div>
                            
                            
                        
                
            </div>
           ))}
        </div>
     ):(
       <div className="empty">
         <h2>no movie found</h2>
        </div>
     )}
    </div>
        )
}
export default Beverage;