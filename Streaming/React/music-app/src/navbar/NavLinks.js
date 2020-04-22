import React, { useContext } from 'react';
import './navlinks.css';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logOut } from '../redux/actions';


//https://codepen.io/Scotho/pen/ygjOPj
function NavLinks() {
    const loggedID = useSelector(state => state.loggedID);
    const dispatch = useDispatch();

    function onClickLogOut() {
        dispatch(logOut());
    }

    function logIn() {
        window.location.pathname = "/";     // can only happen when not logged in, so no state to save - therefore no need to redirect through react
    }

    return (
        <span className="dropdown">
            <button>Menu</button>
            <label>
                <input type="checkbox" />
                <ul>
                    <Link to="/"><li>Home</li></Link>
                    <Link to="/account"><li>Account Settings</li></Link>
                    <Link to="/about"><li>About</li></Link>
                    <Link to="/help"><li>Help</li></Link>
                    <li className="divider"></li>
                    {loggedID < 0 ? <li onClick={logIn}>Log in</li> : <li onClick={onClickLogOut}>Log out</li>}
                </ul>
            </label>
        </span>
    );
}

export default NavLinks;