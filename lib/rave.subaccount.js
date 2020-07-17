var createSubaccount = require('../services/rave.subaccount.create');
var listSubaccount = require('../services/rave.subaccount.list');
var fetchSubaccount = require('../services/rave.subaccount.fetch')
var updateSubaccount = require('../services/rave.subaccount.update')
var deleteSubaccount = require('../services/rave.subaccount.delete')

function Subaccount(RaveBase){

	this.create = function (data) {

		return createSubaccount(data, RaveBase);

	}

	this.list = function (data) {

		return listSubaccount(data, RaveBase);

    }
    
    this.fetch = function (data) {
        return fetchSubaccount(data, RaveBase)
	}
	this.update = function (data) {
        return updateSubaccount(data, RaveBase)
	}
	this.delete = function (data) {
        return deleteSubaccount(data, RaveBase)
    }



}
module.exports = Subaccount;