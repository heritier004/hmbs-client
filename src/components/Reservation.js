import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
const Axios = require("axios");
const Reservation = () =>{

const user = JSON.parse(localStorage.getItem("userSigned"));
const[movieSelected,setMovieSelected] = useState([]);
const selectedSched = parseInt(localStorage.getItem("selectedSched"));
const schedule = JSON.parse(localStorage.getItem("schedule"));
const selectedSeats = JSON.parse(localStorage.getItem("currentSeat"));
const arrOfSeats = []
const navigate = useNavigate();
selectedSeats.forEach(element => { arrOfSeats.push(element.id)});
const searchMovies = () =>{
    Axios.get(`http://localhost:5000/getMovie/${selectedSched}`)
    .then((response)=>{
        setMovieSelected(response.data[0].title);
    });
}

useEffect (()=>{
    searchMovies();
},[]);
    const makeReservation = ()=>{
        
        const article = {selectedSched :selectedSched , userid: user[0].id}
        Axios.post(`http://localhost:5000/makeReservation`,article)
        .then((response)=>{
            if(response.status == 200){
                console.log(response.data.code);
         Axios.get(`http://localhost:5000/pdf/${user[0].id}/${selectedSched}/${response.data.code}`, {responseType: 'arraybuffer'})
        .then((res)=>{
            const url = window.URL.createObjectURL(new Blob([res.data]
                ,{type: "application/pdf"}))
              var link = document.createElement('a');
              link.href = url;
              link.setAttribute('download', 'resume.pdf');
              document.body.appendChild(link);
              link.click();
              navigate("/ManageReservation");
        })
            }
        })
        
    }  

    
return(
    <div className="app">       
    <h1>Booking Summary</h1>
    <div className="container">
                <div className="schedule" >
                       <h2> <p className="cinemaTitle">Booking Summary </p> </h2>
                        <div>
                            <h4>{`Name : `}{user[0].firstname+" "+user[0].lastname}</h4>        
                            <h5 className="scheduleDetail"><span>{`Selected Movie:`}</span><span>{movieSelected}</span></h5>
                            <h5 className="scheduleDetail"><span>{`Date :`}</span> <span>{new Date(schedule[0].startTime).toString().split("GMT")[0]}</span></h5>
                            <h5 className="scheduleDetail"><span>{`seats Selected :`}</span>
                            {
                                arrOfSeats.map((seat)=>(
                             <span className="seatShow">{seat}</span>
                                ))
                             }</h5>
                        </div>
                    </div>
                </div>
                <button onClick={() => makeReservation()}>Reserve</button>
        </div>
)
}
export default Reservation;