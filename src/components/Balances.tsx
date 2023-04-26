import { BalanceData, BalanceProps } from '@/types';
import getBalanceData from '@/utils/balance';
import { Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useNetwork } from 'wagmi';
import TokenCheckbox from './checkbox';

const Balances = ({ address }: BalanceProps) => {
	const [results, setResults] = useState<BalanceData[] | never[]>([]);
	const [isLoaded, setLoaded] = useState(false);
	const { chain } = useNetwork();

	useEffect(() => {
		console.log('running useffect');
		setLoaded(false);
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
					<TokenCheckbox tokens={results} />
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
