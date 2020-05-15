var morx = require('morx');
var q = require('q');




//This allows you fetch all transfers

var spec = morx.spec()
	
.build('amount', 'required:true, eg:1000')
.build('name', 'required:true, eg:School fees')
.build('interval', 'required:true, eg:daily')
.build('duration', 'required:true, eg:School 5')
.end();


function service(data,_rave) {

	var d = q.defer();

	q.fcall(() => {

			var validated = morx.validate(data,spec, _rave.MORX_DEFAULT);
			var params = validated.params;
			
			return params

		})
		.then(params => {

			params.seckey = _rave.getSecretKey();
		params.method = "POST";
			return _rave.request('v2/gpx/paymentplans/create', params)

		})
		.then(response => {

		
			d.resolve(response);

		})
		.catch(err => {

			d.reject(err);

		})

	return d.promise;



}
service.morxspc = spec;
module.exports = service;

