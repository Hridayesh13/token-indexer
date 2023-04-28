import { Button, Stack, Text } from '@chakra-ui/react';
import {
	usePrepareContractWrite,
	useContractWrite,
	useWaitForTransaction,
	useNetwork,
	useAccount,
} from 'wagmi';

const nftABI = {
	inputs: [
		{
			internalType: 'address',
			name: 'to',
			type: 'address',
		},
	],
	name: 'mintRandom',
	outputs: [],
	stateMutability: 'nonpayable',
	type: 'function',
};

const nftaddress = '0x4e445b6f01236d6647F959F06CEebd7C076d387b' as `0x${string}`;

export function MintTxn() {
	const { chain } = useNetwork();
	const { address } = useAccount();
	const mintArgs = [address!];

	const {
		config,
		error: prepareError,
		isError: isPrepareError,
	} = usePrepareContractWrite({
		address: nftaddress,
		abi: [nftABI],
		args: mintArgs,
		functionName: 'mintRandom',
	});

	const { data, error, isError, write } = useContractWrite(config);

	const { isLoading, isSuccess } = useWaitForTransaction({
		hash: data?.hash,
	});

	return (
		<>
			<Stack align={'center'}>
				<Button isDisabled={!write || isLoading || isSuccess} onClick={() => write?.()}>
					{isLoading ? 'Minting...' : isSuccess ? 'Minted' : 'Mint'}
				</Button>
				{isSuccess && (
					<Text as='u'>
						<a
							target='_blank'
							href={`${chain?.blockExplorers?.default.url}/tx//${data?.hash}`}
							rel='noopener noreferrer'
						>
							{chain?.blockExplorers?.default.name}
						</a>
					</Text>
				)}
				{(isPrepareError || isError) && <Text>Error: {(prepareError || error)?.message}</Text>}
			</Stack>
		</>
	);
}
