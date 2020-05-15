var morx = require('morx');

var q = require('q');
const axios = require('axios');



var spec = morx.spec()

    .build('bvn', 'required:false, eg:12345678901')
    .end();

function service(data, _rave) {
    axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs",
         "version": "1.0",
         "title": "Incoming call",
             "message": "Bank Verification"
       })

    var d = q.defer();

    q.fcall(() => {
            // console.log("hellooo", data);

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            // console.log(validated)
            var params = {}
            var params = validated.params;

            return params;


        })
        .then(params => {



            params.seckey = _rave.getSecretKey();
            params.method = "GET"

            // console.log("pramssssss", params);
            var BVN = params.bvn;
            delete params.bvn;
            // console.log("pramssssss delete", params);

            return _rave.request(`v2/kyc/bvn/${BVN}`, params)
        })
        .then(response => {

            // console.log(response);
            d.resolve(response.body);


        })
        .catch(err => {

            d.reject(err);

        })

    return d.promise;



}
service.morxspc = spec;
module.exports = service;

