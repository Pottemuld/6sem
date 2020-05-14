const http = require('http');
const express = require('express');
const app = express();
const pg = require('pg');   //database connection
const conString = "postgresql://uzbxyxyi:j7b-g-qv6fw30KkL0dAkN1CMrPMg1sPs@balarama.db.elephantsql.com:5432/uzbxyxyi" //Can be found in the Details page

const cors = require('cors');
app.use(cors());
app.options('*', cors());


app.use('/assets', express.static('assets/images'));

var server = http.createServer(app);

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

server.listen(2000, function () {
  //server.listen(process.env.PORT || '2000', function () {
  console.log('Server app listening on port 2000!');
});