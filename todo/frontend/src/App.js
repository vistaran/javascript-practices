import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';
import Signup from './Component/Signup';
import RedirectSignup from './Component/RedirectSignup';

function App() {
  return (
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard}/>
          <Route path="/signup" exact component={Signup} />
          <Route path="/:id" exact component={RedirectSignup} />    
        </Switch>
    </Router>
  );
}

export default App;
