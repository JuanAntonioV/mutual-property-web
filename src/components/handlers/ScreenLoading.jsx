import { SyncLoader } from 'react-spinners';

export default function ScreenLoading({ text = 'Memuat properti...' }) {
	return (
		<div className="flex-col w-full h-screen gap-6 flexCenter">
			<SyncLoader color="#213D77" size={16} />
			<span className="text-sm text-secondary">{text}</span>
		</div>
	);
}
