var base = require("./lib/rave.base");
var card = require("./lib/rave.card");
var account = require("./lib/rave.account");
var token = require("./lib/rave.token");
var status = require("./lib/rave.status");
var mobile = require("./lib/rave.mobile");
var misc = require("./lib/rave.misc");
var preauth = require("./lib/rave.cardpreauth");
var security = require("./lib/security");
var custom = require("./lib/rave.custom");
var transfer = require("./lib/rave.transfer");
var subaccount = require("./lib/rave.subaccount");
var subscription = require("./lib/rave.subscription");
var paymentplan = require("./lib/rave.paymentplan");
var mobileMoney = require("./lib/rave.mobilemoney");
var virtualcards = require("./lib/rave.virtualcards");
var bvn = require("./lib/rave.bvn");
var virtualAccount = require("./lib/rave.virtualAccountNumber");
var refund = require("./lib/rave.refund");
var verifyTransaction = require("./lib/rave.verify.transaction");
var billsPayment = require("./lib/rave.bills.payment");
var settlement = require("./lib/rave.settlements");
var ussd=require("./lib/rave.ussd");
var ebills=require("./lib/rave.Ebills");

var Rave = function(public_key, public_secret, base_url_or_production_flag) {
  var ravebase = new base(
    public_key,
    public_secret,
    base_url_or_production_flag
  );

  this.Card = new card(ravebase);
  this.Status = new status(ravebase);
  this.Account = new account(ravebase);
  this.TokenCharge = new token(ravebase);
  this.MobileOptions = new mobile(ravebase);
  this.Misc = new misc(ravebase);
  this.Preauth = new preauth(ravebase);
  this.security = security;
  this.CustomRequest = new custom(ravebase);
  this.Transfer = new transfer(ravebase);
  this.Subaccount = new subaccount(ravebase);
  this.Subscription = new subscription(ravebase);
  this.Paymentplan = new paymentplan(ravebase);
  this.MobileMoney = new mobileMoney(ravebase);
  this.VirtualCards = new virtualcards(ravebase);
  this.Bvn = new bvn(ravebase);
  this.VirtualAccount = new virtualAccount(ravebase);
  this.Refund = new refund(ravebase);
  this.VerifyTransaction = new verifyTransaction(ravebase);
  this.BillsPayment = new billsPayment(ravebase);
  this.Settlement = new settlement(ravebase);
  this.USSD = new ussd(ravebase);
  this.Ebills = new ebills(ravebase);
  
  this.getIntegrityHash = function(data) {
    return ravebase.getIntegrityHash(data);
  };
};

module.exports = Rave;
