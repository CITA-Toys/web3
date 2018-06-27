import blockchainPb from '../../proto-ts/blockchain_pb';

const EC = require('elliptic').ec;
const utils = require('web3-utils');
var sha3 = require('crypto-js/sha3');

const ec = new EC('secp256k1');

export interface CITASendTransactionArugments {
  privkey: string;
  to?: string;
  nonce: string;
  quota: number;
  validUntilBlock: number;
  data: string;
  value: string;
  chainId: number;
  version: number;
  [index: string]: any;
}

export const dataFormatter = (hex: string) => {
  return new Uint8Array(utils.hexToBytes(hex));
};

export default (txParams: CITASendTransactionArugments): string => {
  const requires = ['nonce', 'quota', 'validUntilBlock', 'chainId', 'data'];
  const errors = requires
    .map(require => (txParams[require] === undefined ? require : null))
    .filter(error => error);
  if (errors.length) throw new Error(errors.join() + ' missed');

  let tx = new blockchainPb.Transaction();
  if (txParams.to) {
    tx.setTo(txParams.to);
  }
  tx.setNonce(txParams.nonce);
  tx.setQuota(txParams.quota);
  tx.setValidUntilBlock(+txParams.validUntilBlock);
  tx.setData(dataFormatter(txParams.data));
  tx.setValue(txParams.value);
  tx.setChainId(txParams.chainId);
  tx.setVersion(txParams.version);

  const msg = tx.serializeBinary();

  const hex = utils.bytesToHex(msg);

  // const hash = utils.sha3(hex)
  const hash = sha3(hex.slice(2), {
    outputLength: 256
  }).toString();

  // old style
  const key = ec.keyFromPrivate(txParams.privkey, 'hex');
  const buffer = new Buffer(hash.toString(), 'hex');
  const sign = key.sign(buffer);
  let sign_r = sign.r.toString(16);
  let sign_s = sign.s.toString(16);
  if (sign_r.length == 63) sign_r = '0' + sign_r;
  if (sign_s.length == 63) sign_s = '0' + sign_s;
  const signature = sign_r + sign_s;
  const sign_buffer = new Buffer(signature, 'hex');
  const bytes = new Uint8Array(65);
  bytes.set(sign_buffer);
  bytes[64] = sign.recoveryParam;

  const unverifiedTransaction = new blockchainPb.UnverifiedTransaction();
  unverifiedTransaction.setTransaction(tx);
  unverifiedTransaction.setCrypto(blockchainPb.Crypto.SECP);
  unverifiedTransaction.setSignature(bytes);
  return utils.bytesToHex(unverifiedTransaction.serializeBinary());
};