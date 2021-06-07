import './App.css';


import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Login from './components/auth/login';
import NavigationBar from './components/layout/navigationBar';
import Footer from './components/layout/footer';
import Register from './components/auth/register';
import HotelList from './components/hotel/hotelList';
import Booking from './components/hotel/booking';

function App() {
  
  return (
    <Router>
      <div className="App">
        <NavigationBar/>
        <Switch>
          <Route path="/" exact component={HotelList}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/logout" exact component={HotelList}/>
          <Route path="/hotel/book/:id" exact component={Booking}/>
        </Switch>
        <Footer/>
      </div>
    </Router>
  );
}

export default App;
