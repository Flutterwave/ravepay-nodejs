var morx = require('morx');
var q = require('q');

var spec = morx.spec()
    
    .build('txref', 'required:true, eg:FLW001286941')
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



            params.SECKEY = _rave.getSecretKey();
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


