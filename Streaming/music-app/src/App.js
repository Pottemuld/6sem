import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import './App.css';
import FancyNavbar from './navbar/FancyNavbar.js';
import Homepage from './homepage/Homepage.js';
import { StreamingInfoProvider } from './player/StreamingContext';


function App() {

  return (
      <StreamingInfoProvider>
        <div className="App">
          <Router>
            {/* header here */}
            <h1 className="thisIsFormattingForTheMainTitleOfTheGenericUnnamedStreamingServiceThatWeHaventMadeYet"></h1>

            <FancyNavbar />

            {/* body below here */}
            <Homepage />

            {/* footer below here */}

          </Router>
        </div>
      </StreamingInfoProvider>
  );
}

export default App;
