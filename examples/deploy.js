const NervosWeb3 = require('../lib');
const SERVER = 'localhost:1337';
const web3 = NervosWeb3.default(SERVER);


const tx = {
  from: '0x0438BFcaBdDa99c00aCF0039e6c1F3F2d78EDde5',
  privkey: '0x2c5c6c187d42e58a4c212a4aab0a3cfa4030256ed82bb3e05706706ab5be9641',
  nonce: 'ELH1A3',
  chainId: 1,
  validUntilBlock: 88 + +'0x2b350',
  data: '6060604052341561000f57600080fd5b60d38061001d6000396000f3006060604052600436106049576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff16806360fe47b114604e5780636d4ce63c14606e575b600080fd5b3415605857600080fd5b606c60048080359060200190919050506094565b005b3415607857600080fd5b607e609e565b6040518082815260200191505060405180910390f35b8060008190555050565b600080549050905600a165627a7a723058202d9a0979adf6bf48461f24200e635bc19cd1786efbcfc0608eb1d76114d405860029',
  version: 0,
  value: 0,
  quota: 1000000
}


web3.eth.sendTransaction(tx).then(console.log)