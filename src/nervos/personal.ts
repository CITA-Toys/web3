// import signer from '@nervos/signer'
// var _ = require('underscore')
var formatters = require('web3-core-helpers').formatters;
var utils = require('web3-utils');

export const getAccounts = {
  name: 'getAccounts',
  call: 'personal_listAccounts',
  params: 0,
  outputFormatter: utils.toChecksumAddress
};
export const newAccount = {
  name: 'newAccount',
  call: 'personal_newAccount',
  params: 1,
  inputFormatter: [null],
  outputFormatter: utils.toChecksumAddress
};

export const unlockAccount = {
  name: 'unlockAccount',
  call: 'personal_unlockAccount',
  params: 3,
  inputFormatter: [formatters.inputAddressFormatter, null, null]
};
export const lockAccount = {
  name: 'lockAccount',
  call: 'personal_lockAccount',
  params: 1,
  inputFormatter: [formatters.inputAddressFormatter]
};

export const sendTransaction = {
  name: 'sendTransaction',
  call: 'personal_sendTransaction',
  params: 2,
  inputFormatter: [formatters.inputTransactionFormatter, null]
};
export const signTransaction = {
  name: 'signTransaction',
  call: 'personal_signTransaction',
  params: 2,
  inputFormatter: [formatters.inputTransactionFormatter, null]
};
export const sign = {
  name: 'sign',
  call: 'personal_sign',
  params: 3,
  inputFormatter: [
    formatters.inputSignFormatter,
    formatters.inputAddressFormatter,
    null
  ]
};

export const ecRecover = {
  name: 'ecRecover',
  call: 'personal_ecRecover',
  params: 2,
  inputFormatter: [formatters.inputSignFormatter, null]
};
