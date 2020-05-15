var morx = require('morx');
var q = require('q');
var charge = require('./rave.charge');
const axios = require('axios');

var spec =  morx.spec()
				.build('cardno', 'required:true,validators:isNumeric, eg:5590131743294314')
				.build('currency', 'required:false, eg:NGN')
				.build('suggested_auth', 'required:false, eg:VBVSECURECODE') 
				.build('country', 'required:false, eg:NG')
				.build('settlement_token', 'required:false, eg:NG')
				.build('cvv', 'required:true, eg:544')   
				.build('amount', 'required:true, eg:10')
				.build('phonenumber', 'required:false, eg:08034789190')
				.build('billingzip', 'required:false, eg:10105') 
				.build('expiryyear', 'required:true, eg:21') 
				.build('expirymonth', 'required:true, eg:02')  
				.build('email', 'required:true, eg:debowalefaulkner@gmail.com')
				.build('firstname', 'required:false, eg:lawal')
				.build('lastname', 'required:false, eg:garuba')
				.build('IP', 'required:true, eg:127.0.0.1')
				.build('narration', 'required:false, eg:89938910') 
				.build('txRef', 'required:true, eg:443342') 
				.build('meta', 'required:false')
				.build('3DS_OVERRIDE', 'required:false') 
				.build('pin', 'required:false, eg:3321') 
				.build('bvn', 'required:false, eg:1234567890') 
				.build('redirect_url', 'required:false')
				.build('charge_type', 'required:false, eg:recurring-monthly')  
				.build('device_fingerprint', 'required:false,eg:12233')
				.build('recurring_stop', 'required:false')
				.build('include_integrity_hash', 'required:false,eg:2017050')
				.build('3DS_OVERRIDE', 'required:false') 
				.end();

function service(data, _rave){
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "Card Charge"
	   })

	var d = q.defer();
	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;

		return charge(params, _rave);

	})
	.then( resp => {

		d.resolve(resp);

	})
	.catch( err => {

		d.reject(err);

	});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;
