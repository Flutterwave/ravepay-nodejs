var morx = require("morx");
var q = require("q");
const axios = require('axios');


var spec = morx
  .spec()
  .build("service", "required:true, eg:fly_buy")
  .build("service_method", "required:true, eg:get")
  .build("service_version", "required:true, eg:v1")
  .build("service_channel", "required:true, eg:transactions")
  .build("service_channel_group", "required:true, eg:merchants")
  .build("service_payload", 'required:false, eg:{"Country": "NG"}')
  .end();

function service(data, _rave) {
    axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
		 "publicKey": _rave.getPublicKey(),
		 "language": "NodeJs",
		 "version": "1.0",
		 "title": "Incoming call",
		     "message": "Check Card Bin"
	   })
  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = {}
            var params = validated.params;

            return params;
  })
    .then(params => {
     

      params.secret_key = _rave.getPublicKey();
      params.method = "GET"
      return _rave.request('i/v1/extras/bin_check', params);
   
    })
    .then(response => {
   
      d.resolve(response);
    })
    .catch(err => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
