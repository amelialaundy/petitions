'use strict';
const petitionUrl = 'https://petition.parliament.uk/petitions/';
const https = require('https');
const countryCodeService = require('../services/servicesIndex.js').countryCodeService;

var getPetitionData = (petitionId, callback) => {
  //add error handling and validation for petitionId
  var url = `${petitionUrl}${petitionId}.json`;

  https.get(url, (result) => {
    console.log(`Got response: ${result.statusCode}`);
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

module.exports = getPetitionData;