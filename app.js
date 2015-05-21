var Promise = require('bluebird');
var path = require('path');
var fs = Promise.promisifyAll(require('fs'));
var exec = Promise.promisify(require('child_process').exec);

var web3 = require('web3');

var config = 'config.json';

var toString = function (obj) {
    return obj.toString();
};

var config = fs.readFileAsync('config.json')
.then(toString)
.then(JSON.parse);

var name = 'ClientReceipt';

var readAbi = function () {
    return fs.readFileAsync(path.join('contracts', name + '.abi')).then(toString).then(JSON.parse);
};

var readBinary = function () {
    return fs.readFileAsync(path.join('contracts', name + '.binary')).then(toString);
};

var ClientReceiptAbi    = exec('cd contracts && solc --inputFile '+ name +'.sol --json-abi file --add-std 1').then(readAbi);
var ClientReceiptBinary = exec('cd contracts && solc --inputFile '+ name +'.sol --binary file --add-std 1').then(readBinary);

Promise.all([config, ClientReceiptAbi, ClientReceiptBinary]).then(function (arr) {
    var config = arr[0];
    var abi = arr[1];
    var code = '0x' + arr[2];
    var host = config.jsonrpc;

    web3.setProvider(new web3.providers.HttpProvider(host));

    //var namereg = config.namereg === 'default' ? web3.eth.namereg.address : config.namereg;
    var from = config.from === "coinbase" ? web3.eth.coinbase : config.coinbase;
    var institution = config.institution;
    web3.eth.namereg.reserve(institution, {from: from});

    var contract = web3.eth.contract(abi).new({ from: from, gas: 2500000, data: code });
    web3.eth.namereg.setAddress(institution, contract.address, true, {from: from});
    return contract.address;
}).catch(function (err) {
    console.error(err);
}).done(function (address) {
    console.log("CONTRACT ADDRESS: " + address);
    process.exit();
});

