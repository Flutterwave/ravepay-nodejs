var morx = require('morx');
var q = require('q');



var spec = morx.spec()

    .build('ref', 'required:true, eg:FLWACHMOCK-1527583529027')
    .build('amount', 'required:false, eg:100')
    .build('seckey', 'required:false, eg:FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X')

    .end();

function service(data, _rave) {

    var d = q.defer();

    q.fcall(() => {

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            var params = validated.params;


            return params;


        })
        .then(params => {

            // console.log(params)



            params.secret_key = _rave.getSecretKey();
            params.method = "POST";
            return _rave.request('/gpx/merchant/transactions/refund', params)
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