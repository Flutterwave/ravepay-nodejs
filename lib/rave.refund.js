
var Refund = require('../services/rave.refund'); 

function RaveRefund(RaveBase){


	this.refund= function (data) {

		return Refund(data, RaveBase)
		 
	}



}
module.exports = RaveRefund;