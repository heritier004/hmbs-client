import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const Axios =require("axios");
const ManageReservation= ()=>{
const users = JSON.parse(localStorage.getItem("userSigned"));
const [usersData ,setUsersData] = useState([]);
const navigate = useNavigate();
const getAllUserreservations =() =>{
    
    Axios.get(`https://movie-bookings-system.herokuapp.com/getUserReservation/${users[0].id}`)
    .then((response)=>{
        setUsersData(response.data);

    });
}
const backHome =()=>{
    navigate("/")
}
    useEffect(()=>{
        getAllUserreservations();
    },[]);

    const cancelReservation =(id)=>{
        Axios.get(`https://movie-bookings-system.herokuapp.com/deleteReservation/${id}`)
        .then((response)=>{
            window.location.reload();
        })
    }
        return (
            <div className="app">       
    <h1>Movie Booking System</h1>
    <button onClick={()=>backHome()}>Back</button>
    {usersData.length > 0
    ?( <div className="container">
           {usersData.map((user)=>(
        
                <div className="schedules" id={users[0].id}>
                {/*onClick={() => handleOpen(schedule)}>*/}
                       <h2> <p className="cinemaTitle">Reservation Detail  </p> </h2>
                        <div class="manageReservations">
                            <h4>{`Full Name : ${user.firstname} ${user.lastname}`}</h4>
                            <h4>{`Movie Title : ${user.title}`}</h4>
                            <h4>{`Schedule Date : ${new Date(user.starttime).toString().split("GMT")[0]}`}</h4>
                            <button class="cancelResrvationBtn" onClick={()=>cancelReservation(user.id)}>Cancel </button>
                        </div>
                
            </div>
           ))}
        </div>
     ):(
       <div className="empty">
         <h2>no movie found</h2>
        </div>
      )
}
    </div>
        )
}
export default ManageReservation;