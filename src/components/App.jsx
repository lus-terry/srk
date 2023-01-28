import React, { useState } from 'react';
import Calendar from './Calendar/Calendar';
import { StyledCalendar } from './styles/Calendar.styled';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import Services from './pages/services';
import Contact from './pages/contact';
import SignUp from './pages/signup';

const App = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  return (

    <StyledCalendar>
        <Router>
      <Navbar />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/about' component={About} />
        <Route path='/services' component={Services} />
        <Route path='/contact-us' component={Contact} />
        <Route path='/sign-up' component={SignUp} />
      </Switch>
    </Router>
        <Calendar currentDate={currentDate} />
     </StyledCalendar>
 

   
    
  );
}

export default App;