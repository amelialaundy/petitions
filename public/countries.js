'use strict';
const defaultBaseApiUrl = 'http://localhost:3000/api/';
var map;

var formatData = (country) => {
    if (country.code === null) return;
    var formatted = {};
    formatted[country.code] = {
        fillKey: 'LOW',
        numberOfVotes : country.signature_count
    };
    console.log(formatted)
    map.updateChoropleth(formatted);
};

var getMapData = (petitionId) => {
    $.get(`${defaultBaseApiUrl}${petitionId}`)
    .success((petitionData) => {
        petitionData.filter((country) => {return country.code !== null;}).forEach(formatData);
        
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
        data: {
            IRL: {
                fillKey: 'LOW',
                numberOfThings: 2002
            },
            USA: {
                fillKey: 'MEDIUM',
                numberOfThings: 10381
            }
        },
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

