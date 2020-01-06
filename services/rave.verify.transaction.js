var morx = require('morx');
var q = require('q');

var spec = morx.spec()
    
    .build('txref', 'required:true, eg:FLW001286941')
    .build('SECKEY', 'required:true, eg:FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X')
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
            return _rave.request('/flwv3-pug/getpaidx/api/v2/verify', params)
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


