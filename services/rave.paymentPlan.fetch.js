var morx = require('morx');
var q = require('q');

//This allows you fetch a plan

var spec =  morx.spec()
				.build('__n', 'required:false, eg:NGN')  
				.end();

function service(_rave, plan_id){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(spec, _rave.MORX_DEFAULT);
        var params = validated.params;
        _rave.params = params
        return _rave

	})
	.then( _rave  => {
		 
        _rave.params.seckey = _rave.getSecretKey();
		_rave.params.method = "GET";
		var uri = 'v2/gpx/paymentplans/query?seckey=' +_rave.getSecretKey() + '&id='+plan_id
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

