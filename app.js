'use strict';
var express = require('express');
var app = express();
const lookup = require('country-data').lookup;
const controllers = require('./controllers/controllersIndex.js');

app.get('/:petitionId', function (req, res) {
  controllers.petitionController(req.params.petitionId, (result) => {
    res.send(result);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

var addCountryCode = (countries) => {
  var formattedCountries = countries.map((country)=> {
    country.code = lookupCountry(country.name);
    console.log(`country: ${country}`);
    return country;
  });
  console.log(formattedCountries);
  return formattedCountries;
};
 var lookupCountry = (countryName) => {
  return lookup.countries({name: countryName})[0] ? lookup.countries({name: countryName})[0].alpha3 : null;
};