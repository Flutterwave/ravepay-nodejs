var listSettlements = require('../services/rave.list.settlements');
var fetchSettlements = require('../services/rave.fetch.settlements');


function settlements(RaveBase) {


    this.list = function (data) {

        return listSettlements(data, RaveBase);

    }
    this.fetch = function (data) {

        return fetchSettlements(data, RaveBase);

    }




}
module.exports = settlements;



// FLWPUBK_TEST-78a5e10dbafab98baae2218b624d6f6c-X

// FLWSECK_TEST-1f971b4589936d0cb0210ec52f2617f7-X