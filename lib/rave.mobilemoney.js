var mpesa = require('../services/rave.mpesa')
var ghanaMobileMoney = require('../services/rave.Ghana.mobile.money')
var zambiaMobileMoney = require('../services/rave.zambia.mobile.money')
var rwandaMobileMoney = require('../services/rave.zambia.mobile.money')
var francophoneMobileMoney = require('../services/rave.francophone.mobile.money')
var uganda = require('../services/rave.ugh.mobile.money')

function MobileMoney(RaveBase) {


    this.mpesa = function (data) {

        return mpesa(data, RaveBase);

    }
    this.ghana = function (data) {

        return ghanaMobileMoney(data, RaveBase);

    }
    this.zambia = function (data) {

        return zambiaMobileMoney(data, RaveBase);
    }
    this.rwanda = function (data) {

        return rwandaMobileMoney(data, RaveBase);
    }
    this.francophone = function (data) {

        return francophoneMobileMoney(data, RaveBase);
    }
    this.uganda = function (data) {

        return uganda(data, RaveBase);
    }




}
module.exports = MobileMoney;