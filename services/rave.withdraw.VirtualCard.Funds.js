var morx = require('morx');
var q = require('q');
var spec = morx.spec()

    .build('card_id', 'required:true, eg:c7623008-c2d1-41ba-b5d7-3835fd76254b')
    .build('amount', 'required:true, eg:10')
    .end();

function service(data, _rave) {

    var d = q.defer();

    q.fcall(() => {

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            var params = validated.params;


            return params;


        })
        .then(params => {



            params.secret_key = _rave.getSecretKey();
            params.method = "POST";
            return _rave.request('/v2/services/virtualcards/withdraw', params)
        })
        .then(response => {

            // console.log(response);
            d.resolve(response.body);

        })
        .catch(err => {

            d.reject(err);

        })

    return d.promise;
    //225d0d99-df1f-4b21-af62-f049ad24f938


}
service.morxspc = spec;
module.exports = service;

