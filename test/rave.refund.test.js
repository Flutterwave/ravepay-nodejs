require('dotenv').config({
    path: '../.env'
});

var refund  = require('../lib/rave.refund');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Refund Test", function () {

   
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var refundInstance = new refund(ravebase);

 

        describe("#Rave refund test", function () {
            it("should return status message ",async function () {
                this.timeout(10000);
                var payload = {
                    "ref": "FLW001286941",
                    "seckey": secret_key
                  
                }
                var resp = await refundInstance.refund(payload);


               return expect(resp.body).to.have.property('status', 'fail')
            });
        });
    });


    