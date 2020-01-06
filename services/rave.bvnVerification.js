var morx = require('morx');

var q = require('q');




var spec = morx.spec()

    .build('bvn', 'required:false, eg:12345678901')
    .end();

function service(data, _rave) {

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
            d.resolve(response);


        })
        .catch(err => {

            d.reject(err);

        })

    return d.promise;



}
service.morxspc = spec;
module.exports = service;

