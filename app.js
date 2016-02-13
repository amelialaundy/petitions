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
app.get('/api/petitions/all', function (req, res) {
  controllers.petitionController.getAllPetitionData((result) => {
    res.send(result);
  });
});

//api for getting petition by petitionId
app.get('/api/:petitionId', function (req, res) {
  controllers.petitionController.getPetitionData(req.params.petitionId, (result) => {
    res.send(result);
  });
});


app.listen(process.env.PORT || 3000, function(){
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});


// app.listen(3000, function () {
//   console.log('Example app listening on port 3000!');
// });