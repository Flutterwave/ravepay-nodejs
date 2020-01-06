
var verifyTransaction  = require('../services/rave.verify.transaction'); 


function raveVerifyTransaction(RaveBase){


	this.verify = function (data) {

		return verifyTransaction(data, RaveBase)
		 
	}

	

}
module.exports = raveVerifyTransaction;