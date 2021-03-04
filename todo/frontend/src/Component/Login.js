import React, { Component } from 'react';
import Dashboard from './Dashboard';
import './style.css';
import { Redirect } from "react-router";
import  { NavLink  } from 'react-router-dom'
// import { Button } from 'bootstrap';
const axios = require('axios');

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            LoginSuccess: false
        }
    }

    submit = () => {
        var str =document.getElementById('email').value
        console.log(str)
        axios.post('/login',{
                username : document.getElementById('email').value,
                password : document.getElementById('password').value
        }).then(response => {
            console.log(response)
            if(response.data.length > 0) {
                window.location.href = '/dashboard';

            }
        }) .catch(function (error) {
            console.log(error);
          })
    }
    render()  {
        return (     
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-4"></div>
                    <div className="col-md-4">
                        <h2 className="facebook_name">Task Management System</h2>
                    </div>
                    <div className="col-md-4"></div>
                </div>
                <div className="row">
                    <div className="col-md-4"></div>
                        <div className="col-md-4 login-form" style={{textAlign: "center",border: "2px",border: "solid", border:"floralwhite", borderRadius: "25px"}}>
                                <p className="log_text">Log in to TMS</p>
                                <input className="form-control input_box" id="email" name="email" placeholder="Email address or phone number" autoFocus />
                                <br></br>
                                <input className="form-control input_box" id="password" name="pass" placeholder="Password" autoFocus />
                                <br></br>

                                <button type="button" id="submit-btn" className="btn btn-primary" style={{fontSize: "20px", fontWeight: "bold"}} onClick={this.submit}>Log In</button>
                                <br></br>
                                <br></br>
                                    {/* <a href="#">Forgotten account?</a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a href="/signup">Signup for TMS</a> */}
                            </div>
                    <div className="col-md-4"></div>
                </div>
            </div>
        );
    }
}


export default Login;