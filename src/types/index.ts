import { TokenBalance, TokenMetadataResponse } from 'alchemy-sdk';

export type BalanceProps = {
	address: `0x${string}` | undefined;
};

export type BalanceData = {
	balance: TokenBalance;
	tokenData: TokenMetadataResponse;
	isLong: Boolean;
	hrBalance: string;
};

export type TransactionProps = {
	token: BalanceData;
};
