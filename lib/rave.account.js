
var chargeAccount = require('../services/rave.account.charge');
var validateCharge = require('../services/rave.account.validate');
var verifyAccount = require('../services/rave.transfer.accountVerification')
function Account(RaveBase){


	this.charge = function (data) {

		return chargeAccount(data, RaveBase);

	}

	this.validate = function (data) {

		return validateCharge(data, RaveBase);

	}


}
module.exports = Account;