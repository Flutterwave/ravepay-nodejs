require('dotenv').config({
    path: '../.env'
});

var subaccount = require('../lib/rave.subaccount');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');

chai.use(chaiAsPromised);

describe("#Rave Subaccount test", function() {
    // var createResp, fetchResp, listResp;
    var chargeResp, validationResp;
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var ravebase = new base(public_key, secret_key , false);
    var subaccountInstance = new subaccount(ravebase);
    describe("#Rave Subaccount create  test", function () {
        it("should return a success status response", async function () {
            this.timeout(10000);
            var payload = {
                "account_bank": "044",
                "account_number": "0690000031",
                "business_name": "Olufemi Oba",
                "business_email": "bafo@services.com",
                "business_contact": "Olu daniel",
                "business_contact_mobile": "090890382",
                "business_mobile": "09087930450",
              "country": "NG",
                "meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}],
                "seckey":secret_key 
              }
            var resp = await subaccountInstance.create(payload);
            return expect(resp.body).to.be.ok
                
           
        })
    })
})
