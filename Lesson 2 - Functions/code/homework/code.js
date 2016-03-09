(function(global) {
    var mapArray;

    if (!global.UAM) {
        global.UAM = {};
    }

    global.UAM.aircrafts = [];

    //////////////////////////////////////////////////////////////////////////////////////
    ///////////////////////////////// Sample aircraft with sample service  /////////////// 

    // global.UAM.aircrafts.push({
    //     code: 'SP-ABC',
    //     services: []
    // });

    // global.UAM.aircrafts[0].services.push({
    //     name: 'smth1',
    //     timeToExecute: 120
    // });

    //////////////////////////////////////////////////////////////////////////////////////

    global.UAM.addAircraft = function(newAircraftCode) {
        // function should return new aircraft object
        var obj = {
            code: newAircraftCode,
            services: []
        };

        global.UAM.aircrafts.push(obj);

        return obj;

    };

    global.UAM.removeAircraft = function(aircraftObj) {
        // !!!
        global.UAM.aircrafts = global.UAM.aircrafts.filter(function(elem) {
            return elem !== aircraftObj;
        });
    };

    global.UAM.addWorkToAircraft = function(aircraftObj, name, timeToExxecute) {
        // !!!
        global.UAM.aircrafts[global.UAM.aircrafts.indexOf(aircraftObj)].services.push({
            name: name,
            timeToExecute: timeToExxecute
        });
    };

    global.UAM.reduceTimeToExecute = function(aircraftObj, time) {
        // !!!
        if (!aircraftObj.services) { return; }

        aircraftObj.services.forEach(function(elem) {
            elem.timeToExecute -= time;
        });
    };

    global.UAM.getAircraftsForRepairs = function(maxTimeToExecute) {
        // !!!
        var forRepairs = [];

        global.UAM.aircrafts.forEach(function(ari) {
            if (!ari.services) { return; }
            
            ari.services.find(function(serv) {
                if (serv.timeToExecute <= maxTimeToExecute) {
                    forRepairs.push(ari);
                    return serv;
                }
            });
        });

        return forRepairs;
    };

} (window));

/*

Przykład użycia:

var newAircraft1 = addAircraft('SP-XY1');
var newAircraft2 = addAircraft('SP-XY2');

addWorkToAircraft(newAircraft1, 'serviceXY1a', 110);
addWorkToAircraft(newAircraft1, 'serviceXY1b', 130);
reduceTimeToExecute(newAircraft1, 20);

var sxy2a = addWorkToAircraft(newAircraft2, 'serviceXY2a', 130);
var sxy2b = addWorkToAircraft(newAircraft2, 'serviceXY2b', 160);
reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft1 ]

removeAircraft(newAircraft1);

getAircraftsForRepairs(100); // []

reduceTimeToExecute(newAircraft2, 20);

getAircraftsForRepairs(100); // [ newAircraft2 ]

*/
