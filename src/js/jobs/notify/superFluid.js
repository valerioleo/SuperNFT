const {Framework} = require("@superfluid-finance/sdk-core")
const {ethers} = require("ethers")
const {privKey} = require("./secrets.json")
const BN = require('bignumber.js');

const provider = new ethers.providers.InfuraProvider(
  "kovan",
  "c496f028195f42b396644bc0a8ddd5b6"
);

const SECONDS_IN_DAY =  86_400 

const receiver = process.env.RECEIVER

let sf
let signer
let daix

const init = async () => {
  try{
    sf = await Framework.create({
      networkName: "kovan",
      provider
    });
    
    // create a signer
    signer = sf.createSigner({ privateKey: privKey, provider });
    
    // load the daix SuperToken via the Framework (using the token symbol)
    daix = await sf.loadSuperToken("fDAIx");
  }catch(e) {
    console.log(e)
  }
}
  
const getDaysLeft = async address => {
  try {
    const {flowRate} = await sf.cfaV1.getFlow({
       superToken: daix.address,
       sender: address,
       receiver,
       providerOrSigner: provider
     });
   
     if(flowRate === '0') {
       return 0;
     }

    const netFlow = await sf.cfaV1.getNetFlow({
      superToken: daix.address,
      account: address,
      providerOrSigner: provider
    });

    const balance  = await daix.balanceOf({
      account: address,
      providerOrSigner: provider
    });

    const secondsLeft = BN(balance).dividedBy(BN(netFlow.split('-')[1]))
    const daysLeft = secondsLeft.dividedBy(SECONDS_IN_DAY)
    return daysLeft
  }
  catch(e) {
    console.log(e)
  }
}

module.exports = {
  init,
  getDaysLeft
}