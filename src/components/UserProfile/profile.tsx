import { Button, Menu, MenuButton, MenuList, MenuItem, Text, Stack } from '@chakra-ui/react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Chains } from './chains';
import { Balance } from './balance';

export function Profile() {
	const { address, connector, isConnected } = useAccount();
	const { connect, connectors, error, isLoading, pendingConnector } = useConnect();
	const { disconnect } = useDisconnect();

	return (
		<>
			<Menu>
				<MenuButton as={Button}>{isConnected ? address : 'Connect Wallet'}</MenuButton>
				<MenuList>
					{isConnected ? (
						<>
							<Stack spacing={4} p={4}>
								<Text>{address}</Text>
								<Balance userAddress={address} />
								<Text>Connected to {connector!.name}</Text>
							</Stack>
							<MenuItem onClick={() => disconnect()}>Disconnect</MenuItem>
						</>
					) : (
						<>
							{connectors.map((connector) => (
								<MenuItem
									disabled={!connector.ready}
									key={connector.id}
									onClick={() => connect({ connector })}
								>
									{connector.name}
									{isLoading && connector.id === pendingConnector?.id && ' (connecting)'}
								</MenuItem>
							))}
						</>
					)}
				</MenuList>
			</Menu>

			{isConnected && <Chains />}

			{error && <div>{error.message}</div>}
		</>
	);
}
