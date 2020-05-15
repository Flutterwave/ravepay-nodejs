var morx = require('morx');
var q = require('q');

var spec = morx.spec()

    // .build('secret_key', 'required:true, eg:USD')
    .build('id', 'required:true, eg:USD')

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
            return _rave.request('/v2/services/virtualcards/id/terminate', params)
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

