const chargeUSSD=require('../services/rave.ussd.charge')

function USSD(RaveBase){


	this.charge = function (data) {

		return chargeUSSD(data, RaveBase);

	}

	


}
module.exports = USSD;