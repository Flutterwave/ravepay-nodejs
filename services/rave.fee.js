var morx = require('morx');
var q = require('q');
const axios = require('axios');
var spec =  morx.spec() 
				.build('amount', 'required:true, eg:10') 
				.build('card6', 'required:false, eg:512356') 
				.build('ptype', 'required:false, eg:visa')
				.build('currency', 'required:false, eg:NGN') 
				.end();

function service(data, _rave){
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "Rave Fee"
	   })


	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		params.currency = params.currency || "NGN";
		params.ptype = params.ptype || 1;


		return params;

	})
	.then( params  => {

		 
		params.PBFPubKey= _rave.getPublicKey();  
		params.method = "POST";
		return _rave.request('flwv3-pug/getpaidx/api/fee', params)
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