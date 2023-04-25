import { BalanceData, BalanceProps } from '@/types';
import getBalanceData from '@/utils/balance';
import { Stack, Text } from '@chakra-ui/react';
import { Utils } from 'alchemy-sdk';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';

const Balances = ({ address }: BalanceProps) => {
	const [results, setResults] = useState<BalanceData[] | never[]>([]);
	const [isLoaded, setLoaded] = useState(false);
	const { chain } = useNetwork();

	useEffect(() => {
		console.log('running useffect');

		const fetchData = async () => {
			const response = await getBalanceData(address!, chain?.id!);
			setResults(response);
			setLoaded(true);
		};
		fetchData();
	}, [address, chain]);

	// console.log(results);

	return (
		<>
			{isLoaded ? (
				<>
					<Stack>
						{results.map((el, i) => {
							// console.log(el);
							return (
								<Text key={i}>
									{el.tokenData.name} : {Utils.formatUnits(el.balance.tokenBalance!)}{' '}
									{el.tokenData.symbol}
								</Text>
							);
						})}
					</Stack>
				</>
			) : (
				<>
					<Text>Loading balances ....</Text>
				</>
			)}
		</>
	);
};

export default Balances;
