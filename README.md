# deploy-exchange
This script will deploy and register [ICAP](https://github.com/ethereum/wiki/wiki/ICAP:-Inter-exchange-Client-Address-Protocol) compatible ethereum exchange contract.

### Requirements

- node
- npm
- solc (available as a part of cpp-ethereum)
- ethereum client with jsonrpc server on (preferable [go-etheruem](https://github.com/ethereum/go-ethereum))
- unlocked 'from' (see configuration section)

### Installation

```bash
gt clone https://github.com/debris/deploy-exchange
cd deploy-exchange
npm install
```

### Run

```bash
node app.js
```

### Configuration

- **institution** - name of your institution. Must be 4 uppercase characters. Used in [inderect BBAN](https://github.com/ethereum/wiki/wiki/ICAP:-Inter-exchange-Client-Address-Protocol#indirect)
- **namereg** - address of namereg in which your institution should be registered. Use 'default' to register in default namereg
- **from** - address of account which should be used to create exchange contract. Use 'coinbase' to create exchange contract using your coinbase
- **jsonrpc** - address of jsonrpc http server


