const ERC20 = artifacts.require("ERC20");
const chalk = require('chalk');
const { assert, expect } = require('chai');

contract('ERC20', async (accounts) => {
  let instanceERC20;
  beforeEach(async() => {
    instanceERC20 = await ERC20.deployed();
  });

  it('check ERC20 name = "sample" ', async () => {
    const NAME_VALUE = 'sample';
    expect(await instanceERC20.name()).to.equal(NAME_VALUE);
  });

  it('check ERC20 symbol = "sample" ', async () => {
    const SYMBOL_VALUE = 'sample';
    expect(await instanceERC20.symbol()).to.equal(SYMBOL_VALUE);
  });

  it('check ERC20 decimals = 18', async () => {
    const DECIMALS_VALUE = 18;
    expect(parseFloat(await instanceERC20.decimals())).to.equal(DECIMALS_VALUE);
  });
});
