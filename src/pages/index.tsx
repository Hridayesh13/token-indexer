import Balances from '@/components/Balances';
import { Text } from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useEffect, useState } from 'react';
import { useAccount } from 'wagmi';

type Props = {
	isConnected: boolean;
};
export default function Home() {
	const [mounted, setMounted] = useState(false);
	useEffect(() => setMounted(true), []);

	const { address, isConnected } = useAccount({
		onConnect({ address, connector, isReconnected }) {
			console.log('Connected', { address, connector, isReconnected });
		},
	});

	return (
		<>
			{mounted && isConnected ? (
				<>
					<Balances address={address} />
				</>
			) : (
				<Text>Connect wallet first</Text>
			)}
		</>
	);
}

// export const getServerSideProps: GetServerSideProps<Props> = async () => {
// 	// Get the initial state of the Wagmi client
// 	const { isConnected } = await getInitialWagmiState();

// 	// Pass the initial state to the client
// 	return { props: { isConnected } };
// };

// const getInitialWagmiState = async () => {
// 	// Initialize the Wagmi client with autoconnect set to true
// 	// const wagmi = useWagmi({ autoConnect: true });

// 	// // Wait for the client to connect to the wallet
// 	// await wagmi.connect();

// 	// // Get the current state of the client
// 	// const wagmiState = wagmi.getState();

// 	const { isConnected } = useAccount();

// 	return { isConnected };
// };
