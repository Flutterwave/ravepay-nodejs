var morx = require('morx');
var charge = require('./rave.charge');
var q = require('q');
const package = require('../package.json');
const axios = require('axios');

var spec =  morx.spec()
                .build('account_bank', 'required:true, eg:044')
				.build('account_number', 'required:true,validators:isNumeric, eg:06900021')
                .build('business_name', 'required:true, eg:JK Services')
                .build('business_email', 'required:true, eg:e.ikedieze@gmail.com')
                .build('business_contact', 'required:true, eg:Ikedieze Ndukwe')
                .build('business_contact_mobile', 'required:true, eg:08174111222')
				.build('business_mobile', 'required:false,eg:08030930236')
				.build('split_value', 'required:false, eg:0.98')
				.build('split_type', 'required:false, eg:percentage')
				.build('meta', 'required:required,eg:[{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}]')
				.build('country', 'required:false')
                .end();
                

function service(data, _rave){
	axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
         "publicKey": _rave.getPublicKey(),
         "language": "NodeJs v2",
         "version": package.version,
         "title": "Incoming call",
             "message": "Create Subaccount"
       })

	var d = q.defer();
	q.fcall( () => {

		var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
		var params = validated.params;
        // console.log(params)
        // params.country = params.country || "NG";
        _rave.params = params
		return  (_rave);

    })
    .then((_rave) => {
		_rave.params.seckey = _rave.getSecretKey();  
		return _rave.request('v2/gpx/subaccounts/create', _rave.params)
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

