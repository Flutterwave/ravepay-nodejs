# Ravepay Nodejs Library v1.0.0
[![npm version](https://img.shields.io/npm/v/ravepay)](https://www.npmjs.com/package/ravepay)
## Ravepay Services exposed by the library

- Card Charge
- Tokenized Charge
- Fees
- Banks
- Account Charge 
- Transfers
- Subaccount
- Subscription
- Payment Plan
- Card PreAuthorization

For more information on the services listed above, visit the [Ravepay website](http://rave.flutterwave.com/).

## How to use

`npm install ravepay`


 You can get your PUBLICK_KEY and SECRET_KEY from the Rave dashboard. 

 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.
 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.

 
```
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);
```

If you pass true as the value for PRODUCTION_FLAG, the library will use the production url as the base for all calls. Otherwise it will use the staging base url;

```
var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG); //Base url is 'https://ravesandboxapi.flutterwave.com'

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, true); //Base url is 'http://api.ravepay.co'

```

### Card Charge

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Card.charge(
    {
        "cardno": "5438898014560229",
        "cvv": "564",
        "expirymonth": "10",
        "expiryyear": "20",
        "currency": "NGN",
        "country": "NG",
        "amount": "10",
        "email": "user@gmail.com",
        "phonenumber": "0902620185",
        "firstname": "temi",
        "lastname": "desola",
        "IP": "355426087298442",
        "txRef": "MC-" + Date.now(),// your unique merchant reference
        "meta": [{metaname: "flightID", metavalue: "123949494DC"}],
        "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
        "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
      }
).then(resp => {
    // console.log(resp.body);

    rave.Card.validate({
        "transaction_reference":resp.body.data.flwRef,
        "otp":12345
    }).then(response => {
        console.log(response.body.data.tx);
        
    })
    
}).catch(err => {
    console.log(err);
    
})
```


### Tokenized Charge

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.TokenCharge.card({
   "currency":"NGN",
   "SECKEY":"FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X",
   "token":"flw-t0876849e016386b2d-k3n-mock",
   "country":"NG",
   "amount":1000,
   "email":"desola.ade1@gmail.com",
   "firstname":"temi",
   "lastname":"Oyekole",
   "IP":"190.233.222.1",
   "txRef":"MC-7666-YU"
}).then(resp => {
    console.log(resp.body);
}).catch(err => {
    console.log(err);
    
})
```


### Transfers
When a transfer is initiated, it comes with a status ```NEW``` this means the transfer has been queued for processing, and you would need to use the ```reference``` you passed to call the Fetch a Transfer endpoint to retrieve the updated status of the transfer.

**Available countries you can transfer to**

***Country	                Currency***

    NG (Nigeria)            NGN

    GH (Ghana)              GHS

    KE (Kenya)              KES

    UG (Ugandan)            UGX

    US (United States)      USD

    OT (Other countries)    GBP, EUR, AUD etc.

**Functions included:**

* ```.initiate```

* ```.bulk```

* ```.fetch```

* ```.list```

* ```.getApplicableFee```

* ```.getBalance```

<br>

### ```.initiate()```
This is called to start a transfer. The payload should contain the following card information:

* ```'account_bank', 'required:true, eg:044'```, 

* ```'account_number 'required:true,validators:isNumeric, eg:06900021'```, 

* ```'amount', 'required:true, eg:10'```, 

* ```'secKey', 'required:true,eg:FLWSECK-e6db11d1f8a6208de8cb2f94e293450e-X'```, 

* ```'narration', 'required:false,eg:New transfer'```, 

* ```'currency', 'required:required,eg:NGN'```, 

* ```'reference', 'required:required,eg:mk-902837-jk'```, 


```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Transfer.initiate(
    {
        "account_bank": "044",
        "account_number": "0690000044",
        "amount": 500,
        "narration": "New transfer",
        "currency": "NGN",
        "reference": "mk-902837-jk"
    }
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```
#### Returns

A sample response is:

```javascript
{
  "status": "success",
  "message": "TRANSFER-CREATED",
  "data": {
    "id": 542,
    "account_number": "0690000044",
    "bank_code": "044",
    "fullname": "Mercedes Daniel",
    "date_created": "2018-06-06T10:56:12.000Z",
    "currency": "NGN",
    "amount": 500,
    "fee": 45,
    "status": "NEW",
    "reference": "rave-transfer-1528159847480966",
    "narration": "New transfer",
    "complete_message": "",
    "requires_approval": 0,
    "is_approved": 1,
    "bank_name": "ACCESS BANK NIGERIA"
  }
}
```

### ```.bulk()```
This allows you send bulk transfers.

The payload should contain the following parameters:

* ```'bulk_data', 'required:true, eg:{ "Bank":"044","Account Number":"0690000032"},{"Bank":"044","Account Number":"0690000032"}'```,

```javascript
rave.Transfer.bulk(
    {
  "title":"May Staff Salary",
  "bulk_data":[
  	{
        "Bank":"044",
        "Account Number": "0690000032",
        "Amount":500,
        "Currency":"NGN",
        "Narration":"Bulk transfer 1",
        "reference": "mk-82973029"
    },
    {
        "Bank":"044",
        "Account Number": "0690000034",
        "Amount":500,
        "Currency":"NGN",
        "Narration":"Bulk transfer 2",
        "reference": "mk-283874750"
    }
  ]
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```
#### Returns

A sample response is:
```javascript
{
    "status": "success",
    "message": "BULK-TRANSFER-CREATED",
    "data": {
        "id": 21,
        "uuid": 21,
        "date_created": "2018-05-17T08:39:54.000Z",
        "approver": "N/A"
    }
}
```

### ```.fetch()```
This allows you retrieve a single transfer.
It uses a GET method.

```javascript
rave.Transfer.fetch('<id="transfer ID" e.g mk-902837-jk>') 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```
#### Returns

A sample response is:

```javascript
{
    "status": "success",
    "message": "QUERIED-TRANSFERS",
    "data": {
        "page_info": {
            "total": 1,
            "current_page": 1,
            "total_pages": 1
        },
        "payouts": [
            {
                "id": 247,
                "account_number": "0690000032",
                "bank_code": "044",
                "fullname": "Pastor Bright",
                "date_created": "2018-05-17T08:39:55.000Z",
                "currency": "NGN",
                "amount": 500,
                "fee": 45,
                "status": "FAILED",
                "narration": "Bulk transfer 1",
                "approver": null,
                "complete_message": "NO AUTH CONTEXT FOUND",
                "requires_approval": 0,
                "is_approved": 1,
                "bank_name": "ACCESS BANK NIGERIA"
            }
        ]
    }
}
```

### ```.list()```
This allows you fetch all transfers using a GET method:

```javascript
rave.Transfer.list() 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```

### ```.getApplicableFee()```
This retrieves the fee for a transfer:

```javascript
rave.Transfer.getApplicableFee()
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```

### ```.getBalance()```
This helps you get your balance for transfers.

* ```'currency', 'required:required,eg:NGN'```,

#### Returns

A sample response is:
```javascript
{
    "status": "success",
    "message": "WALLET-BALANCE",
    "data": {
        "Id": 3570,
        "ShortName": "NGN",
        "WalletNumber": "5070000106866",
        "AvailableBalance": 177337.24,
        "LedgerBalance": 177337.24
    }
}
```


### Subaccounts

This is used to create and manage subaccounts.

**Functions included:**

* ```.create```

* ```.list```

* ```.fetch```

<br>

### ```.create()```
This function helps you to create a subaccount on rave.

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Subaccount.create(
    {
	"account_bank": "044",
	"account_number": "0690000035",
	"business_name": "JK Services",
	"business_email": "jk@services.com",
	"business_contact": "Seun Alade",
	"business_contact_mobile": "090890382",
	"business_mobile": "09087930450",
	"meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}]
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```
#### Returns
This call returns:

```javascript
{
    "status": "success",
    "message": "SUBACCOUNT-CREATED",
    "data": {
        "id": 10,
        "account_number": "0690000047",
        "account_bank": "044",
        "fullname": "Ben Fowler",
        "date_created": "2018-05-22T23:08:07.000Z",
        "meta": [
            {
                "metaname": "MarketplaceID",
                "metavalue": "ggs-920800"
            }
        ],
        "subaccount_id": "RS_D87A9EE339AE28BFA2AE86041C6DE70E",
        "bank_name": "ACCESS BANK NIGERIA"
    }
}
```

A sample ```.err``` contains:
```javascript
{
    "status": "error",
    "message": "Sorry we couldn't verify your account number kindly pass a valid account number.",
    "data": null
}
```

### ```.list()```
This allows you to list all or specific subaccounts.

```javascript
rave.Subaccount.list() 
    .then(resp => {
        console.log(resp.body);

    }).catch(err => {
        console.log(err);
        
    })
```

### ```.fetch()```
This allows you fetch a single subaccount using the subaccount ID.

```javascript
rave.Subaccount.fetch(subaccount_id) 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```


### Payment Plans
Rave helps you collect payments recurrently from your customers using a payment plan. Payment plans allow you create a subscription for your customers.

When you have created a payment plan you can subscribe a customer to it by simply passing the plan ID in your request to charge the customers card.


**Functions included:**

* ```.create```

* ```.list```

* ```.fetch```

* ```.cancel```

* ```.edit```


### ```.create()```
This function allows you to create payment plans  on rave.

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Paymentplan.create(
    { 
        amount: '10',
        name: 'fosm',
        interval: 'daily',
        duration: 5,
    },
        json: true 
    }
    
    
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```

#### Returns
A sample response is seen below:

```javascript
{
  "status": "success",
  "message": "CREATED-PAYMENTPLAN",
  "data": {
    "id": 933,
    "name": "fosm",
    "amount": "10",
    "interval": "daily",
    "duration": 5,
    "status": "active",
    "currency": "NGN",
    "plan_token": "rpp_8b87056c262128afbe56",
    "date_created": "2018-10-15T16:35:10.000Z"
  }
}
```


### ```.list()```
This function allows you to list all the payment plans  on an account.

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Paymentplan.list() 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```


### ```.fetch()```
This function allows you to fetch a single payment plan:

```javascript
rave.Paymentplan.fetch(plan_id) 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```


### ```.cancel()```
This function allows you to cancel an exisiting payment plan:

```javascript

rave.Paymentplan.cancel(
    {
	"id": 912,
	
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```


### ```.edit()```
This function allows you to edit a payment plan:

```javascript

rave.Paymentplan.edit(
    {
	"id": 912,
	
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```


### Subscriptions

**Functions included:**

* ```.list```

* ```.fetch```

* ```.cancel```

* ```.activate```

### ```.list()```
This function allows you to list all subscriptions on a merchant account.

```javascript
var Ravepay = require('ravepay');

var rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

rave.Subscription.list() 
    .then(resp => {
        console.log(resp.body);

    }).catch(err => {
        console.log(err);
        
    })
```

### ```.fetch()```
This function allows you to get a particular subscription on a merchant account.

```javascript
rave.Subscription.fetch(subscription_id) 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```

### ```.cancel()```
This function allows you to cancel an exisiting subscription.

```javascript

rave.Subscription.cancel(
    {
    "id": 912
    }
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```

### ```.activate()```
This page describes how to activate a subscription.

```javascript

rave.Subscription.activate(
    {
	"id": 912,
	
}
).then(resp => {
    console.log(resp.body);
    
}).catch(err => {
    console.log(err);
    
})
```
