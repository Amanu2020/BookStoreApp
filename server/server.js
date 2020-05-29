'use strict';
const express = require('express');
const path = require('path');
const port = process.env.PORT = 7500;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + 'index.html');
});


//Start Server
app.listen(port, () => {
  console.log('Server now started listening Port: ' + port);
});
