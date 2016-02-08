'use strict';
var express = require('express');
var app = express();
const controllers = require('./controllers/controllersIndex.js');
const path = require('path');

app.use(express.static('public'));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/countries.html'));
});

//api for getting petition by petitionId
app.get('/api/:petitionId', function (req, res) {
  controllers.petitionController(req.params.petitionId, (result) => {
    res.send(result);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});