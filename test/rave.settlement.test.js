require('dotenv').config({
    path: '../.env'
});

var settlements = require('../lib/rave.settlements');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Settlement Test", function () {

   
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;
    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var settlementInstance = new settlements(ravebase);

 

        describe("#Rave List Settlement test", function () {
            it("should return Status message ",async function () {
                this.timeout(10000);
                var payload = {
                    "seckey":secret_key,
                    "from": "2018:01:21",
                    "to": "2019:12:21",
                    "page": "20",
                    "subaccountid":"RS_C3FCBECF928B4B33B9C3BC74A357A9E5"
                    
                }
                var resp = await settlementInstance.list(payload);


               return expect(resp.body).to.be.a('string')
            });
        });

        describe("#Rave Fetch Settlement test", function () {
            it("should return 'request' message ",async function () {
                this.timeout(10000);
                var payload = {
                    "seckey":secret_key,
                    "from": "2018:01:21",
                    "to": "2019:12:21",
                    "id": "233940" 
                }
                var resp = await settlementInstance.fetch(payload);


                return expect(resp.body).to.be.a('string')
            });
        });
    });



//     PUBLIC_KEY=FLWPUBK_TEST-78a5e10dbafab98baae2218b624d6f6c-X
// SECRET_KEY=FLWSECK_TEST-1f971b4589936d0cb0210ec52f2617f7-X


