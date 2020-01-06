var transfer = require('../lib/rave.transfer');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');
require('dotenv').config({ path: '../.env' });


chai.use(chaiAsPromised);

describe("#Rave Transfer test", function() {
    var transferResp;
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;

    // console.log(public_key)

    var ravebase = new base(public_key, secret_key, production_flag);

    var transferInstance = new transfer(ravebase);
    // console.log(transferInstance);

    describe("#Rave initiate Transfer leg test", function () {

        it("should return a status success response",async function() {
            this.timeout(10000);
            
            var payload = {
                "account_number": "0690000031",
                "account_bank": "044",
                "currency": "NGN",
                "country": "NG",
                "amount": "100",
                "email": "e.ikedieze@gmail.com",
                "phonenumber": "08030930236",
                "firstname": "ikedieze",
                "lastname": "ndukwe",
                "IP": "355426087298442",
                "txRef": "MC-67737-YU",
                "secKey": secret_key,
                "reference": "mk-6u54i-jk"
            }
            transferResp=[];
            transferInstance.initiate(payload).then(resp => {
                // console.log("Initiate transfer", resp.body)
                transferResp = resp;
                if (resp.statusCode == 200) {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })
    });

    describe("#Rave bulk transfer test", function () {
        it("should return status: BULK-TRANSFER-CREATED", function(done) {
            this.timeout(10000);
            var payload = {
                "seckey":"",
                "title":"May Staff Salary",
                "bulk_data":[
                    {
                      "Bank":"044",
                      "Account Number": "0690000032",
                      "Amount":300,
                      "Currency":"NGN",
                      "Narration":"Bulk transfer 1",
                      "reference": "mk-82973029-uy"
                  },
                  {
                      "Bank":"044",
                      "Account Number": "0690000034",
                      "Amount":200,
                      "Currency":"NGN",
                      "Narration":"Bulk transfer 2",
                      "reference": "mk-2838747yu50"
                  }
                ]
              }
            transferResp=[];
            transferInstance.bulk(payload).then(resp => {
                // console.log("Bulk transfers", resp.body)
                transferResp = resp;
                if (resp.statusCode == 200) {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })
    });

    // describe("#Rave, Fetch a single Transfer", function () {
    //     it("should return success, QUERIED-TRANSFERS", function(done) {
    //         this.timeout(10000);
            
    //         transferResp=[];
    //         transferInstance.fetch(ravebase).then(resp => {
    //             console.log("Fetch transfer", resp.body)
    //             transferResp = resp;
    //             if (resp.statusCode == 200) {
    //                 done();
    //             }
                
    //         }).catch(err => {
    //             done(err);
    //         })
    //     })
    // });

    // describe("#Rave, List Transfers", function () {
    //     it("should return success, QUERIED-TRANSFERS", function(done) {
    //         this.timeout(10000);
    //         var payload = {
    //             "secKey": "",
    //         }
    //         transferResp=[];
    //         transferInstance.list(ravebase).then(resp => {
    //             console.log("List transfers", resp.body)
    //             transferResp = resp;
    //             if (resp.statusCode == 200) {
    //                 done();
    //             }
                
    //         }).catch(err => {
    //             done(err);
    //         })
    //     })
    // });

    describe("#Get your balance for transfers", function () {
        it("should return: success, WALLET-BALANCE", function(done) {
            this.timeout(10000);
            var payload = {
                "currency": "NGN",
            }
            transferResp=[];
            transferInstance.getApplicableFee(ravebase).then(resp => {
                // console.log("Get transfer balance", resp.body)
                transferResp = resp;
                if (resp.statusCode == 200) {
                    done();
                }
                
            }).catch(err => {
                done(err);
            })
        })
    });
})


