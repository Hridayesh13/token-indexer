import { Grid, Heading, ListItem, Stack, Text, UnorderedList } from '@chakra-ui/react';
import { BalanceData } from '@/types';
import CheckboxList from './checkbox2';
import { Utils } from 'alchemy-sdk';

type TokenCheckboxProps = {
	tokens: BalanceData[];
};

const POOLS = ['USDC', 'USDT', 'LINK'];

const TokenCheckbox = ({ tokens }: TokenCheckboxProps) => {
	const pools = tokens.filter((token) => POOLS.includes(token.tokenData.symbol!));
	const others = tokens.filter((token) => !pools.includes(token));
	return (
		<>
			<Grid templateColumns='repeat(2, 1fr)' gap={6} p={10}>
				<CheckboxList label='POOLS' tokens={pools} />
				{/* <CheckboxList label='OTHERS' tokens={others} /> */}
				<Stack bg='gray.500' p={10} rounded='xl'>
					<Heading size='lg'>OTHERS</Heading>
					<UnorderedList>
						{others.map((token, i) => {
							return (
								<ListItem ml={6} key={i}>
									<Text as='b'>{token.tokenData.symbol} </Text>
									<Text as='i'>
										{token.isLong
											? token.hrBalance
											: Utils.formatUnits(token.balance.tokenBalance!)}
									</Text>
								</ListItem>
							);
						})}
					</UnorderedList>
				</Stack>
			</Grid>
		</>
	);
};

export default TokenCheckbox;
