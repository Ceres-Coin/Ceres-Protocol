const ConvertLib = artifacts.require("ConvertLib");
const MetaCoin = artifacts.require("MetaCoin");
const ERC20 = artifacts.require("ERC20");

module.exports = async function(deployer,network,accounts) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);

  await deployer.deploy(ERC20,"sample","sample");

  const sampleERC20 = await ERC20.deployed();
  console.log(`sampleERC20: ${sampleERC20.address}`);
};
