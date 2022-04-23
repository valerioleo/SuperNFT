import {expect} from "chai";
import {ethers, deployments} from "hardhat";
import {soliditySha3} from 'web3-utils';
import {deployMinepunks, deployMinepunksAccessory} from './helpers/deploy';
import {findDifficulty, countInitialZeros} from './helpers/minepunks';

const mintNextToken = async (): Promise<[string, any]> => {
  const minepunksInstance = await deployMinepunks();

  const res = await minepunksInstance.mint();

  return ['0', {minepunksInstance}];
}

describe("Minepunks - ctor", function () {
  it("Should return the mint a minepunk with correct difficulty", async function () {
    const minepunksInstance = await deployMinepunks();

    const [signer] = await ethers.getSigners();

    await minepunksInstance.deployed();

    await minepunksInstance.mintWithNonce('302');
    
    const ownerOf = await minepunksInstance.ownerOf(0);
    
    expect(ownerOf).to.equal(signer.address);
    
    const tokenMetadata = await minepunksInstance.tokenMetadata(0);

    expect(tokenMetadata.difficulty).to.equal(2);
    expect(tokenMetadata.firstOwner).to.equal(signer.address);
  });
  
  it("Should mint an default minepunk", async function () {
    const minepunksInstance = await deployMinepunks();
  
    const [signer] = await ethers.getSigners();

    await minepunksInstance.deployed();
  
    await minepunksInstance.mint();
    
    const ownerOf = await minepunksInstance.ownerOf(0);
    
    expect(ownerOf).to.equal(signer.address);
    
    const tokenMetadata = await minepunksInstance.tokenMetadata(0);
  
    expect(tokenMetadata.difficulty).to.equal(0);
    expect(tokenMetadata.firstOwner).to.equal(signer.address);
  });

  it.only("Should return the svg image for the minepunk", async function () {
    const minepunksInstance = await deployMinepunks();
    const minePunksAccessory = await deployMinepunksAccessory()

    const [signer] = await ethers.getSigners();

    await minepunksInstance.deployed();
    await minePunksAccessory.deployed();

    await minepunksInstance.mintWithNonce(302);

    await minePunksAccessory.setTrait(0, 'hand', 'sword');
    await minePunksAccessory.setTrait(1, 'head', 'hat');

    await minepunksInstance.updateAccessory(0, minePunksAccessory.address, 0);
    await minepunksInstance.updateAccessory(0, minePunksAccessory.address, 1);

    const meta = await minepunksInstance.tokenUri(0);
    const svgImage = await minepunksInstance.generateSvg(0);

    console.log('==> -> meta', meta)
    console.log('==> -> svgImage', svgImage)
  });
});

describe("Minepunks - getHashFromTokenIdAndNonce", function () {
  it("Should return correct hash", async function () {
    const [tokenId, {minepunksInstance}] = await mintNextToken();
    
    const nonce = 123;

    const [signer] = await ethers.getSigners();
    const hash = soliditySha3(signer.address, tokenId, '0', nonce);

    const hashFromContraxct = await minepunksInstance.getHashFromTokenIdAndNonce(tokenId, nonce);

    expect(hashFromContraxct).to.equal(hash);
  });
});

describe("Minepunks - getNumbersOfZerosFromHash", function () {
  it("Should return correct number of leading zeros", async function () {
    const [tokenId, {minepunksInstance}] = await mintNextToken();

    const [signer] = await ethers.getSigners();

    const nonce = findDifficulty(tokenId, signer.address);

    const hash = soliditySha3(signer.address, tokenId, '0', nonce);

    const hashFromContraxct = await minepunksInstance.getHashFromTokenIdAndNonce(tokenId, nonce);

    expect(hashFromContraxct).to.equal(hash);

    const expectedZeros = countInitialZeros(hashFromContraxct);

    const contractZeros = await minepunksInstance.getNumbersOfZerosFromHash(hash);

    expect(expectedZeros).to.equal(contractZeros);
  });
});

describe("Minepunks - raise level", function () {
  it("Should raise difficulty corretly", async function () {
    const [tokenId, {minepunksInstance}] = await mintNextToken();

    const {difficulty: currentTokenDifficulty} = await minepunksInstance.tokenMetadata(tokenId);
    const [signer] = await ethers.getSigners();

    const nonce = findDifficulty(tokenId, signer.address);

    await minepunksInstance.raiseLevelWithNonce(tokenId, nonce);
    const {difficulty: newDifficulty} = await minepunksInstance.tokenMetadata(tokenId);

    expect(newDifficulty).to.be.greaterThan(currentTokenDifficulty);
  });
  
  it("Should store the total difficulty correctly", async function () {
    const [tokenId, {minepunksInstance}] = await mintNextToken();
    
    const {difficulty: currentTokenDifficulty} = await minepunksInstance.tokenMetadata(tokenId);

    expect(await minepunksInstance.totalDifficulty()).to.equal(0);

    const [signer] = await ethers.getSigners();

    const nonce = findDifficulty(tokenId, signer.address);

    await minepunksInstance.raiseLevelWithNonce(tokenId, nonce);
    const {difficulty: newDifficulty} = await minepunksInstance.tokenMetadata(tokenId);

    expect(newDifficulty).to.be.greaterThan(currentTokenDifficulty);
    expect(await minepunksInstance.totalDifficulty()).to.equal(1);
  });
});
