import bgVideo from "../assets/videoplayback3.MP4"
import imageLabel from "../assets/bookmyshow2.png"
import searchIcon from "../assets/search2.png"
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";

const Axios = require('axios');
const Location = () => {
    const [movies, setMovies] = useState([]);
    const [moviesByTitle, getMoviesBySearch] = useState([]);
    const [title, setTitle] = useState("");
    const [flag, setFlag] = useState(false);
    const navigate = useNavigate();

    const searchMovies = () => {
        Axios.get("https://movie-bookings-system.herokuapp.com/movies")
            .then((response) => {
                console.log(response.data)
                setMovies(response.data);
                if(JSON.parse((localStorage.getItem("userSigned")))?.length > 0){
                    setFlag(true);
                    document.querySelector(".search").innerHTML = "Log Out";
                    
                }
            });
    }

    const searchTitle = () => {
        if (title.length > 0) {
            Axios.post("https://movie-bookings-system.herokuapp.com/movie", { title: title })
                .then((response) => {
                    console.log("we are done.....", response);
                    getMoviesBySearch(response.data);
                    setMovies(response.data);
                    movies = moviesByTitle;
                });
        } else {
            searchMovies();

        }

    }

    useEffect(() => {
        searchMovies()
    }, []);    

    const getSchedule = (id) => {
        Axios.get(`https://movie-bookings-system.herokuapp.com/${id}/schedule`)
            .then((response) => {
                localStorage.setItem("schedule", JSON.stringify(response.data));
                navigate("/schedule");
            });
    }
    const getSignUp = () => {
        if(JSON.parse((localStorage.getItem("userSigned")))?.length > 0){
            localStorage.removeItem("userSigned");
            document.querySelector(".search").innerHTML = "Sign In";
            document.location.reload();
        }else{
            navigate("/signup");
        }
    }
    return (
        <div className="videoPreview">
            <div className="overlay"></div>
            <video src={bgVideo} loop autoPlay muted></video>
            <div className="menuPanel">
                <img style={{width:'180px', height:'110px'}} src={imageLabel}/>
                <div >
                    <input className="searchBar" placeholder="Enter search phrase" type="text" name="title" onChange={(event) => { setTitle(event.target.value) }}></input>
                    <img  onClick={searchTitle} style={{ width: '55px', height: 'auto' }} src={searchIcon}></img>
                </div>
                <button className="search" onClick={() => getSignUp()} style={{ display: 'block' }}>Signup</button>
            </div>
            <div className="headings">
            </div>

            <div className="catalog">
                {
                    <div className="app">
 
                        {
                            movies?.length > 0
                                ? (
                                    <div className="container">

                                        {movies.map((movie) => (

                                            <div className="movie" id={movie.id} onClick={() => getSchedule(movie.id)}>
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
                                            <img src="./../notFound.png" />
                                        </div>
                                    </div>
                                )
                        }
                    </div>
                }</div>
        </div>
    );
}

export default Location;
