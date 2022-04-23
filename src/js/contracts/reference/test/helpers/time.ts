import hre from 'hardhat';

export const increaseNextBlockTsBy = async (secondsToIncrease: number, skipMine: boolean = false) => {
  await hre.network.provider.send("evm_increaseTime", [secondsToIncrease]);

  if (!skipMine) {
    await hre.network.provider.send("evm_mine");
  }
};

export const increaseNextBlockTs = async (nextTimestamp: number, skipMine: boolean = false) => {
  await hre.network.provider.send("evm_setNextBlockTimestamp", [nextTimestamp]);

  if(!skipMine) {
    await hre.network.provider.send("evm_mine");
  }
};
