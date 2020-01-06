var morx = require('morx');
var q = require('q');

var spec = morx.spec()
    
    .build('email', 'required:true, eg:ade_temi@icloud.com')
    .build('is_permanent', 'required:false, eg:true')
    .build('frequency', 'required:false, eg:4')
    .build('duration', 'required:false, eg:4')
    .build('narration', 'required:false, eg:transfer')
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
            return _rave.request('/v2/banktransfers/accountnumbers', params)
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

