var morx = require('morx');
var q = require('q');

var spec =  morx.spec()  
				.build('id', 'required:true')  
				.end();

function service(data,_rave){

	var d = q.defer();

	q.fcall( () => {

		var validated = morx.validate(data,spec, _rave.MORX_DEFAULT);
        var params = validated.params;


            return params;

	})
	.then( params  => {
		 
        params.seckey = _rave.getSecretKey(); 
        // console.log(_rave.params.seckey)
        params.method = "GET"; 
        var uri = 'v2/gpx/subaccounts/get/' + params.id
		return _rave.request(uri, params)
		
        
	})
	.then( response => {

		// console.log(response);
		d.resolve(response.body);

	})
	.catch( err => {

		d.reject(err);

	})

	return d.promise;
	
	

}
service.morxspc = spec;
module.exports = service;

