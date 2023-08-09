import { useState } from 'react';
import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';
import SectionTitle from '../titles/SectionTitle';
import { useMutation } from '@tanstack/react-query';
import { sendContactApi } from '../../api/contact-api';
import { toast } from 'react-toastify';
import { PulseLoader } from 'react-spinners';

export default function ContactForm() {
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
		<SectionContainer className="mb-20 mt-14 md:mt-24" id={'contact-us'}>
			<SectionTitle
				center
				title={'Hubungi Kami Sekarang Juga'}
				titleColor="text-primary"
				description={'Kami siap membantu Anda untuk informasi lebih lanjut.'}
			/>
			<MainContainer>
				<main className="flexCenter">
					<div className="p-6 duration-200 border shadow-xl bg-bgSoft rounded-xl hover:shadow-md border-borderPrimary">
						<form className="space-y-6" onSubmit={handleSendMessage}>
							<div className="space-y-2">
								<label htmlFor="full_name" className="font-semibold">
									Nama Lengkap
								</label>
								<input
									type="text"
									name="full_name"
									id="full_name"
									placeholder="Masukkan nama Anda"
									className="inputSecondary border-primary"
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
									className="inputSecondary border-primary"
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
									className="inputSecondary border-primary"
									required
									onChange={handleOnChange}
									rows="5"
								></textarea>
							</div>

							<button
								type="submit"
								className="btnPrimary"
								disabled={isSendMessageLoading}
							>
								{isSendMessageLoading ? (
									<PulseLoader size={8} color={'#fff'} />
								) : (
									'Kirim'
								)}
							</button>

							<div>
								<p className="mt-4 text-xs text-gray-500">
									Kami akan menghubungi Anda melalui nomor whatsapp yang Anda
									berikan. Kami tidak akan membagikan informasi Anda kepada
									pihak ketiga.
								</p>
							</div>
						</form>
					</div>
				</main>
			</MainContainer>
		</SectionContainer>
	);
}
