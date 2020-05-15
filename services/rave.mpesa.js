var morx = require('morx');
var q = require('q');
var charge = require('./rave.charge');
const axios = require('axios');


var spec = morx.spec()
    .build('currency', 'required:false, eg:KES')
    .build('country', 'required:true, eg:KE')
    .build('amount', 'required:true, eg:50')
    .build('phonenumber', 'required:true, eg:054709929220')
    .build('email', 'required:true, eg:iyke@gmail.com')
    .build('firstname', 'required:false, eg:Ikedieze')
    .build('lastname', 'required:false, eg:Emmannuel')
    .build('IP', 'required:false, eg:355426087298442')
    .build('narration', 'required:false, eg:funds payment')
    .build('txRef', 'required:true, eg:443342')
    .build('meta', 'required:false, eg:[{metaname: "extra info", metavalue: "a pie"}]')
    .build('device_fingerprint', 'required:false,eg:12233')
    .build('payment_type', 'required:false, eg:mpesa')
    .build('is_mpesa', 'required:true, eg:"1"')
    .build('is_mpesa_lipa', 'required:true, eg:1')
    .end();

function service(data, _rave) {
    axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "Mobile Money; Mpesa"
	   })

    var d = q.defer();
    q.fcall(() => {

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            var params = validated.params;

            params.payment_type = "mpesa";
            params.country = params.country || "KE";

            return charge(params, _rave);

        })
        .then(resp => {

            d.resolve(resp.body);

        })
        .catch(err => {

            d.reject(err);

        });

    return d.promise;

}
service.morxspc = spec;
module.exports = service;

