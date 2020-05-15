var morx = require('morx');
var q = require('q');
const axios = require('axios');


var spec =  morx.spec()
				.build('otp', 'required:true, eg:5590')
				.build('transaction_reference', 'required:false, eg:FLW-MOCK-17e915bec5a86f4b92b358ce6d72144e') 
				.end();

function service(data, _rave){
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "Card Validate"
	   })

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return params;

	})
	.then( params  => {

		params.PBFPubKey = _rave.getPublicKey();  
		return _rave.request('flwv3-pug/getpaidx/api/validatecharge', params)
	})
	.then( response => {

		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;
