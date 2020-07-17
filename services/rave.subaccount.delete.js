var morx = require('morx');
var charge = require('./rave.charge');
var q = require('q');

var spec =  morx.spec()
                .build('id', 'required:true')
                .end();
                

function service(data, _rave){

	var d = q.defer();
	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;


            return params;
    })
    .then((params) => {
		params.seckey = _rave.getSecretKey();  
		return _rave.request('v2/gpx/subaccounts/delete', params)
	})
	.then( resp => {

		d.resolve(resp.body);

	})
	.catch( err => {

		d.reject(err);

	});

	return d.promise;

}
service.morxspc = spec;
module.exports = service;

