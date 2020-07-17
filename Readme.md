# Flutterwave Nodejs Library v1.0.0

## Flutterwave Services exposed by the library

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
- Bills Payment
- Moibile money (Mpesa, Uganda, Ghana, Zambia, Francophone Africa, Rwanda)
- BVN Validation
- Verfiy transaction
- Virtual Cards
- Virtual account number
- Settlement (List and Fetch)
- USSD
- Ebills
- Misc (Exchange rates, List transactions, Get Balance, Get Balance History, Get fees, List of Banks)


For more information on the services listed above, visit the [Ravepay website](http://rave.flutterwave.com/).

## How to use

`npm install flutterwave-node`


 You can get your PUBLICK_KEY and SECRET_KEY from the Rave dashboard. 

 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.
 Go [here](https://rave.flutterwave.com/dashboard/settings/apis) to get your live keys.

 
```
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);
```

If you pass true as the value for PRODUCTION_FLAG, the library will use the production url as the base for all calls. Otherwise it will use the staging base url;

```
const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG); //Base url is 'https://ravesandboxapi.flutterwave.com'

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, true); //Base url is 'http://api.ravepay.co'

```

### Card Charge

```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  PRODUCTION_FLAG);

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
Get a more detailed overview of card payments with Rave [here](https://medium.com/@jake_parkers/ultimate-guide-to-card-transactions-with-rave-420e7290f8b9
)  
### Tokenized Charge

```javascript

const Ravepay = require("flutterwave-node");

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  PRODUCTION_FLAG);

const tokenCharge = async () => {
	const payload = {
		currency: "NGN",
		token: "flw-t1nf-da8bf499933fe2d8989e5491e545de50-m03k",
		country: "NG",
		amount: 1000,
		email: "olufemiobafunmiso@gmail.com",
		firstname: "Olufemi",
		lastname: "Oba",
		IP: "190.233.222.1",
		txRef: "Rave-Pages449771700550",
	};
	try {
		const response = await rave.TokenCharge.card(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

tokenCharge();

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

* ```.initiate()```

* ```.bulk()```

* ```.fetch()```

* ```.list()```

* ```.getApplicableFee()```

* ```.getBalance()```

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
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  PRODUCTION_FLAG);

const transfer = async () => {
    try {
        const payload = {
            "account_bank": "044",
            "account_number": "0690000044",
            "amount": 500,
            "narration": "New transfer",
            "currency": "NGN",
            "reference":"trans-"+ Date.now()
        }
        const response = await rave.Transfer.initiate(payload)
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}
transfer();

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


```javascript
const Ravepay = require('flutterwave-node';

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  PRODUCTION_FLAG);

const Bulktransfer = async () => {
    try {
        const payload = {
            "title":"May Staff Salary",
            "bulk_data":[
                {
                  "Bank":"044",
                  "Account Number": "0690000032",
                  "Amount":500,
                  "Currency":"NGN",
                  "Narration":"Bulk transfer 1",
                  "reference": "mk1-"+ Date.now()
              },
              {
                  "Bank":"044",
                  "Account Number": "0690000034",
                  "Amount":500,
                  "Currency":"NGN",
                  "Narration":"Bulk transfer 2",
                  "reference": "mk2-"+ Date.now()
              }
            ]
          }
        const response = await rave.Transfer.bulk(payload)
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}
Bulktransfer();
```
#### Returns

A sample response is:

```javascript
{
  status: 'success',
  message: 'BULK-TRANSFER-CREATED',
  data: {
    id: 4032,
    date_created: '2020-06-23T20:21:20.000Z',
    approver: 'N/A'
  }
}
```

### ```.fetch()```
This allows you retrieve a single transfer.
It uses a GET method.

```javascript
const Ravepay = require('flutterwave-node';

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  PRODUCTION_FLAG);

const fetchtransfer = async (ref) => {
    try {
        
        const response = await rave.Transfer.fetch(ref)
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}
fetchtransfer("rave-transfer-1528159847480966");

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
This allows you fetch all transfers using a GET method

```javascript
const Ravepay = require('flutterwave-node';

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  PRODUCTION_FLAG);

const listTransfer = async () => {
    try {
        const payload={
            "page":1,
            "status":"successful" //This allows you fetch only transfers with a specific status e.g. fetch all successful transactions. Possible values are failed, successful
        }
        const response = await rave.Transfer.list(payload)
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}
listTransfer();

```

### ```.getApplicableFee()```
This retrieves the fee for a transfer

```javascript
const Ravepay = require('flutterwave-node';

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY,  PRODUCTION_FLAG);

const getFee = async () => {
    try {
        const payload={
            "currency":"NGN",
            "amount":"1000" 
        }
        const response = await rave.Transfer.getApplicableFee(payload)
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}
getFee();
```

### ```.getBalance()```

This helps you get your balance for transfers.

```javascript
const Ravepay = require('flutterwave-node';

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);

const getBalance = async (currency) => {
    try {
       const payload={"currency":"NGN"}
        const response = await rave.Transfer.getBalance(payload)
        console.log(response)

    } catch (error) {
        console.log(error)
    }
}
getBalance();

```
#### Returns

A sample response is:
```javascript
{
  status: 'success',
  message: 'WALLET-BALANCE',
  data: {
    Id: 2040517,
    ShortName: 'NGN',
    WalletNumber: '7844600144573',
    AvailableBalance: 10918330.575
  }
}
```


### Subaccounts

This is used to create and manage subaccounts

**Functions included:**

* ```.create()```

* ```.list()```

* ```.fetch()```

* ```.delete()```

* ```.update()```

<br>

### ```.create()```
This function helps you to create a subaccount on rave.

```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);

const createSubAcct=  async ()=>{

    const payload = {
        "account_bank": "044",
        "account_number": "0690000035",
        "business_name": "JK Services",
        "business_email": "jk@services.com",
        "business_contact": "Seun Alade",
        "business_contact_mobile": "090890382",
        "business_mobile": "09087930450",
        "country":"NG",
        "meta": [{"metaname": "MarketplaceID", "metavalue": "ggs-920900"}]
    }
    try {
       const response =  await rave.Subaccount.create(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


createSubAcct();

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

A sample ```.err``` contains
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
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTION_FLAG);

const listSubAcct=  async ()=>{

   
    try {
       const response =  await rave.Subaccount.list()
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


listSubAcct();

```

### ```.fetch()```
This allows you fetch a single subaccount using the subaccount ID

```javascript
const fetchSubAcct = async () => {

    const payload = {
        "id":"RS_467808290FFEC932CBE097DD5097A2"
    }
    try {
        const response = await rave.Subaccount.fetch(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


fetchSubAcct()
```
### ```.delete()```
This allows you delete a single subaccount using the subaccount ID

```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTTION_FLAG);
const deleteSubAcct = async () => {

    const payload = {
        "id":"RS_467808290FFEC932CBE097DD5097A28F"
    }
    try {
        const response = await rave.Subaccount.delete(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


deleteSubAcct();
```

### ```.update()```
This allows you update a subaccount

```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, PRODUCTTION_FLAG);

const updateSubAcct = async () => {

    const payload = 	{
        "id": "RS_C5B5E474258921E0BD524C12A5008DA1", //The is the subaccount ID, you can get it from the List Subaccount 
        "account_number": "0690000034",
        "business_name": "Synergy Alliance",
        "business_email": "ted@synergyalliance.com",
        "account_bank": "044",
        "split_type": "flat",
        "split_value": "200"
      }
    try {
        const response = await rave.Subaccount.update(payload)
        console.log(response);
    } catch (error) {
        console.log(error)
    }

}


updateSubAcct();

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
var Ravepay = require('flutterwave-node');

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
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);


rave.Paymentplan.list() 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```


### ```.fetch()```
This function allows you to fetch a single payment plan

```javascript
rave.Paymentplan.fetch(plan_id) 
    .then(resp => {
        console.log(resp.body);
        
    }).catch(err => {
        console.log(err);
        
    })
```


### ```.cancel()```
This function allows you to cancel an existing payment plan

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
This function allows you to edit a payment plan

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
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

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
This function allows you to cancel an existing subscription

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
This page describes how to activate a subscription

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


## Bills payment 

Rave allows merchants to re-sell bill payment services such as airtime payments in Nigeria, Ghana and the US and DSTV payment in Nigeria and Ghana.

### ```.bills()```
This function allows you to make bills payment (DStv, GOTV, Remita, Airtime etc.)

```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);


const callBills =  async () =>{

    const payload = {
        "service": "fly_history",
        "service_method": "post",
        "service_version": "v1",
        "service_channel": "rave",
        "service_payload": {
          "FromDate": "2018-08-01",
          "ToDate": "2018-08-27",
          "PageSize": 20,
          "PageIndex": 0,
          "Reference": "+233494850059"
        }
    }
    try {
       const response =  await rave.BillsPayment.bills(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


callBills();

```


### Returns

```javascript

{
    "status": "success",
    "message": "SERVICE-RESPONSE",
    "data": {
        "MobileNumber": "+23490803840303",
        "Amount": 500,
        "Network": "9MOBILE",
        "TransactionReference": "CF-FLYAPI-20200218112625677823",
        "PaymentReference": "BPUSSD1582025186783879",
        "BatchReference": null,
        "ExtraData": null,
        "Status": "success",
        "Message": "Bill Payment was completed successfully",
        "Reference": null
    }
}
```
## Mobile money
This page describes how to collect payments via mobile money.

### ```Ghana```
This function allows you to accept payments using the Ghana mobile money method.

```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);


const Gh_mobilemoney =  async ()=>{
 
   
    try {

        const payload = {
            "currency": "GHS",
            "payment_type": "mobilemoneygh",
            "country": "GH",
            "amount": "50",
            "email": "user@example.com",
            "phonenumber": "054709929220",
            "network": "MTN",
            "firstname": "temi",
            "lastname": "desola",
            "voucher": "128373", // only needed for Vodafone users.
            "IP": "355426087298442",
            "txRef": "MC-" + Date.now(),
            "orderRef": "MC_" + Date.now(),
            "is_mobile_money_gh": 1,
            "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
            "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
        }

       const response =  await rave.MobileMoney.ghana(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
Gh_mobilemoney();


```
**Redirect customer to the link returned in the charge initiation response redirect to data.link**

### ```Mpesa```
This function allows you to accept payments using Mpesa (KES) mobile money method.

```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLICK_KEY, SECRET_KEY, false);

const callMpesa =  async ()=>{

    const payload = {
    "currency": "KES",
    "country": "KE",
    "amount": "100",
    "phonenumber": "0926420185",
    "email": "user@example.com",
    "firstname": "jsksk",
    "lastname": "ioeoe",
    "IP": "40.14.290",
    "narration": "funds payment",
    "txRef": "jw-222",
    "meta": [{metaname: "extra info", metavalue: "a pie"}],
    "device_fingerprint": "89191918hgdgdg99191", //(optional)
    "payment_type": "mpesa",
    "is_mpesa": "1",
  	"is_mpesa_lipa": 1
    }
    try {
       const response =  await rave.MobileMoney.mpesa(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


callMpesa();

```

### ```Zambia```
This function allows you to accept payments using Zambia mobile money method.

**MTN is the only available network at the moment.**

```javascript
//Pass currency as ZMW and country as NG

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const zmw_mobilemoney=  async ()=>{

    const payload = {
   "currency": "ZMW",
  "payment_type": "mobilemoneyzambia",
  "country": "NG",
  "amount": "50",
  "email": "user@example.com",
  "phonenumber": "054709929220",
  "network": "MTN",
  "firstname": "temi",
  "lastname": "desola",
  "IP": "355426087298442",
  "txRef": "MC-" + Date.now(),
  "orderRef": "MC_" + Date.now(),
  "is_mobile_money_ug": 1,
  "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
  "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"  
    }
    try {
       const response =  await rave.MobileMoney.zambia(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


zmw_mobilemoney();

```
**Redirect customer to the link returned in the charge initiation response redirect to data.link**

### ```Uganda```
This function allows you to accept payments using Uganda mobile money method.

```javascript
//pass currency as UGX and country as NG

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const Ugx_mob_money=  async ()=>{

    const payload = {
   "currency": "UGX",
  "payment_type": "mobilemoneyuganda",
  "country": "NG",
  "amount": "50",
  "email": "user@example.com",
  "phonenumber": "054709929220",
  "network": "UGX",
  "firstname": "temi",
  "lastname": "desola",
  "IP": "355426087298442",
  "txRef": "MC-" + Date.now(),
  "orderRef": "MC_" + Date.now(),
  "is_mobile_money_ug": 1,
  "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
  "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
    }
    try {
       const response =  await rave.MobileMoney.uganda(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


Ugx_mob_money();



```
**Redirect customer to the link returned in the charge initiation response redirect to data.link**'

###```Rwanda``
This function allows you to accept payments using Rwanda mobile money method.

```javascript
//Pass currency as RWF and country as NG.

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const rwn_mobilemoney=  async ()=>{

    const payload = {
  "currency": "RWF",
  "payment_type": "mobilemoneygh",
  "country": "NG",
  "amount": "50",
  "email": "user@example.com",
  "phonenumber": "054709929220",
  "network": "RWF",
  "firstname": "temi",
  "lastname": "desola",
  "IP": "355426087298442",
  "txRef": "MC-" + Date.now(),
  "orderRef": "MC_" + Date.now(),
  "is_mobile_money_gh": 1,
  "redirect_url": "https://rave-webhook.herokuapp.com/receivepayment",
  "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
   }
    try {
       const response =  await rave.MobileMoney.rwanda(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


rwn_mobilemoney();

```
**Redirect customer to the link returned in the charge initiation response redirect to data.link**

### ```.francophone()```
Rave currently allows merchants to collect payments in Francophone Africa via mobile money from **all networks.**

Rave facilitates mobile money payments for The West African CFA franc (French: franc CFA; Portuguese: franco CFA or simply franc, ISO 4217 code: XOF), for Ivory Coast, Mali and Senegal.

For the Central African CFA franc (French: franc CFA or simply franc, ISO 4217 code: XAF), mobile money payments are accepted for Cameroon.


```javascript
//pass currency as XAF or XOF

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const franco_mobilemoney=  async ()=>{

    const payload = {
  "currency": "XAF",
  "amount": "50",
  "email": "user@example.com",
  "phonenumber": "054709929220",
  "firstname": "temi",
  "lastname": "desola",
  "IP": "355426087298442",
  "txRef": "MC-" + Date.now(),
  "orderRef": "MC_" + Date.now(),
  "is_mobile_money_franco": 1,
  "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
}
    try {
       const response =  await rave.MobileMoney.francophone(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


franco_mobilemoney();

```
```javascript
//XOF sample payload

{ "currency": "XAF",
  "amount": "50",
  "email": "user@example.com",
  "phonenumber": "054709929220",
  "firstname": "temi",
  "lastname": "desola",
  "IP": "355426087298442",
  "txRef": "MC-" + Date.now(),
  "orderRef": "MC_" + Date.now(),
  "is_mobile_money_franco": 1,
  "device_fingerprint": "69e6b7f0b72037aa8428b70fbe03986c"
}
```

****Redirect customer to the link returned in the charge initiation response redirect to data.link****

## BVN Verification
This shows how to validate your customer's BVN.
BVN Validation is only available for Nigerian customers. It allows you verify BVN supplied by a customer and can also be used for customer KYC methods such as; validating date of birth supplied by the customer, validating the mobile number, first name & last name etc.

```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const callBvn =  async () => {

    const payload = {
        bvn:"12345678901"
    }
    try {
       const response =  await rave.Bvn.verification(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}


callBvn();
```

## Transaction verification.
This shows how to verify transactions using your own transaction reference.

```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay("FLWPUBK_TEST-xxxxxxxxx-X", "FLWSECK_TEST-9xxxxxx-X",false);


const callVerify =  async (ref) => {

    const payload = {
        txref:ref
    }
    try {
       const response =  await rave.VerifyTransaction.verify(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}

callVerify("rave-123456");
```

## Virtual Cards
The Flutterwave API allows you to create virtual cards that can be used online to make purchases and complete payments.

###```.create()```
This describes how to create a virtual card on Rave.

**The currency the card would be denominated in, possible values are NGN and USD only.**


```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const create_Vcard = async ()=> {
	const payload = {
		currency: "NGN",
		amount: "100",
		billing_name: "Mohammed Lawal",
		billing_address: "DREAM BOULEVARD",
		billing_city: "ADYEN",
		billing_state: "NEW LANGE",
		billing_postal_code: "293094",
		billing_country: "US",
		callback_url: "https://your-callback-url.com/"
	};
	try {
		const response = await rave.VirtualCards.create(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

create_Vcard();

```

####Response
```
body: {
    status: 'success',
    message: 'Please note that this card can ONLY be used on RAVE merchant sites. Contact support for more information',
    data: {
      id: 'a790657b-f594-45df-8970-3baa10d3a47b',
      AccountId: 78446,
      amount: '100.00',
      currency: 'NGN',
      card_hash: 'a790657b-f594-45df-8970-3baa10d3a47b',
      cardpan: '5366132747605184',
      maskedpan: '536613*******5184',
      city: 'Lekki',
      state: 'Lagos',
      address_1: '19, Olubunmi Rotimi',
      address_2: null,
      zip_code: '23401',
      cvv: '802',
      expiration: '2023-02',
      send_to: null,
      bin_check_name: null,
      card_type: 'mastercard',
      name_on_card: 'Mohammed Lawal',
      date_created: '2020-02-19T14:09:38.0788249+00:00',
      is_active: true,
      callback_url: null
    }
  }

```
###````.list()```
This allows you to list all virtual cards on your profile.


```javascript
const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const list_Vcard = async ()=> {
	const payload = {
		page:1
	};
	try {
		const response = await rave.VirtualCards.list(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

list_Vcard();
```


### ```.get()```
This allows you fetch a virtual card on your profile.

**id: This is id returned for the card. You can pick this up from the [Create a Virtual Card API response.](https://developer.flutterwave.com/v2.0/reference#create-a-virtual-card)**


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const get_Vcard = async ()=> {
	const payload = {
		id:"660bae3b-333c-410f-b283-2d181587247f"
	};
	try {
		const response = await rave.VirtualCards.get(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

get_Vcard();
```

### ```.terminate()```
This describes how to terminate a virtual card on your profile.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const terminate_Vcard = async ()=> {
	const payload = {
		id:"660bae3b-333c-410f-b283-2d181587247f"
	};
	try {
		const response = await rave.VirtualCards.terminate(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

terminate_Vcard();
```
### ```.fund()```
This allows you to fund an existing virtual card.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const fund_Vcard = async ()=> {
	const payload = {
	id: "e9ca13bd-36b4-4691-9ee6-e23d7f2e196c",
	amount: 2000,
	debit_currency: "NGN",
	};
	try {
		const response = await rave.VirtualCards.fund(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

fund_Vcard();
```

### ```.fetchTransactions()```
This API allows you to fetch transactions by date range on a single card.

```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const fetch_trans_Vcard = async ()=> {
	const payload = {
	   FromDate: "2019-02-13",
      ToDate: "2020-12-21",
      PageIndex: "0",
      PageSize: "20",
      CardId: "e9ca13bd-36b4-4691-9ee6-e23d7f2e196c",
	};
	try {
		const response = await rave.VirtualCards.fetchTransactions(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

fetch_trans_Vcard();
```
### ```.withdraw ()```
Withdraw existing funds from a customer's card using the withdraw API.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const withdraw_funds = async ()=> {
	const payload = {
	  amount:100,
      card_id: "e9ca13bd-36b4-4691-9ee6-e23d7f2e196c",
	};
	try {
		const response = await rave.VirtualCards.withdraw(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

withdraw_funds();
```

### ```.freeze() and unfreeze()```
You can freeze and unfreeze the virtual card with API.

**Status_action: This is the action to perform on the card, possible parameters are block and unblock.**

### ```.freeze()```


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const freeze_card = async ()=> {
	const payload = {
	 status_action:"block",
      card_id: "e9ca13bd-36b4-4691-9ee6-e23d7f2e196c",
	};
	try {
		const response = await rave.VirtualCards.freeze(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

freeze_card();
```

### ```.unfreeze()```

```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const unfreeze_card = async ()=> {
	const payload = {
	 status_action:"unblock",
      card_id: "e9ca13bd-36b4-4691-9ee6-e23d7f2e196c",
	};
	try {
		const response = await rave.VirtualCards.unfreeze(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

unfreeze_card();
```

## Virtual Account Numbers
This shows how to create an account number for customers to pay you with using the pay with bank transfer feature.

The virtual accounts created are customer-specific. Transfers to account numbers you create here will show up as customer payments in your Rave dashboard.

**is_permanent: This allows you create a static account number i.e. it doesn't expire.**

### Permanent Account


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const create_virtual_account = async ()=> {
	const payload = {
	 email: "user@example.com",
	is_permanent: true
	};
	try {
		const response = await rave.VirtualAccount.accountNumber(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

create_virtual_account();


```

### Non-permanent Account

**frequency:** This is the number of times a generated account number can receive payments. Represented as an Integer e.g. "frequency": 10 means the account can receive payments up to 10 times before expiring.

**duration:** This is represented in days e.g. passing 2 means 2 days. It is the expiry date for the account number. Setting to 2 would mean you want the account number to exist for 2 days before expiring.**

```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const create_virtual_account = async ()=> {
	const payload = {
	email: "ade_temi@icloud.com",
	frequency: 4,
   duration: 4
	};
	try {
		const response = await rave.VirtualAccount.accountNumber(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

create_virtual_account();


```

## Settlements

This pages shows how to List all settlements and how to fetch a particular transaction.

### ```.list()```
List all settlements made to your bank account and your subaccounts.

```javascript

const Ravepay = require('flutterwave-node');

const pubkey = "FLWPUBK_TEST-xxxxxxxxxx";
const seckey = "FLWSECK_TEST-xxxxxxx";
const rave = new Ravepay(pubkey, seckey, false);
const call_list_settlement = async ()=> {
	const payload = {
     from:"2020:01:22",
     to:"2020:02:09",
     seckey:seckey,
	};
	try {
		const response = await rave.Settlement.list(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

call_list_settlement();


```

### ```.fetch()```
List all settlements made to your bank account and your subaccounts.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);


const call_fetch_settlement = async ()=> {
	const payload = {
     id:"45318",
     subaccountid:"RC-XXXXXXXXXXX" //optional
	};
	try {
		const response = await rave.Settlement.fetch(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

call_fetch_settlement();


```

## USSD
This page describes how to collect (NGN) payments via USSD.

Rave allows you collect payments from your customers offline using USSD. With USSD payments, you call our APIs to create a charge, then give your customer instructions to complete the payment on her/his mobile phone. Once payment is completed we notify you on your webhook.


**At the moment, banks available for USSD payments (and their numeric codes) are: Fidelity Bank (070), Guaranty Trust Bank (058), Keystone Bank (082), Sterling Bank (232), United Bank for Africa (033), Unity Bank (215), and Zenith Bank (057).**


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);



const Ussd_charge = async()=> {
	const payload = {
        accountbank: "044", // Bank numeric code
        currency: "NGN",
        country: "NG",
        amount: "100",
        email: "user@gmail.com",
        phonenumber: "0902620185",
        firstname: "temi",
        lastname: "desola",
        IP: "355426087298442",
        is_ussd: 1,
        payment_type: "USSD",
        txRef: "MC-" + Date.now(),// your unique merchant reference
        orderRef: "MC_" + Date.now(),
        meta: [{metaname: "flightID", metavalue: "123949494DC"}],
        device_fingerprint: "69e6b7f0b72037aa8428b70fbe03986c"
	};
	try {
		const response = await rave.USSD.charge(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

Ussd_charge();

```
## EBILLS
This API allows you to create a new Ebills order and update the amount to be paid.

### ```.create()```
This function allows you to create a new Ebills order.

**numberofunits:** Set the value to 1. It describes the number of items the customer is paying for.

**currency**: The only available currency is ```NGN```


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const ebills_create = async()=> {
	const payload = {
        narration: "test",
        numberofunits: 1,
        currency: "NGN",
        amount: 100,
        phonenumber: "09384747474",
        email: "jake@rad.com",
     	 txRef:"773838837373",
        country:"NG",
        IP:"127.0.9"
      };
	try {
		const response = await rave.Ebills.create(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

ebills_create();




```

### ```.update()```
This API is used to update the amount to be paid. 

**reference:** This is the reference returned in the create order endpoint as ```flwRef```.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const ebills_update = async ()=> {
	const payload = {
       
        currency: "NGN",
        amount: 100,
        reference:"RVEBLS-045475BB5A9A-23240"
      };
	try {
		const response = await rave.Ebills.update(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

ebills_update();

```

## MISC


### ```.exchange_rates()```
Rave allows your convert currencies real time via api's to charge your customers in alternate currencies. See table below show possible exchange rates combination via the [API](https://developer.flutterwave.com/reference#exchange-rates)


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const exchange_rates = async ()=> {
	const payload = {
            service: "rates_convert",
            service_method: "post",
            service_version: "v1",
            service_channel: "transactions",
            service_channel_group: "merchants",
            service_payload: {
              FromCurrency: "USD",
              ToCurrency: "NGN",
              Amount: 5000
            }
          };
	try {
		const response = await rave.Misc.exchange_rates(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

exchange_rates();

```

### ```.getBalance()```
This allows you to get balances for ledger and available balance across all or select currencies.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const get_balance= async ()=> {
	const payload = {
            service: "rates_convert",
            service_method: "post",
            service_version: "v1",
            service_channel: "rave",
            currency:"NGN" // for single balance. For all balance don't add currency
          };
	try {
		const response = await rave.Misc.getBalance(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}

get_balance();

```


### ```.list_transactions()```
This helps you list all transactions on your account.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

const get_list_of_transactions= async ()=> {
	const payload = {
            from: "2019-01-01",
            to: "2020-03-30",
            currency: "NGN",
            status: "successful" //"failed"
          };
	try {
		const response = await rave.Misc.list_transactions(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

get_list_of_transactions();

```

### ```.getFee()```
This allow you to get fee for a charged amount.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);


const get_fee= async ()=> {
	const payload = {
            amount: 5000,
            currency: "NGN",
          };
	try {
		const response = await rave.Misc.getFee(payload);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

get_fee();

```

### ```.getBanks()```
This page describes a list of banks that can be charged on rave.


```javascript

const Ravepay = require('flutterwave-node');

const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);



const list_banks= async ()=> {
	
	try {
		const response = await rave.Misc.getBanks(rave);
		console.log(response);
	} catch (error) {
		console.log(error);
	}
};

list_banks();


```

### ```.getBalHist```

This page describes how to get balance history and filter using currency, date or page.

```javascript
const Ravepay = require('flutterwave-node');
 
const rave = new Ravepay(PUBLIC_KEY, SECRET_KEY, false);

 
const callBalanceHistory=  async ()=>{
 
   
    try {

        const payload = {
          "currency": "NGN",
          "from": "2020-03-12",
          "to": "2020-03-13",
          "page": 1
        }

       const response =  await rave.Misc.getBalHist(payload)
       console.log(response);
    } catch (error) {
        console.log(error)
    }                            
   
}
 
 
callBalanceHistory();

```
