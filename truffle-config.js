const HDWalletProvider = require('@truffle/hdwallet-provider');
const mnemonic = 'YOUR_MNEMONIC';
const infuraProjectId = 'INFURA_API_KEY';

module.exports = {
  networks: {
    goerli: {
      provider: () => new HDWalletProvider({
        mnemonic: {
          phrase: mnemonic
        },
        providerOrUrl: `https://goerli.infura.io/v3/${infuraProjectId}`
      }),
      network_id: 5,
      gas: 550000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};
