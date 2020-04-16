import React, { Component } from "react";
import './NavBar.css';


class VisitorNavBar extends Component {
    render() {       
        return (
            <div className="navbar">				
                <div className='take-back-links'>					
                    <a href="/">
                        <i className="fa fa-home"></i>
                    </a>                   
                </div>				
            </div>
        );
    }
}


export default VisitorNavBar;