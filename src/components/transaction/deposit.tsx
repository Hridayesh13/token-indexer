import { BalanceData, TransactionProps } from '@/types';
import { Button, Stack, Text } from '@chakra-ui/react';
import { BigNumber, ethers } from 'ethers';
import {
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
	useNetwork,
} from 'wagmi';
import { MintTxn } from './mint';

const depositABI = {
	inputs: [
		{
			internalType: 'address',
			name: 'tokenAddress',
			type: 'address',
		},
		{
			internalType: 'uint256',
			name: 'amount',
			type: 'uint256',
		},
	],
	name: 'deposit',
	outputs: [],
	stateMutability: 'nonpayable',
	type: 'function',
} as const;

const pooladdress = '0xA48866964ff3fb9A6DF7BF69ef004572e4505F00' as `0x${string}`;

export function DepositTxn({ token }: TransactionProps) {
	const { chain } = useNetwork();
	let c = BigNumber.from(token.balance.tokenBalance);
	console.log(c);
	const depositArgs: [`0x${string}`, ethers.BigNumber] = [
		token.balance.contractAddress as `0x${string}`,
		c,
	];

	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: pooladdress,
		abi: [depositABI],
		args: depositArgs,
		functionName: 'deposit',
	});

	const { data, error, isError, write } = useContractWrite(config);

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return (
		<>
			<Stack align={'center'}>
				<Button isDisabled={!write || isLoading || isSuccess} onClick={() => write?.()}>
					{isLoading ? 'Depositing...' : isSuccess ? 'Deposited' : 'Deposit'}
				</Button>
				{isSuccess && (
					<>
						<Text as='u'>
							<a
								target='_blank'
								href={`${chain?.blockExplorers?.default.url}/tx//${data?.hash}`}
								rel='noopener noreferrer'
							>
								{chain?.blockExplorers?.default.name}
							</a>
						</Text>
						<MintTxn />
					</>
				)}
				{(isPrepareError || isError) && <Text>Error: {(prepareError || error)?.message}</Text>}
			</Stack>
		</>
	);
}
