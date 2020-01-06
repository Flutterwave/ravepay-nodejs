require('dotenv').config({
    path: '../.env'
});

var virtualcards = require('../lib/rave.virtualcards');
var base = require('../lib/rave.base');
var Promise = require('bluebird');
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect;
var chaiAsPromised = require('chai-as-promised');



chai.use(chaiAsPromised);

describe("#Rave Virtual Card Test", function () {

    var virtualcardResp;
    var public_key = process.env.PUBLIC_KEY;
    var secret_key = process.env.SECRET_KEY;
    var production_flag = process.env.PRODUCTION_FLAG;

    var ravebase = new base(process.env.PUBLIC_KEY, process.env.SECRET_KEY, process.env.PRODUCTION_FLAG);
    var virtualcardInstance = new virtualcards(ravebase);

    describe("#Rave create virtual card test", function () {
        it("should return 'card created sucecessfully ' message ", function (done) {
            this.timeout(10000);
            var payload = {
                "secret_key": secret_key ,
                "currency": "USD",
                "amount": "10",
                "billing_name": "Mohammed Lawal",
                "billing_address": "DREAM BOULEVARD",
                "billing_city": "ADYEN",
                "billing_state": "NEW LANGE",
                "billing_postal_code": "293094",
                "billing_country": "US",
                "callback_url": "https://your-callback-url.com/"
            }

            var result = virtualcardInstance.create(payload).then(resp => {
                return resp.body;
            });

            expect(result).to.eventually.have.property('message', 'Card created successfully').notify(done)
        });

        describe("#Rave List virtual card test", function () {
            it("should return 'pass if the request was successful ", async function () {
                this.timeout(10000);
                var payload = {
                    "secret_key": secret_key ,
                    "page": 1
                }

                var resp = await virtualcardInstance.list(payload)
                    
                

                return expect(resp.body).to.be.ok
            });




        });
        describe("#Rave Get virtual card test", function () {
            it("should return ID:xxxxxxxx", function (done) {
                this.timeout(10000);
                var payload = {
                    "secret_key": secret_key ,
                    "id": "2da2cfa5-738c-407b-af74-f1a292ff8f45"
                }

                var result = virtualcardInstance.get(payload).then(resp => {
                    return resp.body.data;
                });

                expect(result).to.eventually.have.deep.property('id', '2da2cfa5-738c-407b-af74-f1a292ff8f45').notify(done)
            });




        });
        describe("#Rave Terminate virtual card test", function () {
            it("should return Card terminated successfully Message", function (done) {
                this.timeout(10000);
                var payload = {
                    "secret_key": secret_key ,
                    "id": "abf55ab5-0ef9-4d14-8522-2a29f57ce3b2"
                }

                var result = virtualcardInstance.terminate(payload).then(resp => {
                    return resp.body;
                });

                expect(result).to.eventually.have.property('Message', 'Unable to retrieve the requested card.').notify(done)
            });

        });

        describe("#Rave Fund virtual card test", function () {
            it("should return 'message: Card was funded successfully", function (done) {
                this.timeout(10000);
                var payload = {
                    "secret_key": secret_key ,
                    "id": "a1143fdb-054b-404e-b1e1-1e07e8cd2a1a",
                    "amount": "20",
                    "debit_currency": "USD"
                }

                var result = virtualcardInstance.fund(payload).then(resp => {
                    return resp.body;
                });

                expect(result).to.eventually.have.property('Message', 'Card was funded successfully').notify(done)
            });

        });

        
        describe("#Rave Withdraw from a virtual card test", function () {
            it("should return 'Message: Withdrawal successful'", function (done) {
                this.timeout(10000);
                var payload = {
                    "secret_key": secret_key,
                    "amount": "9",
                    "card_id": "a1143fdb-054b-404e-b1e1-1e07e8cd2a1a"
                }

                var result = virtualcardInstance.withdraw(payload).then(resp => {
                    return resp.body;
                });

                expect(result).to.eventually.have.property('Message', 'Withdrawal successful').notify(done)
            });

        });
    });
      
});