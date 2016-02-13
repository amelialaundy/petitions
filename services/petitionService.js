'use strict';

var mapPetitionInformation = (petition) => {
  var filteredPetition = {};
  filteredPetition.id = petition.id;
  filteredPetition.url = petition.links.self;
  filteredPetition.action = petition.attributes.action;
  filteredPetition.details = {}
  filteredPetition.details.details = petition.attributes.additional_details;
  filteredPetition.details.created = petition.attributes.created_at;
  filteredPetition.signature_count = petition.attributes.signature_count;
  filteredPetition.state = petition.attributes.state;
  filteredPetition.video = petition.attributes.debate;
  return filteredPetition;
};
var getAllPetitions = (petitions) => {
  var result = petitions.map(mapPetitionInformation);
  return result;
};

module.exports = {
  getAllPetitions: getAllPetitions
};