const http = require('http');
const fileSystem = require('fs');
const express = require('express');
const path = require('path');
const app = express();

//database connection
const pg = require('pg');

const cors = require('cors');
app.use(cors());
app.options('*', cors());

const conString = "postgresql://uzbxyxyi:j7b-g-qv6fw30KkL0dAkN1CMrPMg1sPs@balarama.db.elephantsql.com:5432/uzbxyxyi" //Can be found in the Details page


const SEGMENT_SIZE = 200000;    // size of each segment sent of a song being streamed
var loadedSong = "";
var songArray = [];

app.use('/assets', express.static('assets/images'));

var server = http.createServer(app);

app.get('/metadata.json', function (req, res) {

  const db = new pg.Client(conString);
  console.log("Client has asked for metadata");

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

    // not actually sure this is needed for anything???
    const stat = fileSystem.statSync(filePath);   // we need the size to divide into segments in the same way as frontend

    var tempArray = [];
    const fileContents = fileSystem.readFileSync(filePath);
    tempArray.push(fileContents);

    for (index = 0; index < stat.size; index += SEGMENT_SIZE) {
      tmpSeg = fileContents.slice(index, index + SEGMENT_SIZE);

      songArray.push(tmpSeg);
      // should result in [ [1, 1, 1, 0 ... (for SEGMENT_SIZE)], [...], [...], ...]
    }
    console.log("We are done loading the song!");

    console.log("Sending segment of length: " + songArray[req.query.segment].length);
    res.status(200).send(songArray[req.query.segment]);

  } else {
    console.log("Sending segment " + req.query.segment);
    console.log("This segment is of length " + songArray[req.query.segment].length);
    res.status(200).send(songArray[req.query.segment]);
    res.end();
  }
});


server.listen(2000, function () {
  //server.listen(process.env.PORT || '2000', function () {
  console.log('Server app listening on port 2000!');
});