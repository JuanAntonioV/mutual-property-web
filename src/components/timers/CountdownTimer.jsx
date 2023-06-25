import { useState } from 'react';
import Countdown, { zeroPad } from 'react-countdown';

export default function CountdownTimer({ timer, resendAction }) {
	const [date, setDate] = useState(timer ?? Date.now() + 59000);
	const [reset, setReset] = useState(0);

	const handleResend = () => {
		setReset(reset + 1);
		setDate( Date.now() + 59000);
		resendAction() 
	};

	const Completionist = () => {
		return (
			<div className="gap-1 flexStart">
				<p className="text-sm text-gray-600">Belum menerima email?</p>
				<button className="textLink" onClick={handleResend}>
					Resend
				</button>
			</div>
		);
	};

	const renderer = ({ minutes, seconds, completed }) => {
		if (completed) {
			return <Completionist />;
		} else {
			return (
				<p className="text-sm text-gray-600">
					Mengirim ulang kembali dalam {zeroPad(minutes)}:{zeroPad(seconds)}
				</p>
			);
		}
	};

	return <Countdown key={reset} date={date} renderer={renderer} />;
}
