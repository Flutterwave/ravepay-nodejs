
var Ebills_order= require('../services/rave.create.ebills');
var Ebills_update=require('../services/rave.ebills.update')

function EbillsOrder(RaveBase){


	this.create= function (data) {

		return Ebills_order(data, RaveBase)
		 
    }
    
    this.update= function (data) {

		return Ebills_update(data, RaveBase)
		 
	}



}
module.exports = EbillsOrder;