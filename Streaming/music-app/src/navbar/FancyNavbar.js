import React from 'react';
import './navbar.css';
import NavigableLogo from './NavigableLogo';
import NavLinks from './NavLinks';
import Player from '../player/Player';
import { useSelector } from 'react-redux';


function FancyNavbar(){
  const loggedID = useSelector(state => state.loggedID);

    return(
        <div className="navBackground">
          <NavigableLogo />
          {loggedID > 0 ? < Player /> : "" }
          <NavLinks className="navLinks" />
        </div>
    )
}
export default FancyNavbar