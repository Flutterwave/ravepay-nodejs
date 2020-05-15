
var virtualAccountNumber  = require('../services/rave.virtualAccount'); 


function virtualAccount(RaveBase){


	this.accountNumber = function (data) {

		return virtualAccountNumber(data, RaveBase)
		 
	}

	

}
module.exports = virtualAccount;