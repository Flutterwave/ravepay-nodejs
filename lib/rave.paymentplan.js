var listPlan = require('../services/rave.paymentPlan.list');
var fetchPlan = require('../services/rave.paymentPlan.fetch');
var cancelPlan = require('../services/rave.paymentPlan.cancel');
var editPlan = require('../services/rave.paymentPlan.edit');
var createPlan=require('../services/rave.paymentplan.create')

function Paymentplan(RaveBase){

    this.create = function (data) {

		return createPlan(data, RaveBase);
	}

	this.list = function (data) {

		return listPlan(data, RaveBase);
	}

	this.fetch = function (data) {

		return fetchPlan(data, RaveBase);

    }
    
    this.cancel = function (data) {

        return cancelPlan(data, RaveBase)
    }

    this.edit = function (data) {

        return editPlan(data, RaveBase)
    }


}
module.exports = Paymentplan;