import { TokenBalance, TokenMetadataResponse } from 'alchemy-sdk';

export type BalanceProps = {
	address: `0x${string}` | undefined;
};
export type BalanceData = {
	balance: TokenBalance;
	tokenData: TokenMetadataResponse;
};
