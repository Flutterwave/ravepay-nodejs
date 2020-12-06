import { AxiosResponse } from "axios";

export default class Rave {
    constructor(publicKey: string, privateKey: string, productionFlag: boolean)
    Card: Card
    Status: Status
}

interface BaseResponse {
    status: string,
    message: string,
}

interface Card {
    charge(data: CardChargeRequest): AxiosResponse<CardChargeResponse>,
    validate(data: CardValidateRequest): AxiosResponse<CardValidateResponse>
}

interface CardChargeRequest {
    token: string,
    currency: string,
    country?: string,
    amount: string,
    email: string,
    firstname?: string,
    lastname?: string,
    IP?: string,
    narration?: string,
    txRef: string,
    string?: string,
    device_fingerprint?: string,
    payment_plan?: string,
    subaccounts?: []
}

interface CardChargeResponse extends BaseResponse {
    data: {
        txid: number,
        txref: string,
        flwref: string,
        devicefingerprint: string,
        cycle: string,
        amount: number,
        currency: string,
        chargedamount: number,
        appfee: number,
        merchantfee: number,
        merchantbearsfee: number,
        chargecode: string,
        chargemessage: string,
        authmodel: string,
        ip: string,
        narration: string,
        status: string,
        vbvcode: string,
        vbvmessage: string,
        authurl: string,
        acctcode: string | any,
        acctmessage: string | any,
        paymenttype: string,
        paymentid: string,
        fraudstatus: string,
        chargetype: string,
        createdday: number,
        createddayname: string,
        createdweek: number,
        createdmonth: number,
        createdmonthname: string,
        createdquarter: number,
        createdyear: string,
        createdyearisleap: boolean,
        createddayispublicholiday: number,
        createdhour: number,
        createdminute: number,
        createdpmam: string,
        created: string,
        customerid: number,
        custphone: string,
        custnetworkprovider: string,
        custname: string,
        custemail: string,
        custemailprovider: string,
        custcreated: string,
        accountid: number,
        acctbusinessname: string,
        acctcontactperson: string,
        acctcountry: string,
        acctbearsfeeattransactiontime: number,
        acctparent: number,
        acctvpcmerchant: string | any,
        acctalias: string,
        acctisliveapproved: number,
        orderref: string,
        paymentplan: any,
        paymentpage: any,
        raveref: string,
        amountsettledforthistransaction: number,
        card: {
            expirymonth: string,
            expiryyear: string,
            cardBIN: string,
            last4digits: string,
            brand: string,
            card_tokens: { embedtoken: string, shortcode: string, expiry: string }[]
            life_time_token: string
        }
    }
}

interface CardValidateRequest {
    transaction_reference: string,
    otp?: string,
}

interface CardValidateResponse extends BaseResponse {
    data: {
        data: {
            responsecode: string,
            responsemessage: string
        },
        tx: {
            id: number,
            txRef: string,
            orderRef: string,
            flwRef: string,
            redirectUrl: string,
            device_fingerprint: string | any,
            settlement_token: any,
            cycle: string,
            amount: number,
            charged_amount: number,
            appfee: number,
            merchantfee: number,
            merchantbearsfee: number,
            chargeResponseCode: string,
            chargeResponseMessage: string,
            authModelUsed: string,
            currency: string,
            IP: string,
            narration: string,
            status: string,
            vbvrespmessage: string,
            authurl: string,
            vbvrespcode: string,
            acctvalrespmsg: any,
            acctvalrespcode: any,
            paymentType: string,
            paymentId: string,
            fraud_status: string,
            charge_type: string,
            is_live: number,
            createdAt: string,
            updatedAt: string,
            deletedAt: any,
            customerId: number,
            AccountId: number,
            customer: {
                id: number,
                phone: any,
                fullName: string,
                customertoken: any,
                email: string,
                createdAt: string,
                updatedAt: string,
                deletedAt: any,
                AccountId: number
            },
            chargeToken: {
                user_token: string,
                embed_token: string
            }
        }
    }
}

interface Status {
    requery(data: StatusRequeryRequest): AxiosResponse<StatusRequeryResponse>
}

interface StatusRequeryRequest {
    flwref?: string,
    txref?: string,
}

interface StatusRequeryResponse extends BaseResponse {
    data: {
        "txid": number,
        "txref": string,
        "flwref": string,
        "devicefingerprint": string,
        "cycle": string,
        "amount": number,
        "currency": string,
        "chargedamount": number,
        "appfee": number,
        "merchantfee": number,
        "merchantbearsfee": number,
        "chargecode": string,
        "chargemessage": string,
        "authmodel": string,
        "ip": string,
        "narration": string,
        "status": string,
        "vbvcode": string,
        "vbvmessage": string,
        "authurl": string,
        "acctcode": any,
        "acctmessage": any,
        "paymenttype": string,
        "paymentid": string,
        "fraudstatus": string,
        "chargetype": string,
        "createdday": number,
        "createddayname": string,
        "createdweek": number,
        "createdmonth": number,
        "createdmonthname": string,
        "createdquarter": number,
        "createdyear": number,
        "createdyearisleap": boolean,
        "createddayispublicholiday": number,
        "createdhour": number,
        "createdminute": number,
        "createdpmam": string,
        "created": string,
        "customerid": number,
        "custphone": any,
        "custnetworkprovider": string,
        "custname": string,
        "custemail": string,
        "custemailprovider": string,
        "custcreated": string,
        "accountid": number,
        "acctbusinessname": string,
        "acctcontactperson": string,
        "acctcountry": string,
        "acctbearsfeeattransactiontime": number,
        "acctparent": number,
        "acctvpcmerchant": number,
        "acctalias": string,
        "acctisliveapproved": number,
        "orderref": string,
        "paymentplan": any,
        "paymentpage": any,
        "raveref": string,
        "meta": [
            {
                "id": number,
                "metaname": string,
                "metavalue": string,
                "createdAt": string,
                "updatedAt": string,
                "deletedAt": any,
                "getpaidTransactionId": number
            }
        ]
    }
}