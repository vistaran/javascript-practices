import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import HomeIcon from '@material-ui/icons/Home';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useHistory } from "react-router-dom";
const axios = require('axios');

function NavBar(props) {
    const [user_details ,setUserDetails] = useState([])
    let history = useHistory();
     var user = JSON.parse(localStorage.getItem('user'))
    var user_id = user ? user[0].id : '';
    var username = '';
    useEffect(() => {
        axios.post('/userdetails', { 
                User_id: user_id 
          })
          .then(function (response) {
            setUserDetails(response.data);
          })
          .catch(function (error) {
            console.log(error);
          })
    },[]);

    for (let i = 0; i < user_details.length; i++) {
        console.log(user_details)
        username = user_details[i].firstname
    }

    function logout() {
        localStorage.removeItem('user');
        history.push('/')
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-danger" style={{backgroundColor:"brown"}}>
                <a className="navbar-brand" href="#">Navbar</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav ml-auto">
                    <li className="nav-item active">
                    <a className="nav-link" href="/dashboard"><HomeIcon /></a>
                    </li>
                    <li className="nav-item">
                    <a className="nav-link" href="#" style={{fontWeight:"bold"}}>{username}</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" onClick={logout} style={{fontWeight:"bold"}}><ExitToAppIcon /></a>
                    </li>
                </ul>
                </div>
            </nav>
        </div>
    );
}

export default NavBar;