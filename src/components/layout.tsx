import { Flex } from '@chakra-ui/react';
import { ReactElement } from 'react';
import Navbar from './navigation/NavBar';

type LayoutProps = {
	children: ReactElement;
};

export default function Layout({ children }: LayoutProps) {
	return (
		<>
			<Navbar />
			<Flex w={'100vw'} h={'80vh'} px={'10vw'} justifyContent={'space-between'}>
				{children}
			</Flex>
		</>
	);
}
