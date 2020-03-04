// sometimes test run MAY freeze (?)

const {use, expect} = require('chai');
const {solidity, createMockProvider, getWallets, deployContract} = require('ethereum-waffle');
// change path
const Counter = require('../artifacts/Counter.json');
// MAKE SURE the tests are in 'test' folder or this will fail
import { waffle } from "@nomiclabs/buidler";


// use(solidity); // do not need

describe('Counter smart contract', () => {
    // import buidlers provider
  // const provider = createMockProvider();
  const provider = waffle.provider;

  const [wallet] = getWallets(provider);

  async function deployCounter (initialValue:any) {
    const counter = await deployContract(
      wallet, // a wallet to sign transactions
      Counter, // the compiled output
      [initialValue], // arguments to the smart contract constructor
    );
    return counter; // an ethers 'Contract' class instance
  }

  it('sets initial value in the constructor', async () => {
    const counter = await deployCounter(200);
    expect(await counter.value()).to.equal(200);
  });

  it('can increment the value', async () => {
    const counter = await deployCounter(200);
    await counter.increment(42);
    expect(await counter.value()).to.equal(242);
  });

  it('emits the Increment event', async () => {
    const counter = await deployCounter(200);
    await expect(counter.increment(42))
      .to.emit(counter, 'Increment')
      .withArgs(42);
  });
});