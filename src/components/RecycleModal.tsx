import { BalanceData } from '@/types';
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	ModalFooter,
	Button,
	Text,
	Stack,
	Tooltip,
} from '@chakra-ui/react';
import { ApproveTxn } from './transaction/approve';
import { DepositTxn } from './transaction/deposit';

type RecycleModalProps = {
	isOpen: boolean;
	onClose: () => void;
	tokens: BalanceData[];
	isChecked: Boolean[];
	isApproved: Boolean[];
};

const RecycleModal = ({ isOpen, onClose, tokens, isChecked, isApproved }: RecycleModalProps) => {
	const n = isChecked.filter(Boolean).length;
	let j = 0;
	return (
		<>
			<Modal isCentered closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
				<ModalOverlay bg='blackAlpha.300' backdropFilter='blur(10px) ' />
				<ModalContent alignItems={'center'}>
					<ModalHeader>Recycle in progress</ModalHeader>
					<ModalCloseButton />
					<ModalBody>
						{tokens.map((token, i) => (
							<>
								<Stack>
									{isChecked[i] && (
										<>
											<Text>
												{++j} of {n} - - - - {token.tokenData.name}
											</Text>
											{/* {isApproved[i] ? (
												<>
													<DepositTxn token={token} />
												</>
											) : ( */}
											<>
												<ApproveTxn key={token.tokenData.symbol} token={token} />
											</>
											{/* )} */}
										</>
									)}
								</Stack>
							</>
						))}
					</ModalBody>

					<ModalFooter>
						<Tooltip label='🙀🙀🙀 are you sure?'>
							<Button colorScheme='red' onClick={onClose}>
								Cancel
							</Button>
						</Tooltip>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};

export default RecycleModal;
