import React from 'react';

function About() {
    const background = {
        "backgroundColor": "rgb(200, 200, 200)",
        "padding": "10px"
    };


    return(
        <div style={background}>
            <h3>About Us</h3>
            <p className="misc-p">
                We are a group of Software Engineering students from the University of Southern Denmark (SDU / Syddansk Universitet),
                 who are currently working on our bachelors project. <br/>
                This site has been created purely for testing purposes, as a somewhat generic streaming service
                 against which we can measure certain improvements and/or changes that our projects may introduce to this type of service. <br/> <br/>
                It has been developed as a collaboration by: <br/> 
                 - Alexander Micheelsen Rol, alrol17 <br/>
                 - Lasse Fisker, lafis17 <br/>
                 - Patrick Christoffersen, pachr16 <br/>
                 - Rasmus Jensen, rasje17 <br/>
            </p>
        </div>
    );
}

export default About;