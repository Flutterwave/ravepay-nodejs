var morx = require('morx');
var q = require('q');
const axios = require('axios');

var spec =  morx.spec() 
				.build('bank_code', 'required:true, eg:044') 
				.build('account_number', 'required:true, eg:0017704603') 
				.build('currency', 'required:true, eg:NGN') 
				.build('amount', 'required:true, eg:100')  
				.end();

function service(data, _rave){
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "Disburse"
	   })

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return params;

	})
	.then( params  => {

		 
		params.seckey = _rave.getSecretKey();  
		return _rave.request('merchant/disburse', params)
	})
	.then( response => {

		//console.log(response);
		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;