import { Flex, Spacer, Button, Image, useColorMode } from '@chakra-ui/react';

import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import UserProfile from '../UserProfile';

const Navbar = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<Flex as='nav' align='center' justify='space-between' padding='1.8rem'>
			<Link href='/'>
				<Image src='/vercel.svg' alt='Logo' boxSize='100px' />
			</Link>
			<Spacer />
			<Button variant='ghost' minW='100px' rounded={'xl'}>
				<Link href={'/docs'}>Docs</Link>
			</Button>
			<Button onClick={toggleColorMode} rounded={'xl'} m={4}>
				{colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
			</Button>
			{/* <UserProfile /> */}
			<ConnectButton />
		</Flex>
	);
};

export default Navbar;
