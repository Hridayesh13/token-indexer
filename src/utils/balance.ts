import { BalanceData } from '@/types';
import { Alchemy, Network, Utils } from 'alchemy-sdk';
const HRNumbers = require('human-readable-numbers');

const getBalanceData = async (userAddress: string, chainId: number) => {
	let network: Network;
	switch (chainId) {
		case 1:
			network = Network.ETH_MAINNET;
			break;
		case 5:
			network = Network.ETH_GOERLI;
			break;
		case 137:
			network = Network.MATIC_MAINNET;
			break;
		case 80001:
			network = Network.MATIC_MUMBAI;
			break;
		default:
			throw new Error(`Unsupported chain ID: ${chainId}`);
	}
	const config = {
		apiKey: process.env.ALCHEMY_API,
		network: network,
	};

	const alchemy = new Alchemy(config);

	const data = await alchemy.core.getTokenBalances(userAddress);
	const tokenDataPromises = data.tokenBalances.map((balance) =>
		alchemy.core.getTokenMetadata(balance.contractAddress)
	);
	const tokenData = await Promise.all(tokenDataPromises);
	const balanceData: BalanceData[] = data.tokenBalances.map((balance, index) => ({
		balance,
		tokenData: tokenData[index],
		isLong: Utils.formatUnits(balance.tokenBalance!).length > 5,
		hrBalance: HRNumbers.toHumanString(Utils.formatUnits(balance.tokenBalance!)),
	}));

	return balanceData;
};

export default getBalanceData;
