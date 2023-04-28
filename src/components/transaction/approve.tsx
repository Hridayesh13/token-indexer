import { BalanceData, TransactionProps } from '@/types';
import { Button, Stack, Text } from '@chakra-ui/react';
import { ethers } from 'ethers';
import * as React from 'react';
import {
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
	useAccount,
	useNetwork,
} from 'wagmi';
import { DepositTxn } from './deposit';

const approveABI = {
	name: 'approve',
	type: 'function',
	inputs: [
		{ name: '_spender', type: 'address' },
		{ name: '_value', type: 'uint256' },
	],
	outputs: [{ name: '', type: 'bool' }],
	constant: false,
	payable: false,
	stateMutability: 'nonpayable',
} as const;

const pooladdress = '0xA48866964ff3fb9A6DF7BF69ef004572e4505F00' as `0x${string}`;

export function ApproveTxn({ token }: TransactionProps) {
	const { chain } = useNetwork();

	const approveArgs: [`0x${string}`, ethers.BigNumber] = [pooladdress, ethers.constants.MaxUint256];

	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: token.balance.contractAddress as `0x${string}`,
		abi: [approveABI],
		args: approveArgs,
		functionName: 'approve',
	});

	const { data, error, isError, write } = useContractWrite(config);

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return (
		<>
			<Stack align={'center'}>
				<Button isDisabled={!write || isLoading || isSuccess} onClick={() => write?.()}>
					{isLoading ? 'Approving...' : isSuccess ? 'Approved' : 'Approve'}
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
						<DepositTxn token={token} />
					</>
				)}
				{(isPrepareError || isError) && <Text>Error: {(prepareError || error)?.message}</Text>}
			</Stack>
		</>
	);
}
