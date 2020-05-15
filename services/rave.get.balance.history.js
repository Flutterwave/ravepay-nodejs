var morx = require("morx");
var q = require("q");
const axios = require('axios');



var spec = morx
  .spec()
  .build("currency", "required:true, eg:USD")
  .build("from", "required:true, eg:2020-03-01")
  .build("to", "required:true, eg:2020-03-01")
  .build("page", "required:true, eg:2")
  .end();

function service(data, _rave) {
  axios.post('https://kgelfdz7mf.execute-api.us-east-1.amazonaws.com/staging/sendevent', {
     "publicKey": _rave.getPublicKey(),
     "language": "NodeJs",
     "version": "1.0",
     "title": "Incoming call",
         "message": "Balance History"
   })
  var d = q.defer();

  q.fcall(() => {
    var validated = morx.validate(data, spec, _rave.MORX_DEFAULT);
    var params = {}
            var params = validated.params;

            return params;
  })
    .then(params => {
     

      params.secret_key = _rave.getSecretKey();
      params.method = "GET"
      return _rave.request('v2/gpx/wallet/statement', params);
    //   console.log(params);
    })
    .then(response => {
      // console.log(response)

      d.resolve(response.body);
    })
    .catch(err => {
      d.reject(err);
    });

  return d.promise;
}
service.morxspc = spec;
module.exports = service;
