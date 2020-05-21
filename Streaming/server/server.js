const User = require('./User.js');
const fileSystem = require('fs');
const express = require('express');
const path = require('path');
const crypto = require('crypto');
const cors = require('cors');
const pg = require('pg');   //database connection

const app = express();
app.use(cors());
app.options('*', cors());

const conString = "postgresql://uzbxyxyi:j7b-g-qv6fw30KkL0dAkN1CMrPMg1sPs@balarama.db.elephantsql.com:5432/uzbxyxyi" //Can be found in the Details page

const SEGMENT_SIZE = 200000;    // size of each segment sent of a song being streamed
var loadedSong = "";
var songArray = [];

app.use('/assets', express.static('assets/images'));

app.get('/metadata.json', function (req, res) {

  const db = new pg.Client(conString);
  db.connect(function (err) {
    if (err) {
      console.error('could not connect to postgres', err);
      res.status(504).send('Database connection error');
    } else {
      db.query(
        'SELECT songs.song_id, songs.title, songs.duration, songs.song_url, songs.size, albums.album_name, albums.art_url, artists.artist_name  FROM songs ' +
        'JOIN onalbum ON songs.song_id = onalbum.song_id ' +
        'JOIN albums ON onalbum.album_id = albums.album_id ' +
        'JOIN createdby ON onalbum.album_id = createdby.album_id ' +
        'JOIN artists ON  createdby.artist_id = artists.artist_id',
        (err, result) => {
          if (err) {
            res.status(500).send('Database query error')
            console.error('error running query', err);
          }
          else {
            metadata = result.rows.map((data) => ({
              "songid": data.song_id + "",
              "title": data.title,
              "duration": data.duration,
              "song_url": data.song_url,
              "size": data.size,
              "album": data.album_name,
              "image_url": data.art_url,
              "artist": data.artist_name
            }));

            db.end();

            var json = JSON.stringify(metadata);
            res.json(json);
          }
        });
    }
  });
});


app.get('/playSong', (req, res) => {
  console.log("Received request to stream this song: " + req.query.song);
  console.log("Requested segment is: " + req.query.segment);

  if (req.query.song != loadedSong) {
    console.log("Now loading " + req.query.song);
    loadedSong = req.query.song;
    songArray = [];

    const filePath = path.resolve(__dirname, './assets', './music', req.query.song + '.mp3');

    const stat = fileSystem.statSync(filePath);   // we need the size to divide into segments in the same way as frontend

    var tempArray = [];
    const fileContents = fileSystem.readFileSync(filePath);
    tempArray.push(fileContents);

    for (index = 0; index < stat.size; index += SEGMENT_SIZE) {
      tmpSeg = fileContents.slice(index, index + SEGMENT_SIZE);

      songArray.push(tmpSeg);
      // should result in [ [1, 1, 1, 0 ... (for SEGMENT_SIZE)], [...], [...], ...]
    }

    res.status(200).send(songArray[req.query.segment]);

  } else {
    console.log("Sending segment " + req.query.segment);
    res.status(200).send(songArray[req.query.segment]);
    res.end();
  }
});


// for receiving a login request, checking whether the credentials are correct
app.get('/checkCred', (req, res) => {
  //Create new dbclient
  const db = new pg.Client(conString);

  let hashedPass = crypto.createHmac('sha256', req.query.password).update("ThisIsAnExampleOfSalt").digest('hex');
  let askUser = new User(undefined, (req.query.email).toLowerCase(), hashedPass); //user login data
  let foundUser; //will be set when db responds

  db.connect(function (err) {
      if (err) {
          //Cannot connect to DataBase for some reason
          console.error('could not connect to DataBase - Try again later.', err);
          res.status(500).send("500 - Internal Server Error");
      }

      db.query('SELECT * from users WHERE email = $1', [askUser.email], function (err, result) {
          if (err) {
              //cannot resolve query due to unexisting table etc.
              console.log("Fatal " + err);
              res.status(503).send("503 - Service Unavailable (Database Error)");

          } else if (result.rows.length == 0) {
              //No Error but no results either
              res.status(404).send("404 - Email does not exist in system");

          } else {
              //store result from DB
              foundUser = new User(result.rows[0].user_id, result.rows[0].email, result.rows[0].password);

              //check if email and password match
              if (askUser.password !== foundUser.password) {
                  res.status(401).send("401 - password does not match!");

              } else if (askUser.password === foundUser.password) {
                  res.status(200).send(foundUser.id + "");
              }
              //Called data stored locally ending session
              db.end();
          }
      });
  });

});

// for creating a new user in the system
app.post('/newUser', (req, res) => {
  const db = new pg.Client(conString);

  let hashedPass = crypto.createHmac('sha256', req.query.password).update("ThisIsAnExampleOfSalt").digest('hex');
  let newUser = new User(undefined, (req.query.email).toLowerCase(), hashedPass); //users.find(u => u.email == req.query.email);

  db.connect(function (err) {
      if (err) {
          //Cannot connect to DataBase for some reason
          console.error('could not connect to DataBase - Try again later.', err);
          res.status(500).send("500 - Internal Server Error");
      }

      db.query("INSERT INTO users(email, password) VALUES($1, $2)", [newUser.email, newUser.password], function (err, result) {
          if (err) {
              if (err == 'error: duplicate key value violates unique constraint "users_email_key"') {
                  res.status(403).send("403 - Mail already exist");
              } else {
                  console.log(err);
                  res.status(503).send("503 - Service Unavailable (Database Error)");
              }
          } else if (result.command === "INSERT") {
              res.status(200).send("Success! - User created!");
          }
          db.end();
      });
  });

});


app.listen(2000, function () {
  //server.listen(process.env.PORT || '2000', function () {
  console.log('Server app listening on port 2000!');
});