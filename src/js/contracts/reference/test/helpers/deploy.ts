import {deployments} from "hardhat";
import {
  deployMinepunks as deployMinepunksScript,
  deployMinepunksAccessory as deployMinepunksAccessoryScript
} from '../../deploy/minepunks';
import {deployStaking as deployStakingScript} from '../../deploy/agreement-factory';
import {deployBurpErc20Token as deployBurpErc20TokenScript} from '../../deploy/spiceToken';
import {deployRewardVault as deployRewardVaultScript} from '../../deploy/rewardVault';
import {StakingLibV2Base, StakingV2, AccessControl} from '../../typechain';
import { toWei } from "../../helpers/utils";

export const deployMinepunks = async () => {
  await deployments.fixture('empty');
  
  const minepunksInstance = await deployMinepunksScript();

  return minepunksInstance;
}

export const deployMinepunksAccessory = async () => {
  // await deployments.fixture('empty');
  
  const minepunksInstance = await deployMinepunksAccessoryScript();

  return minepunksInstance;
}

export const deployStaking = async (options: any = {}): Promise<[StakingV2, any]> => {
  await deployments.fixture('empty');

  const minepunksInstance = await deployMinepunks();
  const safeToken: AccessControl = options.token || await deployBurpErc20TokenScript();
  const safeRewardVault = options.rewardVault || await deployRewardVaultScript({deployParams: {
    token: safeToken.address
  }});

  const deployStakingOptions = {
    // stakingLibV2Core: '0x0000000000000000000000000000000000000000',
    // stakingLibV2Base: '0x0000000000000000000000000000000000000000',
    deployParams: {
      token: safeToken.address,
      rewardVault: safeRewardVault.address,
      minepunks: minepunksInstance.address
    }
  }
  
  const stakingInstance = await deployStakingScript(deployStakingOptions);

  await minepunksInstance.setStaking(stakingInstance.address);
  await safeRewardVault.addController(stakingInstance.address);

  return [stakingInstance, {minepunksInstance, tokenInstance: safeToken, rewardVaultInstance: safeRewardVault}];
}