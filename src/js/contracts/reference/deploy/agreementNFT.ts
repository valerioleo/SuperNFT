import {HardhatRuntimeEnvironment} from 'hardhat/types';
import hre from 'hardhat';
import { getNamedAccount } from '../helpers/accounts';
import {toWei} from '../helpers/utils';
import {AgreementNFT, SVG} from '../typechain';
import {getParams, DeployParams} from '../constants/staking';

const {deployments, ethers} = hre as HardhatRuntimeEnvironment;
const {deploy, execute} = deployments;

export const deployStaking = async () => {
  
}

const deployScript = async () => {
  await deploy ('SVG', {
    from: await getNamedAccount('deployer'),
    log: true
  });
  const lib = await ethers.getContract("SVG") as SVG;
  await deploy('AgreementNFT', {
    from: await getNamedAccount('deployer'),
    log: true,
    libraries: {
      SVG: lib.address
    },
    args: ['0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6']
  });

  const instance = await ethers.getContract("AgreementNFT") as AgreementNFT;


  await execute(
    'AgreementNFT',
    {from: await getNamedAccount('deployer'), log: true},
    'mint',
    '0xDA172dff49316843ef6FCd848F1fEDcDCa8A3E8c', // sender
    '0xf9BeB989B62EaE2b763d6E59E142D73b4460e457', // recipient
    'Test 1',
    0,
    '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90', // fDAI
    '0x'
  );

  return instance;

};

deployScript.tags = ['AgreementNFT'];
export default deployScript
