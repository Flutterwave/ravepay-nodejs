require('dotenv').config({
    path: '../.env'
});

var bvn  = require('../lib/rave.bvn');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Bvn Verification Test", function () {

   
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var bvnInstance = new bvn (ravebase);

 

        describe("#Rave BVN Verification test", function () {
            it("should pass if target is truthy message ",async function () {
                this.timeout(10000);
                var payload = {
  
                    "bvn":"12345678901"
                                       
                }
                var resp = await bvnInstance.verification(payload);


               return expect(resp.body).to.be.ok
            });

    
        });
    });


    