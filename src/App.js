
import './App.css';
import Movie from './components/Movie';
import Schedule from './components/Schedule';
import SignIn from './components/SignIn';
import SeatSelection from './components/SeatSelection';
import Reservation from './components/Reservation';
import ManageReservation from './components/ManageReservation';
import Beverage from './components/Beverage';
import Popup from './components/Popup';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';

function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route exact path = "/" element={<Movie/>} />
            <Route exact path='/Schedule' element={<Schedule/>}/>
            <Route exact path='/SignIn' element={<SignIn/>}/>
            <Route exact path='/SignUp' element={<SignUp/>}/>
            <Route exact path='/SeatSelection' element={<SeatSelection/>}/>
            <Route exact path = '/Reservation' element={<Reservation/>}/>
            <Route exact path='/ManageReservation' element={<ManageReservation/>}/>
            <Route exact path='/Beverage' element={<Beverage/>}/>
            <Route exact path='/Popup' element={<Popup/>}/>
            </Routes>
        </Router>
    </div>
  );
}

export default App;
