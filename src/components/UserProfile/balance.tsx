import { useBalance } from 'wagmi';

export function Balance({ userAddress }: { userAddress?: `0x${string}` }) {
	const { data, isError, isLoading } = useBalance({
		address: userAddress,
	});

	if (isLoading) return <div>Fetching balance…</div>;
	if (isError) return <div>Error fetching balance</div>;
	return (
		<div>
			Balance: {data?.formatted} {data?.symbol}
		</div>
	);
}
