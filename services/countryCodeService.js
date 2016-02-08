'use strict';
const lookup = require('country-data').lookup;

var lookupCountry = (countryName) => {
  return lookup.countries({name: countryName})[0] ? 
    lookup.countries({name: countryName})[0].alpha3 : null;
};

var addCountryCode = (countries) => {
  var formattedCountries = countries.map((country)=> {
    country.code = lookupCountry(country.name);
    return country;
  });

  return formattedCountries;
};


module.exports = addCountryCode;