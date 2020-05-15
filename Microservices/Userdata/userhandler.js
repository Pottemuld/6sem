const User = require('./User.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const pg = require('pg');
const crypto = require('crypto');

const conString = "postgresql://uzbxyxyi:j7b-g-qv6fw30KkL0dAkN1CMrPMg1sPs@balarama.db.elephantsql.com:5432/uzbxyxyi" //Can be found in the Details page

const server = express();
server.use(bodyParser.urlencoded({ extended: false }));
server.use(bodyParser.json());
server.use(cors());
server.options('*', cors());

// for receiving a login request, checking whether the credentials are correct
server.get('/checkCred', (req, res) => {
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
                if (askUser.email !== foundUser.email || askUser.password !== foundUser.password) {
                    res.status(401).send("401 - Email or password does not match!");

                } else if (askUser.email === foundUser.email && askUser.password === foundUser.password) {
                    res.status(200).send(foundUser.id + "");
                }
                //Called data stored locally ending session
                db.end();
            }
        });
    });

});

// for creating a new user in the system
server.post('/newUser', (req, res) => {
    const db = new pg.Client(conString);

    let hashedPass = crypto.createHmac('sha256', req.query.password).update("ThisIsAnExampleOfSalt").digest('hex');
    let newUser = new User(undefined, (req.query.email).toLowerCase(), hashedPass);

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
console.log("Server listening on 8080")
server.listen(8080);