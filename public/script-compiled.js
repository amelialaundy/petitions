(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

const defaultBaseApiUrl = window.location.hostname === 'localhost' ?  'http://localhost:3000/api/': 'http://petition-world.herokuapp.com/api/' ;
var map;
var totalVotes;

var addPetitionDetailsToDom = (petitionId) => {
    var petitionsDetails = JSON.parse(localStorage.petitionsInfo)
    var petitionDetails = petitionsDetails.filter((petition) => {
        return petition.id == petitionId;
    });
    $('.panel-heading').attr('display', '');
    $('.panel-title').text(petitionDetails[0].action);
    $('.panel-body').text(petitionDetails[0].details.details);

};

var formatData = (country) => {
    if (country.code === null) return;
    var formatted = {};
    var colour = "LOW";
    var percentile = (country.signature_count / totalVotes) * 100;
    if (percentile > 6) colour  = "HIGH";
    if (percentile > 3) colour  = "MEDIUM";

    formatted[country.code] = {
        fillKey: colour,
        numberOfVotes : country.signature_count
    };
    map.updateChoropleth(formatted);

};

var getTotalVotes = (previousValue, currentValue) => {
    return previousValue + currentValue.signature_count;
};

var applyPetitionsToDom = (petition) => {
    $('.nav-sidebar').append(`<li class="petition-link" data-id=${petition.id}><a href="#">${petition.action}</a></li>`);
};

var getMapData = (petitionId, callback) => {
    $.get(`${defaultBaseApiUrl}${petitionId}`)
    .success((petitionData) => {
        petitionData = petitionData.filter((country) => {return country.code !== null;});
        totalVotes = petitionData.reduce(getTotalVotes, 0);
        petitionData.forEach(formatData);
        callback(petitionId);
    });
};

var getListOfPetitions = () => {
    $.get(`${defaultBaseApiUrl}petitions/all`)
    .success((petitionsData) => {
        localStorage.petitionsInfo = JSON.stringify(petitionsData);
        petitionsData.forEach(applyPetitionsToDom);
        $('.petition-link').click(function (e){
            e.preventDefault();
            var petitionId = $(this).attr('data-id')
            map.updateChoropleth({});
            getMapData(petitionId, addPetitionDetailsToDom);
        });
    });
};

$(document).ready(function() {
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
            popupTemplate: function(geo, data) {
                if (data) {
                    return ['<div class="hoverinfo"><strong>',
                        'Number of votes in ' + geo.properties.name,
                        ': ' + data.numberOfVotes,
                        '</strong></div>'].join('');
                }
            }
        },
        done: function(datamap) {
            datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                alert(geography.properties.name);
            });
        }
    });
    map.legend();
    getListOfPetitions();
});


},{}]},{},[1]);
