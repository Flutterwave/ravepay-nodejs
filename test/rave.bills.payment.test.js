require('dotenv').config({
    path: '../.env'
});

var bills_payment = require('../lib/rave.bills.payment');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var should = require('chai').should()
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Bills Payment Test", function () {

   
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var billsInstance = new bills_payment(ravebase);

 

        describe("#Rave fly_buy test", function () {
            it("should return service response ", async function () {
                this.timeout(10000);
                var payload = {
                    "secret_key": secret_key,
                    "service": "fly_buy",
                    "service_method": "post",
                    "service_version": "v1",
                    "service_channel": "rave",
                    "service_payload": {
                      "Country": "NG",
                      "CustomerId": "+23490803840303",
                      "Reference": "9300049444",
                      "Amount": 500,
                      "RecurringType": 0,
                      "IsAirtime": true,
                      "BillerName": "AIRTIME"
                    }
                  }
                var resp = await billsInstance.bills(payload);


               return expect(resp.body).to.have.property('message', 'SERVICE-RESPONSE')
            });
        });


        describe("#Rave fly_bulk test", function () {
            it("should return data ", async function () {
                this.timeout(10000);
                var payload = {
                    "secret_key": secret_key,
                    "service": "fly_buy_bulk",
                    "service_method": "post",
                    "service_version": "v1",
                    "service_channel": "rave",
                    "service_payload": {
                      "BatchReference": "batch-rave-1509233448302799933922",
                      "CallBackUrl": "https://rave-webhook.herokuapp.com/newregistration",
                      "Requests": [
                        {
                          "Country": "NG",
                          "CustomerId": "+23490803840303",
                          "Amount": 500,
                          "RecurringType": 0,
                          "IsAirtime": true,
                          "BillerName": "AIRTIME",
                          "Reference": "9300049404444"
                        },
                        {
                          "Country": "GH",
                          "CustomerId": "+233276081163",
                          "Amount": 10,
                          "RecurringType": 0,
                          "IsAirtime": true,
                          "BillerName": "AIRTIME",
                          "Reference": "9300049405555"
                        },
                        {
                          "Country": "US",
                          "CustomerId": "+190830030",
                          "Amount": 20,
                          "RecurringType": 0,
                          "IsAirtime": true,
                          "BillerName": "AIRTIME",
                          "Reference": "9300049406666"
                        }
                      ]
                    }
                  }
                var resp = await billsInstance.bills(payload);


               return expect(resp.body).to.have.property('data')
            });
        });
    });


    