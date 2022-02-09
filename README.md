## Fullstack dapp to read/write content on the Ethereum blockchain

How to run a fullstack dapp using [React](https://create-react-app.dev) + [Hardhat](https://hardhat.org) + [Infura](https://infura.io)

Source: [The Complete Guide to Full Stack Ethereum Development - by Nader Dabit, Apr/2021](https://dev.to/dabit3/the-complete-guide-to-full-stack-ethereum-development-3j13)

#### Node.js

> First requirement is to install [Node.js](https://nodejs.org). You can download the installer from [here](https://nodejs.org/en/download), or install from your terminal.

#### Create a new React app
```
$ npx create-react-app content-on-blockchain
$ cd content-on-blockchain
```

#### Install dependencies
```
$ npm install ethers hardhat @nomiclabs/hardhat-waffle ethereum-waffle chai @nomiclabs/hardhat-ethers
```

#### Create a new Hardhat project
```
$ npx hardhat

> Create a basic sample project

888    888                      888 888               888
888    888                      888 888               888
888    888                      888 888               888
8888888888  8888b.  888d888 .d88888 88888b.   8888b.  888888
888    888     "88b 888P"  d88" 888 888 "88b     "88b 888
888    888 .d888888 888    888  888 888  888 .d888888 888
888    888 888  888 888    Y88b 888 888  888 888  888 Y88b.
888    888 "Y888888 888     "Y88888 888  888 "Y888888  "Y888
```

Directory structure
```
- /contracts - A folder holding an example Solidity smart contract
- /scripts - A folder containing a script named sample-script.js that will deploy your smart contract when executed
- hardhat.config.js - The entirety of your Hardhat setup (i.e. your config, plugins, and custom tasks) is contained in this file.
```

Update ```hardhat.config.js```
```
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: './src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
```

Compile solidity source code 
```
$ npx hardhat compile
```

#### Deploying using a local network / blockchain

Let’s deploy our smart contract to a local blockchain so that we can test it out

Start the local test node
```
$ npx hardhat node
```

Output will show 20 test accounts
```
Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80

Account #1: 0x70997970c51812dc3a010c7d01b50e0d17dc79c8 (10000 ETH)
Private Key: 0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d
...
Account #19: 0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199 (10000 ETH)
Private Key: 0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e
```

Update the filename of ```scripts/sample-script.js``` to ```scripts/deploy.js```

Deploy the contract to the local test network
```
$ npx hardhat run scripts/deploy.js --network localhost	

> Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
```

Update file ```App.js``` with the contract address deployed 
```
const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
```

#### Metamask

Create a new account using one of the 20 outputs

- Open Metamask
- Enable test networks
- Change to ```localhost:8545``` test network
- Import an account, use account #0 for example

```
# private key
0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80
```

#### Bootstrap

Install React-Bootstrap (on the react-app dir)
```
$ npm install react-bootstrap bootstrap@5.1.3
```

#### Our React application

Main goals:
- fetch the current value of a content from the smart contract; and
- allow a user to update the value of the content

How do we accomplish this ?
1. Create an input field and a local react state to manage the value of the input
2. Allow the application to connect to the user’s MetaMask account to sign transactions
3. Create functions for reading and writing some content to the smart contract


Run app
```
$ npm start
```

#### Testing with Ropsten testnet

1. Change Metamask network to Ropsten testnet
2. Give you some credits using [Ropsten Ethereum Faucet](https://faucet.ropsten.be/)
3. Create an account on [Infura](https://infura.io) or [Alchemy](https://www.alchemy.com)

Create an account and a project on **Infura**, take note of project ID
```
Project: Hashdex POC w/ Ropsten

ID: 1f9d37b95c2d47b1b213c2c1c960020d
```

Add Ropsten network to file ```hardhat.config.js```
```
ropsten: {
      url: "https://ropsten.infura.io/v3/1f9d37b95c2d47b1b213c2c1c960020d",
      accounts: [`0x${process.env.PRIVATEKEY}`]
    }
```

Save the Metamask private-key as an env variable, so that Hardhat can deploy the contract on the accounter's name
```
$ export PRIVATEKEY="<private key of ropsten account on Metamask>"
```

Deploy on Ropsten
```
$ npx hardhat run scripts/deploy.js --network ropsten

> Contract deployed to: 0xB8df848EA61B52eeD961AC8451ec25c5bf5188C1
```

Check contract on [TESTNET  Ropsten (ETH) Blockchain Explorer](https://ropsten.etherscan.io/)

Run app
```
$ npm start
```