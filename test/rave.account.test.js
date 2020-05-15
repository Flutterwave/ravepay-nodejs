var account = require('../lib/rave.account');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv').config();


chai.use(chaiAsPromised);

let seckey = process.env.SECRET_KEY;
let pubkey = process.env.PUBLIC_KEY;
let prodflag = process.env.PRODUCTION_FLAG;


describe("#Rave Account charge test", function() {
    var chargeResp, validationResp;
    
    var ravebase = new base(pubkey, seckey, prodflag);
    var accountInstance = new account(ravebase);

    describe("#Rave Account charge leg test", function () {
        it("should return a 200 status response", function(done) {
            this.timeout(10000);
            var payload = {
                "accountnumber": "0690000031",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
            chargeResp=[];
            accountInstance.charge(payload).then(resp => {
                chargeResp = resp;
                if (resp.statusCode == 200) {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })

        it("should return a pending validation response", function(done) {
            this.timeout(10000);
            if (chargeResp.body.chargeResponseCode == 02) {
                done();
            }
                
        })

        it("should throw an error txRef is required", function(done) {
            this.timeout(10000);
            var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
            var accountInstance = new account(ravebase);
            var payload = {
                "accountnumber": "0690000031",
                "accountbank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "user@example.com",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
           var result = accountInstance.charge(payload).then(resp => {
               resp.body.data;
           })
            .catch(err => {
                return err.message;
            })
            expect(result).to.eventually.be.equal("txRef is required").notify(done);
        })
    })

    describe("#Rave account validation leg test", function() {
        
        it("should return a 200 status response", function(done) {
            this.timeout(10000);
            var payload2 = {
                "transactionreference": chargeResp.body.data.flwRef,
                "otp": "12345"
            }
            
            validationResp=[];
            accountInstance.validate(payload2).then(resp => {
                validationResp = resp;
                if (validationResp.statusCode == 200) {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })

        it("should return a chargeresponse of 00", function(done) {
            this.timeout(10000);
            if (validationResp.body.data.chargeResponseCode == 00) {
                done();
            } 
        })
    })
})