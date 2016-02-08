$(document).ready(function() {
    'use strict';
    var Codes = [];
    var Data = {};
    var map = new Datamap({
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
                return ['<div class="hoverinfo"><strong>',
                        'Number of things in ' + geo.properties.name,
                        ': ' + data.numberOfThings,
                        '</strong></div>'].join('');
            }
        }
    });
    map.legend();

    // $.get('https://petition.parliament.uk/petitions/114003.json').
    // success(function (result) {
    //     var countries = result['data']['attributes']['signatures_by_country'];
    //     countries.forEach(function(countryData, x) {
    //         var country = countryData.name;
    //         $.get('https://restcountries.eu/rest/v1/name/' + country)
    //         .success(function (codeData) {
    //             console.log(codeData[0]['alpha3Code']);
    //             var countryCode =  codeData[0]['alpha3Code'];
    //             var count = countryData['signature_count'];
    //             Data[countryCode.toUpperCase()] = {
    //                 fillKey: 'LOW',
    //                 numberOfThings: count
    //             };
    //             if (x === 177){
    //                 map.updateChoropleth(Data);
    //             }
    //         }).error(function(err) {
    //         });
    //     });
        
    // });
     
});