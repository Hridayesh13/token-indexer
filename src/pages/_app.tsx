import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '@/components/layout';
import '@rainbow-me/rainbowkit/styles.css';

import { createClient, configureChains, WagmiConfig } from 'wagmi';
import { polygon, polygonMumbai, goerli } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { getDefaultWallets, RainbowKitProvider } from '@rainbow-me/rainbowkit';

const { chains, provider, webSocketProvider } = configureChains(
	[
		// mainnet,
		polygon,
		// optimism,
		// arbitrum,
		...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === 'true' ? [goerli, polygonMumbai] : []),
	],
	[alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API as string }), publicProvider()]
);

const { connectors } = getDefaultWallets({
	appName: 'RainbowKit App',
	projectId: 'YOUR_PROJECT_ID',
	chains,
});

const wagmiClient = createClient({
	autoConnect: true,
	connectors,
	provider,
	webSocketProvider,
});

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<WagmiConfig client={wagmiClient}>
				<RainbowKitProvider chains={chains} modalSize='compact'>
					<ChakraProvider>
						<Layout>
							<Component {...pageProps} />
						</Layout>
					</ChakraProvider>
				</RainbowKitProvider>
			</WagmiConfig>
		</>
	);
}
