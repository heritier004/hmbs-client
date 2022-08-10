import bgVideo from "../assets/videoplayback2.mp4"
import searchIcon from "../assets/search2.png"
import  { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
const Axios = require('axios');
const Location = () => {
const [movies, setMovies] = useState([]);
const navigate = useNavigate();
    const searchMovies = () => {
        Axios.get("http://localhost:5000/movies")
        .then((response)=>{
            console.log(response.data)
            setMovies(response.data)
        });
    }
    useEffect(() => {  
        searchMovies()
    }, []);

    const getSchedule = (id) =>{
        Axios.get(`http://localhost:5000/${id}/schedule`)
        .then((response)=>{
            localStorage.setItem("schedule",JSON.stringify(response.data));
            navigate("/schedule");
        });
    }
    const getSignUp = () => {
        navigate("/signup");
    } 
    return (
        <div className="videoPreview">
            <div className="overlay"></div>
            <video src={bgVideo} loop autoPlay muted></video>
            <div className="menuPanel">
                <p id="specialCase">HMBS</p>
                <div>
                    <input className="searchBar" placeholder="Enter search phrase" type="text"></input>
                    <img style={{width:'55px', height:'auto'}} src={searchIcon}></img>
                </div>
                <button className="search" onClick={() => getSignUp()} style={{display:'block'}}>Signup</button>
            </div>
            <div className="headings">
            </div>

            <div className="catalog">
                {
                movies?.length > 0
                    ? (
                        <div className="container">

                            { movies.map((movie) => (

                                <div className="movie" id={movie.id}   onClick = {() => getSchedule(movie.id)}>
                                    <div>
                                        <p>{movie.title}</p>
                                    </div>
                                    <div>
                                        <img src={movie.imagepath} alt={movie.title} />
                                    </div>
                                    <div>
                                        <span>{movie.title}</span>
                                        <h3>{movie.title}</h3>
                                    </div>
                                </div>
                            ))} 
                        </div>

                    ) : (
                        <div className="empty">
                            <h2>No Movie found</h2>
                            <div>
                                 <img src="./../notFound.png"/>
                             </div> 
                        </div>
                    )
            }
            </div>
        </div>
    );
}
export default Location;