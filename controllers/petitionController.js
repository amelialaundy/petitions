'use strict';
const petitionUrl = 'https://petition.parliament.uk/petitions/';
const allPetitionsUrl = 'https://petition.parliament.uk/petitions.json?state=open';
const https = require('https');
const countryCodeService = require('../services/servicesIndex.js').countryCodeService;
const petitionService = require('../services/servicesIndex.js').petitionService;

var getPetitionData = (petitionId, callback) => {
  //add error handling and validation for petitionId
  var url = `${petitionUrl}${petitionId}.json`;

  https.get(url, (result) => {
    var resultStr = '';
    // consume response body
    result.resume();
    result.on('data', (d) => {
      resultStr += d;
    });
    result.on('end', () => {
      var jsonResult  = JSON.parse(resultStr).data.attributes.signatures_by_country;
      callback(countryCodeService(jsonResult));
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    return;
  });
};

var getAllPetitionData = (callback) => {
  https.get(allPetitionsUrl, (result) => {
    console.log(`Got response from all: ${result.statusCode}`);
    var resultStr = '';
    // consume response body
    result.resume();
    result.on('data', (d) => {
      resultStr += d;
    });
    result.on('end', () => {
      var jsonResult  = JSON.parse(resultStr).data;
      callback(petitionService.getAllPetitions(jsonResult));
    });
  }).on('error', (e) => {
    console.log(`Got error: ${e.message}`);
    return;
  });
};

module.exports = {
  getPetitionData : getPetitionData,
  getAllPetitionData: getAllPetitionData
};