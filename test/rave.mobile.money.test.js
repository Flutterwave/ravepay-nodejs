require('dotenv').config({
    path: '../.env'
});

var mobilemoney = require('../lib/rave.mobilemoney');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');


chai.use(chaiAsPromised);

describe("#Rave Mobile Money Test", function () {

    var virtualcardResp;
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;

    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var mobilemoneyInstance = new mobilemoney(ravebase);

    describe("#Rave Ghana Mobile Money test", function () {
        it("should return deep nested payment type", async function () {
            this.timeout(10000);
            var payload = {
                "PBFPubKey": public_key,
                "currency": "GHS",
                "payment_type": "mobilemoneygh",
                "country": "GH",
                "amount": "50",
                "email": "user@example.com",
                "phonenumber": "054709929220",
                "network": "MTN",
                "firstname": "temi",
                "lastname": "desola",
                "voucher": "128373", // only needed for Vodafone users.
                "IP": "355426087298442",
                "txRef": "MC-" + Date.now(),
                "orderRef": "MC_" + Date.now(),
                "is_mobile_money_gh": 1,
                "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }

            var resp = await mobilemoneyInstance.ghana(payload);

            // return .then(resp => {
            // return resp.body;
            return expect(resp.data).to.have.deep.property('paymentType', 'mobilemoneygh');

           

            // expect(result).to.eventually.have.deep.property('paymentType', 'mobilemoneygh').notify(done)
            // console.log(response)
        });


    });

    describe("#Rave Mpesa test", function () {
        it("should return deep nested payment type: 'Mpesa'", async function () {
            this.timeout(10000);
            var payload = {
                "PBFPubKey": public_key,
                "currency": "KES",
                "country": "KE",
                "amount": "100",
                "phonenumber": "0926420185",
                "email": "olufemi.obafunmiso@gmail.com",
                "firstname": "jsksk",
                "lastname": "ioeoe",
                "IP": "40.14.290",
                "narration": "funds payment",
                "txRef": "jw-222",
                "meta": [{
                    metaname: "extra info",
                    metavalue: "a pie"
                }],
                "device_fingerprint": "89191918hgdgdg99191", //(optional)
                "payment_type": "mpesa",
                "is_mpesa": "1",
                "is_mpesa_lipa": 1

            }

            var resp = await mobilemoneyInstance.mpesa(payload);


            return expect(resp.data).to.have.deep.property('paymentType', 'mpesa');


        });


    });

    describe("#Rave Uganda Mobile Money test", function () {
        it("should return deep nested payment type: 'mobilemoneyug'", async function () {
            this.timeout(10000);
            var payload = {
                "PBFPubKey": public_key,
                "currency": "UGX",
                "payment_type": "mobilemoneyuganda",
                "country": "NG",
                "amount": "50",
                "email": "user@example.com",
                "phonenumber": "054709929220",
                "network": "UGX",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-" + Date.now(),
                "orderRef": "MC_" + Date.now(),
                "is_mobile_money_ug": 1,
                "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }

            var resp = await mobilemoneyInstance.uganda(payload);


            return expect(resp.data).to.have.deep.property('paymentType', 'mobilemoneyug');


        });


    });

    describe("#Rave Zambia Mobile Money test", function () {
        it("should return deep nested payment type: 'mobilemoneyzm'", async function () {
            this.timeout(10000);
            var payload = {
	
                "PBFPubKey": public_key,
                "currency": "ZMW",
                "payment_type": "mobilemoneyzambia",
                "country": "NG",
                "amount": "50",
                "email": "user@example.com",
                "phonenumber": "054709929220",
                "network": "MTN",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-" + Date.now(),
                "orderRef": "MC_" + Date.now(),
                "is_mobile_money_ug": 1,
                "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
              
            }

            var resp = await mobilemoneyInstance.zambia(payload);


            return expect(resp.data).to.have.deep.property('paymentType', 'mobilemoneyzm');


        });


    });

    describe("#Rave Frnacophine Mobile Money test", function () {
        it("should return deep nested response code:02", async function () {
            this.timeout(10000);
            var payload = {
                "PBFPubKey": public_key,
                "currency": "XAF",
                "country":"NG",
                "payment_type":"mobilemoneyfranco",
                "amount": "500",
                "email": "user@example.com",
                "phonenumber": "054709929220",
                "firstname": "temi",
                "lastname": "desola",
                "IP": "355426087298442",
                "txRef": "MC-" + Date.now(),
                "orderRef": "MC_" + Date.now(),
                "is_mobile_money_franco": 1,
                "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
            }

            var resp = await mobilemoneyInstance.francophone(payload);
            



            return expect(resp.data).to.have.property('response_code', '02');
            


        });
       

    });

});