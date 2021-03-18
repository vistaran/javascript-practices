import React from 'react';
import { useHistory } from "react-router-dom";
const axios = require('axios');

function Signup(props) {
    let history = useHistory();
    function submit() {
        axios.post('/create_account',{
            firstname : document.getElementById('firstname').value,
            lastname : document.getElementById('lastname').value,
            email : document.getElementById('email').value,
            password : document.getElementById('pass').value
    }).then(response => {
            history.push('/'+response.data);
    }) .catch(function (error) {
        console.log(error);
      })
    }
    return (
        <div>
              <div className="container-fluid signup">
        <div className="container">
        <div className="row">
            <div className="col-md-4">
                <h2 className="facebook_name_signup">TMS</h2>
              </div>
            <div className="col-md-4"></div>
            <div className="col-md-4"></div>
        </div>
    </div>
    </div>
    <div className="container-fluid sign-up">
        <div className="row">
            <div className="col-md-4"></div>
            <div className="col-md-4 signup-form" style={{textAlign:"center"}}>
                <div className="container">
                    <div className="form-group">
                        <p className="sign_text">Create a new account</p>
                        <p className="text">It's quick and easy.</p>
                        <div className="row">
                            <div className="col-md-6">
                                <input className="form-control input_box_signup rect" id="firstname" name="firstname" placeholder="First name" autoFocus />
                                <p id="firstname-error-messages" className="error-messages" style={{textAlign:"left",fontcolor:"red"}}></p>
                            </div>
                            <div className="col-md-6">
                                <input className="form-control input_box_signup rect" id="lastname" name="lastname" placeholder="Last name" />
                                <p id="lastname-error-messages" className="error-messages" style={{textAlign:"left",fontcolor:"red"}}></p>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12" style={{marginTop:"15px"}}>
                                <input className="form-control input_box_signup rect" id="email" name="email" placeholder="Email address or phone number" />
                                <p id="email-error-messages" className="error-messages" style={{textAlign:"left",fontcolor:"red"}}></p>
                            </div>
                        </div>
                        
                        <div className="row">
                            <div className="col-md-12" style={{marginTop:"15px"}}>   
                                <input className="form-control input_box_signup rect" id="pass" name="password" placeholder="New Password" />   
                                <p id="pass-error-messages" className="error-messages" style={{textAlign:"left",fontcolor:"red"}}></p>
                            </div>
                        </div>
                        <br></br>
                        <button type="button" id="submit-btn" className="btn btn-success" style={{fontSize:"17px",fontWeight:"bold"}} onClick={submit}>Sign Up</button>
                    </div>
            </div>
            </div>
            <div className="col-md-4"></div>
        </div>
    </div>

        </div>
    );
}

export default Signup;