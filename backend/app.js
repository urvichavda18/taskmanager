const express = require('express');

const db = require('./db');
const app = express();

db()

app.use(express.json())

const port = 6600;

app.listen(port, () => {
    console.log("server is started");
})


