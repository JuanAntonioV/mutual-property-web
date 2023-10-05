import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default function ContactModal() {
	const [contactForm, setContactForm] = useState({
		full_name: '',
		phoneNumber: '',
		message: '',
	});

	const handleOnChange = e => {
		const { name, value } = e.target;

		setContactForm(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const { mutate: sendMessage, isLoading: isSendMessageLoading } = useMutation(
		payload => sendContactApi(payload),
		{
			onSuccess: data => {
				toast.success('Pesan berhasil dikirim');
				window.contactModal.close();
			},
			onError: err => {
				toast.error(err.message);
			},
		}
	);

	const handleSendMessage = e => {
		e.preventDefault();

		const payload = {
			full_name: contactForm.full_name,
			phone_number: contactForm.phoneNumber,
			message: contactForm.message,
		};

		sendMessage(payload);
	};

	return (
		<dialog id="contactModal" className="modal">
			<div className="w-11/12 max-w-3xl modal-box">
				<form method="dialog">
					<header>
						<button className="absolute outline-none btn btn-sm btn-circle btn-ghost right-2 top-2">
							✕
						</button>
						<h3 className="text-lg font-bold">Hubungi Kami</h3>
						<p className="text-sm text-gray-500">
							Kami siap membantu Anda untuk informasi lebih lanjut.
						</p>
					</header>
				</form>

				<form
					className="relative py-4 mt-4 space-y-2"
					id="titipJualForm"
					onSubmit={handleSendMessage}
					method="get"
				>
					<div className="absolute w-[80%] h-full -translate-x-1/2 -translate-y-1/2 bg-center bg-no-repeat bg-contain -z-10 bg-logo top-1/2 left-1/2 opacity-5"></div>

					<div className="space-y-2">
						<label htmlFor="full_name" className="font-semibold">
							Nama Lengkap
						</label>
						<input
							type="text"
							name="full_name"
							id="full_name"
							placeholder="Masukkan nama Anda"
							className="inputSecondary "
							required
							autoFocus
							onChange={handleOnChange}
						/>
					</div>
					<div className="space-y-2">
						<label htmlFor="phoneNumber" className="font-semibold">
							Nomor WhatsApp
						</label>
						<input
							type="text"
							name="phoneNumber"
							id="phoneNumber"
							placeholder="Masukkan nomor WhatsApp Anda"
							className="inputSecondary "
							required
							onChange={handleOnChange}
						/>
					</div>

					<div className="space-y-2">
						<label htmlFor="message" className="font-semibold">
							Pesan
						</label>
						<textarea
							name="message"
							id="message"
							placeholder="Masukkan pesan Anda"
							className="inputSecondary "
							required
							onChange={handleOnChange}
							rows="5"
						></textarea>
					</div>

					<div>
						<p className="mt-4 text-xs text-gray-500">
							Kami akan menghubungi Anda melalui nomor whatsapp yang Anda
							berikan. Kami tidak akan membagikan informasi Anda kepada pihak
							ketiga.
						</p>
					</div>
				</form>

				<div className="modal-action">
					<form method="dialog">
						<button className="outline-none btn">Close</button>
					</form>
					<button
						type="submit"
						className="px-8 outline-none btn btnPrimary w-fit"
						form="titipJualForm"
						disabled={isSendMessageLoading}
					>
						{isSendMessageLoading ? (
							<PulseLoader color="#fff" size={8} />
						) : (
							'Kirim'
						)}
					</button>
				</div>
			</div>
			<form method="dialog" className="modal-backdrop">
				<button>close</button>
			</form>
		</dialog>
	);
}
