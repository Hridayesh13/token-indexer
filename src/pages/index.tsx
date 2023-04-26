import Balances from '@/components/Balances';
import { Stack, Text } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

export default function Home() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const { address, isConnected } = useAccount();

	return (
		<>
			<Stack w='100%'>
				{mounted && isConnected ? (
					<>
						<Balances address={address} />
					</>
				) : (
					<Text>Connect wallet first</Text>
				)}
			</Stack>
		</>
	);
}
