import { useEffect, useState } from 'react';
import {
	Button,
	Center,
	Checkbox,
	Heading,
	Stack,
	Text,
	Tooltip,
	useDisclosure,
} from '@chakra-ui/react';
import { BalanceData } from '@/types';
import { BigNumberish, Utils } from 'alchemy-sdk';
import RecycleModal from './RecycleModal';
import { multicall } from '@/utils/multicall';
import { ContractCallContext, Multicall } from 'ethereum-multicall';
import { useAccount, useProvider } from 'wagmi';

type PoolCheckboxProps = {
	label: string;
	tokens: BalanceData[];
};

export default function PoolCheckbox({ tokens, label }: PoolCheckboxProps) {
	const [checkedItems, setCheckedItems] = useState(new Array(tokens.length).fill(false));
	const [approved, setApproved] = useState<Boolean[]>([]);
	const { isOpen, onOpen, onClose } = useDisclosure();

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

	const { address } = useAccount();
	const provider = useProvider();

	const checkAllowance = async (
		contractCallContext: ContractCallContext[],
		tokens: BalanceData[]
	) => {
		console.log('checking allowance');

		let ifallowance: Boolean[] = [];
		const _multicall = new Multicall({ ethersProvider: provider, tryAggregate: true });
		const results = await _multicall.call(contractCallContext);
		let calls = results.results;
		console.log(calls);
		console.log(tokens);

		let allowances: string[] = [];
		Object.keys(calls).map((keyname) => {
			allowances.push(calls[keyname].callsReturnContext[0].returnValues[0].hex);
		});
		tokens.map((e, i) => {
			let amount = Utils.formatUnits(e.balance.tokenBalance as BigNumberish, e.tokenData.decimals!);
			let allowance = Utils.formatEther(parseInt(allowances[i]).toString());
			console.log(+allowance);
			console.log(+amount);

			ifallowance.push(+allowance >= +amount);
		});
		return ifallowance;
	};

	useEffect(() => {
		console.log('waiting');

		const contractCallContext = multicall(tokens, address as `0x${string}`);
		const fx = async () => {
			const x = await checkAllowance(contractCallContext, tokens);
			console.log(x);
			setApproved(x);
			console.log(approved);
		};

		fx();
	}, []);

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
				<Center>
					<Tooltip
						color='red'
						label={checkedItems.every((bool) => bool === false) && '**choose tokens to recycle**'}
					>
						<Button
							maxW='150'
							// onClick={handleRecycle}
							onClick={onOpen}
							isDisabled={checkedItems.every((bool) => bool === false)}
						>
							RECYCLE
						</Button>
					</Tooltip>
					<RecycleModal
						isOpen={isOpen}
						onClose={onClose}
						tokens={tokens}
						isChecked={checkedItems}
						isApproved={approved}
					/>
				</Center>
			</Stack>
		</>
	);
}
