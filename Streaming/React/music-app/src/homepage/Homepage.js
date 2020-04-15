import React, { useState } from 'react'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Login from './login/Login.js';
import CreateNewUser from './login/CreateNewUser.js';
import SingleSong from './browser/SingleSong.js';




function Homepage() {

  const [songs, setSongs] = useState([
    {
      song_id: 1,
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    },
    {
      song_id: 2,
      art: "http://kid-ethic.com/wp-content/uploads/2019/02/ALLTHEM-WITCHES.jpg",
      artist: "artist + features",
      song: "songName",
      album: "albumName",
      duration: "duration"
    }
  ]);
  
  const songcards = songs.map(song => <SingleSong key={song.song_id} data={song} />)
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/createNewUser">
            <CreateNewUser />
          </Route>

          <Route exact path="/homepage">
            {songcards}
          </Route>

          <Route exact path="/">    {/** checks from top to bottom; if we dont use exact path, this one will be shown in cases of 404 - and if it was first, we could never reach any other paths */}
            <Login />
          </Route>

          {/* add routes to new components here */}

        </Switch>
      </Router>
    </div>
  )
}
export default Homepage