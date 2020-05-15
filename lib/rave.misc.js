
var fee   = require('../services/rave.fee'); 
var banks = require('../services/rave.banks');
var disburse = require('../services/rave.disburse');
var exchange_rates= require('../services/rave.exchange.rates');
var balance = require('../services/rave.balance');
var listTransaction = require('../services/rave.list.transactions');
var balanceHistory = require('../services/rave.get.balance.history')

function Misc(RaveBase){


	this.getFee = function (data) {

		return fee(data, RaveBase)
		 
	}
	this.getBalHist = function (data) {

		return balanceHistory(data, RaveBase)
		 
	}

	this.getBanks = function (){
		return banks(null, RaveBase);
	}


	this.disburse = function (data){
		return disburse(data, RaveBase);
	}
	this.getBalance = function (data){
		return balance(data, RaveBase);
	}
	this.exchange_rates = function (data){
		return exchange_rates(data, RaveBase);
	}
	this.list_transactions = function (data){
		return listTransaction  (data, RaveBase);
	}
	





}
module.exports = Misc;