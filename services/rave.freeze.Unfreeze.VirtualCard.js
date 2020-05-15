var morx = require('morx');
var q = require('q');
const axios = require('axios');


var spec = morx.spec()

    .build('card_id', 'required:true, eg:c7623008-c2d1-41ba-b5d7-3835fd76254b')
    .build('status_action', 'required:true, eg:block')
    .end();

function service(data, _rave) {
    axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "Freeze/Unfreeze Virtual Card"
	   })

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
            
            return _rave.request('/v2/services/virtualcards/'+card_id+'/status/'+status_action, params)
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

