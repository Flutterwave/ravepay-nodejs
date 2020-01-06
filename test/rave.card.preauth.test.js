var preauth = require('../lib/rave.cardpreauth');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
var dotenv = require('dotenv');


chai.use(chaiAsPromised);


describe("#Rave Preauth service test", function(){

    var chargeResp, validationResp;
    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);

    describe("#rave preauthorise card test", function(){
        it("shouldgive  a 200 response status", function(done){
            var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
            var preauthInstance = new preauth(ravebase);
            this.timeout(10000);
            var payload = {
                "PBFPubKey": process.env.PUBLIC_KEY,
                "cardno": "5377283645077450",
                "charge_type": "preauth",
                "cvv": "789",
                "expirymonth": "09",
                "expiryyear": "19",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "e.ikedieze@gmail.com",
                "phonenumber": "08056552980",
                "firstname": "ikedieze",
                "lastname": "ndukwe",
                "IP": "40.198.14",
                "txRef": "MC-" + Date.now(),
                "redirect_url": "https://rave-web.herokuapp.com/receivepayment",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
            preauthInstance.preauth(payload).then(resp => {
                // console.log("preauth transaction: ", resp.body);

                if (resp.statusCode == 200) {
                    done();
                }
            }).catch( function(err) {
                // console.log(err.message.body);
                done(err);
            })
            //  expect(result).to.eventually.have.property('statusCode', '200').notify(done);
        })

        it("should return a an error message that property charge_type is required", function(done){
            this.timeout(10000);
            var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "cardno": "5377283645077450",
                "cvv": "789",
                "expirymonth": "09",
                "expiryyear": "19",
                "currency": "NGN",
                "pin": "3310",
                "country": "NG",
                "amount": "10",
                "email": "tester@flutter.co",
                "phonenumber": "08056552980",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-7663-YU",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }
            var result = preauthInstance.preauth(payload).catch(err => {
                return err.message;
            });
             expect(result).to.eventually.be.equal('charge_type is required').notify(done);
        })
    })

    describe("#rave void transaction test", function(){
        it("should return a void successful response", function(done){
            this.timeout(10000);
            var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29518",
                "action": "void",
                "SECKEY": process.env.SECRET_KEY
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body;
            });
             expect(result).to.eventually.have.deep.property('message', 'No PBTX transaction found').notify(done);
        })

        it("should return a success status in the data object from response.", function(done){
            this.timeout(10000);
            var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29518",
                "action": "void",
                "SECKEY":  process.env.SECRET_KEY
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body.data;
            });
             expect(result).to.eventually.have.property('status', 'success').notify(done);
        })
    })

    describe("#Rave refund transaction test", function(){
        it("should return a refund complete message", function(done){
            this.timeout(10000);
            var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29508",
                "action": "refund",
                "SECKEY":  process.env.SECRET_KEY
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body;
            });
             expect(result).to.eventually.have.deep.property('message', 'No PBTX transaction found').notify(done);
        })

        it("should return a success status in the data object from response.", function(done){
            this.timeout(10000);
            var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, "https://ravesandboxapi.flutterwave.com");
            var preauthInstance = new preauth(ravebase);
            var payload = {
                "id": "29508",
                "action": "refund",
                "SECKEY":  process.env.SECRET_KEY
            }
            var result = preauthInstance.void(payload).then(resp => {
                return resp.body.data;
            });
             expect(result).to.have.property('status').notify(done);
        })
    })
})
