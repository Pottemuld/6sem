import React from 'react';
import { Link } from 'react-router-dom';
import { LOGIN_SERVER } from '../../env_vars.js';


async function createUser() {

    if (document.getElementById('emailField').value === "" ||
        document.getElementById('passField').value === "") {

        document.getElementById('responseText').innerHTML = "Please fill in all fields!";

    } else {
        try {
            let resp = await fetch(`${LOGIN_SERVER}/newUser?email=${document.getElementById("emailField").value}&password=${document.getElementById("passField").value}`,
                {
                    method: 'POST',
                    credentials: 'same-origin'
                });
            let status = await resp.status;

            if (status === 200) {
                document.getElementById('responseText').style.color = "black";
                document.getElementById('responseText').innerHTML = "User has been registered! You can now go back to login.";
            }
            else {
                document.getElementById('responseText').style.color = "red";
                document.getElementById('responseText').innerHTML = "Error! I think that email already exists in the system!";
            }


            document.getElementById('emailField').value = "";
            document.getElementById('passField').value = "";

        } catch (error) {
            console.log(error);
            document.getElementById('responseText').style.color = "red";
            document.getElementById('responseText').innerHTML = "Service is currently unavailable. Please try again later.";
        }
    }
}

function CreateNewUser() {
    return (
        <div className="loginSystem">
            <h2 className="loginText">
                Input your email:
            </h2>
            <input className="usernameBox" id="emailField" placeholder="Enter email"></input>
            <br />
            <h2 className="loginText">
                Input password for your new user:
            </h2>
            <input type="password" className="passwordBox" id="passField" placeholder="Enter password"></input>
            <br />
            <button className="loginButtons" onClick={createUser}>Submit</button>
            <Link to="/"><button className="loginButtons">Back to Login</button></Link>
            <h2 className="respText" id="responseText"></h2>
        </div>
    );
}

export default CreateNewUser;
