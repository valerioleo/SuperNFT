import {HardhatRuntimeEnvironment} from 'hardhat/types';
import hre from 'hardhat';
import { getNamedAccount } from '../helpers/accounts';
import {toWei} from '../helpers/utils';
import {StakingLibV2Base, StakingV2} from '../typechain';
import {getParams, DeployParams} from '../constants/staking';

const {deployments, ethers} = hre as HardhatRuntimeEnvironment;
const {deploy, execute} = deployments;

const deployTokenHelperLib = async (options = {}): Promise<any> => {
  await deploy('TokenHelper', {
    from: await getNamedAccount('deployer'),
    ...options
  })

  const instance = await ethers.getContract("TokenHelper");
  
  return instance;
};

const deployStakingLibBase = async (options = {}): Promise<StakingLibV2Base> => {
  await deploy('StakingLibV2Base', {
    from: await getNamedAccount('deployer'),
    ...options
  })

  const instance = await ethers.getContract("StakingLibV2Base") as StakingLibV2Base;
  
  return instance;
};

type DeployStakingLibCoreOptions = {
  libraries: {
    TokenHelper: string,
    StakingLibV2Base: string
  }
}

// TODO: use correct reutrn type -- currently not working with typechain
const deployStakingLibCore = async (options: DeployStakingLibCoreOptions): Promise<any> => {
  await deploy('StakingLibV2Core', {
    from: await getNamedAccount('deployer'),
    ...options
  })

  const instance = await ethers.getContract("StakingLibV2Core");
  
  return instance;
};


type DeployStakingOptions = {
  stakingLibV2Core?: string;
  stakingLibV2Base?: string;
  deployParams?: any;
  deployOptions?: any
}
export const deployStaking = async (options: DeployStakingOptions = {}) => {
  const {deployParams} = options

  const {address: burpErc20TokenInInstance} = (await deployBurpErc20Token());
  const {address: tokenHelperInstance} = (await deployTokenHelperLib());
  const {address: safeStakingLibBase} = (await deployStakingLibBase());
  const {address: safeStakingLibV2Core} = await deployStakingLibCore({libraries: {
    TokenHelper: tokenHelperInstance,
    StakingLibV2Base: safeStakingLibBase
  }});

  const deployRewardVaultsOptions = {
    deployParams: {
      token: burpErc20TokenInInstance
    }
  };

  const safeRewardVault = deployParams.rewardVault || (await deployRewardVault(deployRewardVaultsOptions)).address;
  const safeToken = deployParams.token || (await deployBurpErc20Token()).address;
  const safeMinepunks = deployParams.minepunks || (await deployMinepunks()).address;
  const argsObj = await getParams({
    ...deployParams,
    token: safeToken,
    rewardVaultInstance: safeRewardVault,
  } as DeployParams);

  await deploy('StakingV2', {
    from: await getNamedAccount('deployer'),
    log: true,
    ...options.deployOptions,
    libraries: {
      StakingLibV2Core: safeStakingLibV2Core,
      StakingLibV2Base: safeStakingLibBase
    },
    proxy: {
      proxyContract: 'OpenZeppelinTransparentProxy',
      execute: {
        init: {
          methodName: 'initialize',
          args: [
            argsObj.token,
            argsObj.endTs,
            argsObj.ticketsMintingRatio,
            argsObj.ticketsMintingChillPeriod,
            argsObj.periodsStartTs,
            argsObj.periodsRewardsPerSecond,
            safeRewardVault,
            safeMinepunks
          ]
        }
      }
    }
  });

  const instance = await ethers.getContract("StakingV2") as StakingV2;

  return instance;
}

const deployScript = async () => {
  const stakingInstance = await deployStaking({deployParams: {}});

  const rewardVaultDeployment = await deployments.get('RewardVault');

  await execute(
    'RewardVault',
    {from: await getNamedAccount('deployer'), log: true},
    'addController',
    stakingInstance.address
  );

  await execute(
    'Minepunks',
    {from: await getNamedAccount('deployer'), log: true},
    'setStaking',
    stakingInstance.address
  );
};

deployScript.tags = ['Staking'];
export default deployScript
