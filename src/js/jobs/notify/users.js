const Web3 = require('web3');
const contractAbi = require('./AgreementNFT.json');
const {privKey} = require('./secrets.json');

const web3 = new Web3('https://rinkeby.infura.io/v3/c496f028195f42b396644bc0a8ddd5b6');
const contractAddress = process.env.SUPER_NFT_ADDRESS;
web3.eth.accounts.wallet.add(privKey);

const loadPastEvents = async () => {
  try {
    const contract = new web3.eth.Contract(contractAbi, contractAddress);
    
    const events = await contract.getPastEvents('Transfer',
    {
      filters: {from: '0x0000000000000000000000000000000000000000'},
      fromBlock: 0,
      toBlock: 'latest'
    })
    
    return events.map(e => e.returnValues.to)
  }
  catch(e) {
    console.error('Failed to load Transfer events')
    return []
  }
};

const getAllUsers = async () => {
  const users = await loadPastEvents()

  return users
}

module.exports = {
  getAllUsers
}
