import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './Component/Login';
import Dashboard from './Component/Dashboard';

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
      <Router>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/dashboard" exact component={Dashboard}/>    
        </Switch>
    </Router>

  );
}

export default App;
