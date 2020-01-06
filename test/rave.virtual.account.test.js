require('dotenv').config({
    path: '../.env'
});

var accountNumber  = require('../lib/rave.virtualAccountNumber');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Virtual Accoount Test", function () {

   
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var accountNumberInstance = new accountNumber (ravebase);

 

        describe("#Rave Create Virtual Account Number test", function () {
            it("should return 'BANKTRANSFERS-ACCOUNTNUMBER-CREATED' message ",async function () {
                this.timeout(20000);
                var payload = {
                    "email": "user@example.com",
                    "seckey": secret_key,
                    "is_permanent": true,
                    "narration":"New account test"

                }
                var resp = await accountNumberInstance.accountNumber(payload);


               return expect(resp.body).to.have.property('message', 'BANKTRANSFERS-ACCOUNTNUMBER-CREATED')
            });
        });
    });


    