import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/placeholder_logo.jpg';

function NavigableLogo() {
    return (
        <div className="navigableLogo">
            <Link to="/"><img height="50vh" src={logo} alt="placeholder_logo"/></Link>
        </div>
    );
}

export default NavigableLogo;