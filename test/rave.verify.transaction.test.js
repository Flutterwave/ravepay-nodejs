require('dotenv').config({
    path: '../.env'
});

var verifytransaction  = require('../lib/rave.verify.transaction');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Verify Transaction Test", function () {

   
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var verifyInstance = new verifytransaction(ravebase);

 

        describe("#Rave Verify Transaction test", function () {
            it("should return transaction status message ", async function () {
                this.timeout(10000);
                var payload = {
                    "txref": "FLW001286941",
                    "SECKEY": secret_key,
                   

                }
                var resp = await verifyInstance.verify(payload);


               return expect(resp.body).to.have.property('message', 'Transaction not found')
            });
        });
    });


    