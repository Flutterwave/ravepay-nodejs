var createVirtualCards = require('../services/rave.create.virtual.cards');
var listVirtualCards = require('../services/rave.list.virtual.cards');
var getVirtualCards = require('../services/rave.get.Virtual.Cards');
var terminateVirtualCards = require('../services/rave.terminate.VirtualCard');
var fundVirtualCards = require('../services/rave.fund.virtual.card');
var fetchVirtualCardsTransactions = require('../services/rave.fetch.virtual.cardTransaction');
var withdrawVirtualcardfunds = require('../services/rave.withdraw.VirtualCard.Funds');
var freeVirtualcard = require('../services/rave.freeze.Unfreeze.VirtualCard');
var UnfreezeVirtualcard = require('../services/rave.freeze.Unfreeze.VirtualCard');


function virtualcards(RaveBase) {


    this.create = function (data) {

        return createVirtualCards(data, RaveBase);

    }
    
    this.list = function (data) {

        return listVirtualCards(data, RaveBase);

    }
    this.get = function (data) {

        return getVirtualCards(data, RaveBase);

    }

    this.terminate = function (data) {

        return terminateVirtualCards(data, RaveBase);

    }
    this.fund = function (data) {

        return fundVirtualCards(data, RaveBase);

    }


    this.fetchTransactions = function (data) {

        return fetchVirtualCardsTransactions(data, RaveBase);

    }

    this.withdraw = function (data) {

        return withdrawVirtualcardfunds(data, RaveBase);

    }
    this.freeze = function (data) {

        return freeVirtualcard(data, RaveBase);

    }
    this.unfreeze = function (data) {

        return UnfreezeVirtualcard(data, RaveBase);

    }





}
module.exports = virtualcards;