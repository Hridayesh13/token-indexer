import { Button, Menu, MenuButton, MenuItem, MenuList, Text } from '@chakra-ui/react';
import { useNetwork, useSwitchNetwork } from 'wagmi';

export function Chains() {
	const { chain } = useNetwork();
	const { chains, error, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();

	return (
		<>
			{/* {chain && <div>Connected to {chain.name}</div>} */}

			<Menu>
				<MenuButton as={Button}>{chain?.name || 'Select Network'}</MenuButton>

				<MenuList>
					{chains.length ? (
						<>
							{chains.map((x) => (
								<MenuItem
									disabled={!switchNetwork || x.id === chain?.id}
									key={x.id}
									onClick={() => switchNetwork?.(x.id)}
								>
									{x.name}
									{isLoading && pendingChainId === x.id && ' (switching)'}
								</MenuItem>
							))}
						</>
					) : (
						<MenuItem>Connect first</MenuItem>
					)}
				</MenuList>
			</Menu>

			<div>{error && error.message}</div>
		</>
	);
}
