var morx = require('morx');
var q = require('q');
const axios = require('axios');



var spec = morx.spec()
    .build('seckey', 'required:false, eg:FLWSECK_TEST-9e54889bc262062ffg6654a96152ce4f477f9-X')
    .build('from', 'required:false, eg:2019:01:01')
    .build('to', 'required:false, eg:2019:01:01')
    .build('page', 'required:false, eg:20')
    .end();

function service(data, _rave) {
    axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "List Transactions"
	   })

    var d = q.defer();

    q.fcall(() => {

            var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
            var params = validated.params;


            return params;


        })
        .then(params => {

            // console.log(params)



            params.secret_key = _rave.getSecretKey();
            params.method = "POST";
            return _rave.request('v2/gpx/transactions/query', params)
        })
        .then(response => {

            // console.log(response);
            d.resolve(response.body);

        })
        .catch(err => {

            d.reject(err);

        })

    return d.promise;



}
service.morxspc = spec;
module.exports = service;


