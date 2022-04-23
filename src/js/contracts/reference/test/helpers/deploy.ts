import {deployments} from "hardhat";
import {deployAgreementFactory as deployAgreementFactoryScript} from '../../deploy/agreement-factory';
import { toWei } from "../../helpers/utils";

export const deployAgreementFactory = async () => {
  await deployments.fixture('empty');
  
  const agreementFactoryInstance = await deployAgreementFactoryScript();

  return agreementFactoryInstance;
}
