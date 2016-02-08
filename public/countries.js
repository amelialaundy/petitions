'use strict';
const defaultBaseApiUrl = 'http://localhost:3000/api/';
var map;
var totalVotes;
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

var getMapData = (petitionId) => {
    $.get(`${defaultBaseApiUrl}${petitionId}`)
    .success((petitionData) => {
        petitionData = petitionData.filter((country) => {return country.code !== null;});
        totalVotes = petitionData.reduce(getTotalVotes, 0);
        console.log(totalVotes);
        petitionData.forEach(formatData);
    });
};
//map.updateChoropleth(petitionData)
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
        }
    });
    map.legend();
    getMapData(113231);
});

