
var bills_payment= require('../services/rave.bills.payment');

function BillsPayment(RaveBase){


	this.bills= function (data) {

		return bills_payment(data, RaveBase)
		 
	}



}
module.exports = BillsPayment;