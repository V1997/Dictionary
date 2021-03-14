//import mongoose from './connection/connection';
const mongoose = require('mongoose');
const express = require('express');
const fetch = require('node-fetch');

const app = express();
var cors = require('cors')

const port = 8000;

app.use(cors())

const language = "en-gb";

const app_id = "bcb6688a";
const app_key = "9f372b8243139b4ad7fd2dac277b2188";
url = `https://od-api.oxforddictionaries.com:443/api/v2/entries/${language}/`;

app.get('/:word', async (req, res) => {
    // res.send('Hello World!')

    async function getData() {

        const response = await fetch(`https://od-api.oxforddictionaries.com:443/api/v2/entries/en/` + req.query.word, {
            method: "GET", // *GET, POST, PUT, DELETE, etc.
            headers: {
                app_id: app_id,
                app_key: app_key
                // Authorization: `${app_id} ${app_key}`
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            // body: JSON.stringify() // body data type must match "Content-Type" header
        }).then(res => res.json())
            .then(text => console.log(text));
        // res.json({ user: 'geek' }); 
    }
    getData();
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
});

//console.log(mongoose);
if (mongoose) {
    console.log("connected");
}