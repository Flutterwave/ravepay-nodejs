var morx = require('morx');
var q = require('q');
const axios = require('axios');

//This allows to cancel a plan

var spec =  morx.spec()
				.build('__n', 'required:false, eg:NGN')  
				.end();

function service(_rave, plan_id){
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "Payment Plan; Cancel"
	   })

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(spec, _rave.MORX_DEFAULT);
        var params = validated.params;
        _rave.params = params
        return _rave

	})
	.then( _rave  => {
		 
        _rave.params.seckey = _rave.getSecretKey();
		var uri = 'v2/gpx/paymentplans/'+plan_id+'/cancel'
        return _rave.request(uri, _rave.params)
        
	})
	.then( response => {

		// console.log(response);
		d.resolve(response);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;

}
service.morxspc = spec;
module.exports = service;

