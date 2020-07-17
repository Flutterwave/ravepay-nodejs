var morx = require('morx');
var charge = require('./rave.charge');
var q = require('q');

var spec =  morx.spec()
                .build('id', 'required:true')
				.build('account_number', 'required:false')
                .build('business_name', 'required:false')
                .build('business_email', 'required:false')
                .build('account_bank', 'required:false')
                .build('split_type', 'required:false')
				.build('split_value', 'required:false')
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
		return _rave.request('v2/gpx/subaccounts/edit', params)
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

