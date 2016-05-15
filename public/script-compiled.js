'use strict';

var defaultBaseApiUrl = window.location.hostname === 'localhost' ? 'http://localhost:3000/api/' : 'http://petition-world.herokuapp.com/api/';
var map;
var totalVotes;

var addPetitionDetailsToDom = function addPetitionDetailsToDom(petitionId) {
    var petitionsDetails = JSON.parse(localStorage.petitionsInfo);
    var petitionDetails = petitionsDetails.filter(function (petition) {
        return petition.id == petitionId;
    });
    $('.panel-heading').attr('display', '');
    $('.panel-title').text(petitionDetails[0].action);
    $('.panel-body').text(petitionDetails[0].details.details);
};

var formatData = function formatData(country) {
    if (country.code === null) return;
    var formatted = {};
    var colour = "LOW";
    var percentile = country.signature_count / totalVotes * 100;
    if (percentile > 6) colour = "HIGH";
    if (percentile > 3) colour = "MEDIUM";

    formatted[country.code] = {
        fillKey: colour,
        numberOfVotes: country.signature_count
    };
    map.updateChoropleth(formatted);
};

var getTotalVotes = function getTotalVotes(previousValue, currentValue) {
    return previousValue + currentValue.signature_count;
};

var applyPetitionsToDom = function applyPetitionsToDom(petition) {
    $('.nav-sidebar').append('<li class="petition-link" data-id=' + petition.id + '><a href="#">' + petition.action + '</a></li>');
};

var getMapData = function getMapData(petitionId, callback) {
    $.get('' + defaultBaseApiUrl + petitionId).success(function (petitionData) {
        petitionData = petitionData.filter(function (country) {
            return country.code !== null;
        });
        totalVotes = petitionData.reduce(getTotalVotes, 0);
        petitionData.forEach(formatData);
        callback(petitionId);
    });
};

var getListOfPetitions = function getListOfPetitions() {
    $.get(defaultBaseApiUrl + 'petitions/all').success(function (petitionsData) {
        localStorage.petitionsInfo = JSON.stringify(petitionsData);
        petitionsData.forEach(applyPetitionsToDom);
        $('.petition-link').click(function (e) {
            e.preventDefault();
            var petitionId = $(this).attr('data-id');
            map.updateChoropleth({});
            getMapData(petitionId, addPetitionDetailsToDom);
        });
    });
};

$(document).ready(function () {
    map = new Datamap({
        element: document.getElementById('container'),
        fills: {
            HIGH: '#afafaf',
            LOW: '#123456',
            MEDIUM: 'blue',
            UNKNOWN: 'rgb(0,0,0)',
            defaultFill: 'green'
        },
        data: {},
        geographyConfig: {
            popupTemplate: function popupTemplate(geo, data) {
                if (data) {
                    return ['<div class="hoverinfo"><strong>', 'Number of votes in ' + geo.properties.name, ': ' + data.numberOfVotes, '</strong></div>'].join('');
                }
            }
        },
        done: function done(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function (geography) {
                alert(geography.properties.name);
            });
        }
    });
    map.legend();
    getListOfPetitions();
});
