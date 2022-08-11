import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
const Axios= require("axios");
const arr =[]
const arrId = []
let confirmedSeats 
let confId =[]
if(localStorage.getItem("selectedseats")){
    confirmedSeats = JSON.parse(localStorage.getItem("selectedseats"));
    confirmedSeats.forEach((e) => confId.push(e.id));
}else{
    confirmedSeats = []
}
const SeatSelection =() =>{
const [seats,setSeats] = useState([]);
const [selected,setSelected] =useState(false);
const navigate = useNavigate();
    Axios.get("https://movie-bookings-system.herokuapp.com/getHallSeats")
    .then((response)=>{
        setSeats(response.data);
    });
    const handleOpen =(seat)=>{
        arr.push(seat);
        arr.forEach((a)=> arrId.push(a.id));
        console.log(arr)
        setSelected(current => !current)
    }
    const confirmSelected = () =>{
        localStorage.setItem("currentSeat",JSON.stringify(arr));
        arr.forEach((element)=> confirmedSeats.push(element))
        localStorage.setItem("selectedseats",JSON.stringify(confirmedSeats));
        navigate("/Reservation")
    }

    return (
        <div className="app">       
        <h1>Movie Booking System</h1>
        <div className="container">
            <div className = "hallSeats" >
                {seats.map((seat) =>(
                    <div className = "hSeat" id={seat.id} onClick={()=>handleOpen(seat)} style={{
                        backgroundColor: confId?.includes(seat.id) ? 'salmon' : arrId.includes(seat.id) ? 'orange' : ''
                      }}> </div>
                ))}
                
            </div>
            
        </div>
        <div className="flexInline"><div className="hSeat" style={{marginLeft : '15px'}}></div>Available Seats  <div className="hSeat" style={{backgroundColor : 'orange',marginLeft : '15px'}}></div> Selected seats<div className="hSeat" style={{backgroundColor : 'salmon',marginLeft : '15px'}}></div>Seats not available
            </div>
            <button className="confirmSeat" onClick={()=>confirmSelected()}>Confirm</button>
        </div>
    )
}
export default SeatSelection;