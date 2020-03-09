import React from 'react';
import reg from '../reg-pic.jpg'
import DatePicker from 'react-date-picker';
import './Register.css';

function Register() {
    const dashboard = () =>{
        //needs fleshed out to determine student vs admin
        window.location.href = "/Dashboard";
    };
    return (
        <div className="Register">
            <div className="Register-container">
                <div className="Icon">
                    <img src={reg} alt="Logo" />
                    <h1>Career Finder</h1>
                    <h4>Register for an Account</h4>
                </div>
                <form className="Register-form">
                    <div className="Register-form-col-1">
                        <input type="text" placeholder="First Name"/>
                        <input type="text" placeholder="Username"/>
                        <input type="text" placeholder="Password"/>
                        <input type="text" placeholder="Confirm Password"/>
                    </div>

                    <div className="Register-form-col-2">
                        <input type="text" placeholder="Last Name"/>
                        <input type="text" placeholder="Invitation Code"/>
                        <DatePicker
                            name="Date of Birth"
                            dateFormat="MM/DD/YYYY"/>
                    </div>
                </form>
                <div>
                    <button onClick={dashboard}>Submit</button>
                </div>

                <div className="credits">
                    Photo by Christin Hume on Unsplash
                </div>
            </div>
        </div>
    );
}

export default Register;
