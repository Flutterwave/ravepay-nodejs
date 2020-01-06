var morx = require('morx');
var charge = require('./rave.charge');
var q = require('q');


//This allows you send bulk transfers

var spec =  morx.spec()
                .build('bulk_data', 'required:true, eg:{ "Bank":"044","Account Number":"0690000032"},{"Bank":"044","Account Number":"0690000032"}')
                .end();


function service(data, _rave){

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
        return _rave.request('v2/gpx/transfers/create_bulk', _rave.params)
    })
    .then( resp => {

        d.resolve(resp);

    })
    .catch( err => {

        d.reject(err);

    });

    return d.promise;

}
service.morxspc = spec;
module.exports = service;

