import { HStack } from '@chakra-ui/react';
import { Chains } from './chains';
import { Profile } from './profile';

export default function UserProfile() {
	return (
		<>
			<HStack spacing={4}>
				<Profile />
				{/* <Chains /> */}
			</HStack>
		</>
	);
}
