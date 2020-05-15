
var bvnVerification= require('../services/rave.bvnVerification');

function Bvn(RaveBase){


	this.verification = function (data) {

		return bvnVerification(data, RaveBase)
		 
	}



}
module.exports = Bvn;