import { useState } from 'react';
import { Button, Checkbox, Heading, Stack, Text } from '@chakra-ui/react';
import { BalanceData } from '@/types';
import { Utils } from 'alchemy-sdk';

type CheckboxListProps = {
	label: string;
	tokens: BalanceData[];
};

export default function CheckboxList({ tokens, label }: CheckboxListProps) {
	const [checkedItems, setCheckedItems] = useState(new Array(tokens.length).fill(false));

	const allChecked = checkedItems.every(Boolean);
	const isIndeterminate = checkedItems.some(Boolean) && !allChecked;

	const handleCheckAll = (event: React.ChangeEvent<HTMLInputElement>) => {
		const isChecked = event.target.checked;
		setCheckedItems(new Array(tokens.length).fill(isChecked));
	};

	const handleCheckItem = (index: number) => {
		const newCheckedItems = [...checkedItems];
		newCheckedItems[index] = !newCheckedItems[index];
		setCheckedItems(newCheckedItems);
	};

	function handleRecycle(): import('react').MouseEventHandler<HTMLButtonElement> | undefined {
		// throw new Error('Function not implemented.');
		console.log(checkedItems);
		return;
	}

	return (
		<>
			<Stack bg='gray.500' p={10} rounded={'xl'}>
				<Checkbox
					size='lg'
					as='b'
					isChecked={allChecked}
					isIndeterminate={isIndeterminate}
					isDisabled={!tokens.length}
					onChange={handleCheckAll}
				>
					<Heading size='lg'>{label}</Heading>
				</Checkbox>
				<Stack pl={6} mt={1} spacing={1}>
					{tokens.map((token, index) => (
						<Checkbox
							key={token.tokenData.symbol}
							isChecked={checkedItems[index]}
							onChange={() => handleCheckItem(index)}
						>
							{/* {token.tokenData.name} : */}
							<Text as='b'>{token.tokenData.symbol} </Text>
							<Text as='i'>
								{token.isLong ? token.hrBalance : Utils.formatUnits(token.balance.tokenBalance!)}
							</Text>
						</Checkbox>
					))}
				</Stack>
				<Stack align='center'>
					<Button maxW='150' onClick={handleRecycle()}>
						RECYCLE
					</Button>
					<Text color='red.600'>{!allChecked && '**choose tokens to recycle**'}</Text>
				</Stack>
			</Stack>
		</>
	);
}
