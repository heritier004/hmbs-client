import { Navigate } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";


const Axios = require("axios");

const Schedule = ()=>{

const navigate = useNavigate();
const data = JSON.parse(localStorage.getItem("schedule"));
const schedules  = data;
const sched = data['0']
console.log(schedules.length);


const handleOpen =(id)=>{
    localStorage.setItem("selectedSched",id);
    navigate("/SignIn");
}
    
return(

    <div className="app">       
    <h1>Movie Booking System</h1>
    {
        schedules?.length > 0
    ?( <div className="container">
           
           {schedules.map((schedule)=>(
        
                <div className="schedule" id={schedule.id}  onClick = {()=>handleOpen(schedule.id)}>
                {/*onClick={() => handleOpen(schedule)}>*/}
                       <h2> <p className="cinemaTitle">FairField Cinema </p> </h2>
                        <div>
                            <h4>{`Movie Title : `}</h4>
                            {/* <h5>{`Start Time  :${schedule.start_time}`}</h5>
                            <h5>{`End Time    :${schedule.end_time}`}</h5> */}
                        
                            <h5 className="scheduleDetail"><span>{`Start Time :`}</span> <span>{`${new Date(schedule.startTime).getHours()}`+":"+`${new Date(schedule.startTime).getMinutes()}`}</span></h5>
                            <h5 className="scheduleDetail"><span>{`End Time   :`}</span> <span>{`${new Date(schedule.endTime).getHours()}`+":"+`${new Date(schedule.endTime).getMinutes()}`}</span></h5>
                            {/* <h5 className="scheduleDetail"><span>{`Date :`}</span> <span>{`${new Date(schedule.date).getFullYear()}-${new Date(schedule.date).getMonth()}-${new Date(schedule.date).getDate()}`}</span></h5>
                        </div> */}
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
    );
}

export default Schedule;