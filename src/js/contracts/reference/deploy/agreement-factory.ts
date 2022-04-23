import hre from 'hardhat';
import { getNamedAccount } from '../helpers/accounts';
import {AgreementFactory} from '../typechain';
import {getParams, DeployParams} from '../constants/agreement-factory';

const {deployments, ethers} = hre;
  
const {deploy} = deployments;

type DeployOptions = {
  deployParams?: DeployParams
}
export const deployAgreementFactory = async (options: DeployOptions = {}): Promise<AgreementFactory> => {
  const deployParams = await getParams(options.deployParams);

  await deploy('AgreementFactory', {
    from: await getNamedAccount('deployer'),
    args: [
      deployParams.host
    ],
    libraries: {
      CFAv1Library: '0xECa8056809e7e8db04A8fF6e4E82cD889a46FE2F'
    },
    ...options
  });

  const agreementFactoryInstance = await ethers.getContract("AgreementFactory") as AgreementFactory;
  
  return agreementFactoryInstance;
}

const deployScript = async () => {
  await deployAgreementFactory();
};

deployScript.tags = ['AgreementFactory'];
export default deployScript
