import {expect} from "chai";
import {ethers, deployments} from "hardhat";
import {soliditySha3} from 'web3-utils';
import {deployAgreementFactory} from './helpers/deploy';
import {ZERO_ADDRESS} from '../constants/common';

describe("AgreementFactory - ctor", function () {
  it("Should deploy correctly", async function () {
    const agreementFactoryInstance = await deployAgreementFactory();

    console.log(agreementFactoryInstance.address)
  });
});
