import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logIn } from '../../redux/actions.js';
import { SERVER } from '../../env_vars.js';

function Login() {
    const dispatch = useDispatch();


    // called when clicking the login-button to enter the service
    const loginButton = async () => {

        if (document.getElementById('emailField').value === "" ||
            document.getElementById('passwordField').value === "") {

            document.getElementById('warnText').innerHTML = "Please fill in all fields!";

        } else {
            try {
                // call server and check credentials
                let resp = await fetch(`${SERVER}/checkCred?email=${document.getElementById("emailField").value}&password=${document.getElementById('passwordField').value}`,
                    {
                        credentials: 'same-origin'
                    });
                let respID = await resp.text();

                if (resp.status === 200) {
                    dispatch(logIn(respID));
                    return;     // correct react component will render automatically - login was just rendered in front while not authorized
                } else if (resp.status === 404) {
                    document.getElementById("warnText").innerHTML = "That email does not match any users in the system!";
                } else if (resp.status === 401) {
                    document.getElementById("warnText").innerHTML = "Login failed! (Probably due to wrong password, the email exists)";
                }
                // clearing textfields
                document.getElementById("emailField").value = "";
                document.getElementById("passwordField").value = "";

            } catch (error) {
                console.log(error);
                document.getElementById("warnText").innerHTML = "Service is currently unavailable. Please try again later.";
            }
        }
    }

    return (
        <div className="loginSystem">
            <h2 className="loginText">Fill in your email:</h2>
            <input id="emailField" className="usernameBox" placeholder="Enter email" autoFocus></input>
            <h2 className="loginText">Fill in your password:</h2>
            <input type="password" id="passwordField" className="passwordBox" placeholder="Enter password"></input>
            <br />
            <button className="loginButtons" onClick={loginButton}>Submit</button>

            <Link to="/createNewUser"><button className="loginButtons">Create New User</button></Link>

            <h3 className="respText" id="warnText"></h3>
        </div>
    );
}

export default Login;
