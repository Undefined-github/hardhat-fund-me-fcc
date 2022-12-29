const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

const DECIMALS = 8
const INITIAL_PRICE = 200000000000

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId = network.config.chainId

    if (chainId == 31337 || developmentChains.includes(network.name)) {
        log("Local network detected. Enabling mocks... Deploying mocks...")
        await deploy("MockV3Aggregator", {
            contract: "MockV3Aggregator",
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })

        log("Enabled mocks.")
        log("Deployed mocks.")
        log("-------------------------------------------------------------")
    }
}

module.exports.tags = ["all", "mocks"]
