const chalk = require('chalk');
const { assert, expect } = require('chai');

const CEREStable = artifacts.require("Ceres/CEREStable");

contract('CERES.sol', async (accounts) => {
  let instanceCERES;
  beforeEach(async() => {
    instanceCERES = await CEREStable.deployed();
  });

  it('check CERES name = "CERES" ', async () => {
    const NAME_VALUE = 'CERES';
    expect(await instanceCERES.name()).to.equal(NAME_VALUE);
  });

  it('check CERES symbol = "CERES" ', async () => {
    const SYMBOL_VALUE = 'CERES';
    expect(await instanceCERES.symbol()).to.equal(SYMBOL_VALUE);
  });
});
