"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var formatters = require('web3-core-helpers').formatters;
var utils = require('web3-utils');
exports.getAccounts = {
    name: 'getAccounts',
    call: 'personal_listAccounts',
    params: 0,
    outputFormatter: utils.toChecksumAddress,
};
exports.newAccount = {
    name: 'newAccount',
    call: 'personal_newAccount',
    params: 1,
    inputFormatter: [null],
    outputFormatter: utils.toChecksumAddress,
};
exports.unlockAccount = {
    name: 'unlockAccount',
    call: 'personal_unlockAccount',
    params: 3,
    inputFormatter: [formatters.inputAddressFormatter, null, null],
};
exports.lockAccount = {
    name: 'lockAccount',
    call: 'personal_lockAccount',
    params: 1,
    inputFormatter: [formatters.inputAddressFormatter],
};
exports.sendTransaction = {
    name: 'sendTransaction',
    call: 'personal_sendTransaction',
    params: 2,
    inputFormatter: [formatters.inputTransactionFormatter, null],
};
exports.signTransaction = {
    name: 'signTransaction',
    call: 'personal_signTransaction',
    params: 2,
    inputFormatter: [formatters.inputTransactionFormatter, null],
};
exports.sign = {
    name: 'sign',
    call: 'personal_sign',
    params: 3,
    inputFormatter: [
        formatters.inputSignFormatter,
        formatters.inputAddressFormatter,
        null,
    ],
};
exports.ecRecover = {
    name: 'ecRecover',
    call: 'personal_ecRecover',
    params: 2,
    inputFormatter: [formatters.inputSignFormatter, null],
};