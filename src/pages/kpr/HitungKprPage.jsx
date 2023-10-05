'use client';

import MainContainer from '@/components/containers/MainContainer';
import PageTitle from '@/components/titles/PageTitle';
import { parseRupiah, formatRupiah, calculatePMT } from '@/utils/helpers';
import { useMemo, useState } from 'react';
import { PulseLoader } from 'react-spinners';

export default function HitungKprPage() {
	const [formValue, setFormValue] = useState({
		hargaProperty: '',
		uangMuka: '',
		jangkaCicilan: 10,
		bunga: 5,
		uangMukaPercent: 100,
	});

	const [calulateClicked, setCalculateClicked] = useState(false);
	const [calulateLoading, setCalculateLoading] = useState(false);

	const [calculateResult, setCalculateResult] = useState({
		totalBunga: 0,
		cicilanNasabah: 0,
		bunga: 0,
	});

	const handleOnChange = e => {
		const target = e.target;
		const value = target.value;
		const regex = /^[a-zA-Z0-9.,-]*$/;

		const formated = formatRupiah(value);

		if (value.match(regex)) {
			if (
				target.name != 'jangkaCicilan' &&
				target.name != 'bunga' &&
				target.name != 'uangMukaPercent'
			) {
				setFormValue({
					...formValue,
					[target.name]: formated,
				});
			} else {
				if (value <= 100 && value >= 0) {
					setFormValue({
						...formValue,
						[target.name]: value,
					});
				}
			}
		}
	};

	const handleOnChangeUangMukaPercent = e => {
		const target = e.target;
		const value = target.value;
		const regex = /^[0-9.,-]*$/;

		if (regex.test(value)) {
			if (value > 100) {
				value = 100;
			}

			let downPayment = (value / 100) * parseRupiah(formValue.hargaProperty);

			if (downPayment < 0) {
				downPayment = 0;
			}

			if (downPayment > parseRupiah(formValue.hargaProperty)) {
				downPayment = parseRupiah(formValue.hargaProperty);
			}

			setFormValue({
				...formValue,
				uangMuka: formatRupiah(String(downPayment) || '0'),
				[target.name]: value,
			});
		}
	};

	const handleOnChangeUangMuka = e => {
		const target = e.target;
		let value = target.value;
		const regex = /^[0-9.,-]*$/;

		if (regex.test(value)) {
			const formated = formatRupiah(String(value));

			let downPaymentPercent =
				(parseRupiah(formated) / parseRupiah(formValue.hargaProperty)) * 100;

			if (downPaymentPercent < 0) {
				downPaymentPercent = 0;
			}

			if (downPaymentPercent > 100) {
				downPaymentPercent = 100;
			}

			if (isNaN(downPaymentPercent)) {
				downPaymentPercent = 0;
			}

			downPaymentPercent = downPaymentPercent.toFixed(0);

			setFormValue({
				...formValue,
				uangMukaPercent: downPaymentPercent,
				[target.name]: formated,
			});
		}
	};

	const calculate = e => {
		e.preventDefault();

		const valueParsed = {
			hargaProperty: parseRupiah(formValue.hargaProperty),
			uangMuka: parseRupiah(formValue.uangMuka),
			jangkaCicilan: formValue.jangkaCicilan,
			bunga: formValue.bunga,
		};

		const plafondCost = valueParsed.hargaProperty - valueParsed.uangMuka;

		const pmt = calculatePMT(
			valueParsed.bunga,
			valueParsed.jangkaCicilan,
			-plafondCost
		);

		const ipmt = valueParsed.jangkaCicilan * 12 * pmt;
		const totalBunga = ipmt - plafondCost;

		const resultCicilanNasabah =
			(plafondCost + totalBunga) / (valueParsed.jangkaCicilan * 12);

		setCalculateLoading(true);
		setTimeout(() => {
			setCalculateResult({
				totalBunga: totalBunga.toFixed(0),
				cicilanNasabah: resultCicilanNasabah.toFixed(0),
				bunga: valueParsed.bunga,
			});

			setCalculateClicked(true);
			setCalculateLoading(false);
		}, 500);
	};

	const disabledInput = useMemo(() => {
		if (!formValue.hargaProperty) {
			return true;
		} else {
			return false;
		}
	}, [formValue.hargaProperty]);

	return (
		<MainContainer className="mt-[100px] my-20">
			<header>
				<PageTitle
					title={'Simulasi KPR'}
					description={
						'Cek estimasi pembiayaan kredit rumah dengan kalkulator KPR Mutual Property'
					}
				/>
			</header>

			<main className="grid grid-cols-1 gap-14 lg:grid-cols-2">
				<div className="order-2 px-6 py-10 bg-white border border-borderPrimary rounded-xl md:order-1">
					<form className="space-y-8" onSubmit={calculate}>
						<div className="space-y-4">
							<label
								htmlFor="price"
								className="text-sm font-medium sm:text-base"
							>
								Harga Properti
							</label>

							<div className="relative flex items-center h-fit">
								<div className="w-20 h-[50px] flexCenter rounded-l-lg bg-[#f5f5f5] border-l border-y border-borderPrimary text-secondarySoftTrans">
									<span className="text-base font-bold md:text-lg">Rp</span>
								</div>
								<input
									type="text"
									name="hargaProperty"
									placeholder="Rp 0"
									className="font-semibold rounded-l-none text-end pl-14 inputSecondary focus:border-borderPrimary"
									min={0}
									value={formValue.hargaProperty}
									required
									onChange={handleOnChange}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<label
								htmlFor="downPayment"
								className="text-sm font-medium sm:text-base"
							>
								Uang Muka
							</label>

							<div className="relative flex items-center h-fit">
								<div className="w-20 h-[50px] flexCenter rounded-l-lg bg-[#f5f5f5] border-l border-y border-borderPrimary text-secondarySoftTrans">
									<span className="text-base font-bold md:text-lg">Rp</span>
								</div>
								<input
									id="downPayment"
									type="text"
									name="uangMuka"
									placeholder="Rp 0"
									className="font-semibold rounded-l-none text-end pl-14 inputSecondary focus:border-borderPrimary"
									min={0}
									value={formValue.uangMuka}
									required
									onChange={handleOnChangeUangMuka}
									disabled={disabledInput}
								/>
							</div>
						</div>

						<div className="space-y-4">
							<label
								htmlFor="downPaymentPercent"
								className="text-sm font-medium sm:text-base"
							>
								Uang Muka (%)
							</label>

							<div className="relative flex items-center h-fit">
								<input
									id="downPaymentPercent"
									type="text"
									name="uangMukaPercent"
									placeholder="0"
									className="font-semibold rounded-r-none text-end pl-14 inputSecondary focus:border-borderPrimary"
									min={0}
									max={100}
									value={formValue.uangMukaPercent}
									required
									onChange={handleOnChangeUangMukaPercent}
									disabled={disabledInput}
								/>
								<div className="w-20 h-[50px] flexCenter rounded-r-lg bg-[#f5f5f5] border-r border-y border-borderPrimary text-secondarySoftTrans">
									<span className="text-base font-bold md:text-lg text-primary">
										%
									</span>
								</div>
							</div>
						</div>

						<div className="flexBetween lg:gap-4">
							<label
								htmlFor="range"
								className="text-sm font-medium sm:text-base"
							>
								Jangka Waktu KPR
							</label>

							<div className="relative flex items-center w-32 h-fit md:w-full">
								<input
									id="range"
									type="text"
									name="jangkaCicilan"
									placeholder="1"
									className="font-semibold rounded-r-none text-end inputSecondary focus:border-borderPrimary"
									min={1}
									value={formValue.jangkaCicilan}
									required
									onChange={handleOnChange}
								/>
								<div className="w-28 h-[50px] flexCenter rounded-r-lg bg-[#f5f5f5] border-r border-y border-borderPrimary text-secondarySoftTrans">
									<span className="text-sm font-bold">Tahun</span>
								</div>
							</div>
						</div>

						<div className="flexBetween lg:gap-4">
							<label
								htmlFor="bunga"
								className="text-sm font-medium sm:text-base"
							>
								Bunga/Tahun
							</label>

							<div className="relative flex items-center w-32 h-fit md:w-full">
								<input
									id="bunga"
									type="text"
									name="bunga"
									placeholder="1"
									className="font-semibold rounded-r-none text-end inputSecondary focus:border-borderPrimary"
									min={1}
									value={formValue.bunga}
									required
									onChange={handleOnChange}
								/>
								<div className="w-20 h-[50px] flexCenter rounded-r-lg bg-[#f5f5f5] border-r border-y border-borderPrimary text-secondarySoftTrans">
									<span className="text-base font-bold md:text-lg">%</span>
								</div>
							</div>
						</div>

						<div>
							<button
								type="submit"
								className="mt-6 btnPrimary"
								disabled={calulateLoading}
							>
								{calulateLoading ? (
									<PulseLoader color="#fff" size={10} />
								) : (
									'Simulasikan'
								)}
							</button>
						</div>
					</form>
				</div>

				<div className="order-1 space-y-5 md:order-2">
					<div className="px-4 py-6 md:px-8 bg-bgSoft rounded-2xl">
						<header className="pt-2 pb-6 border-b border-primary/50">
							<h3 className="text-xl font-semibold text-center">
								Angsuran / Bulan
							</h3>
						</header>

						<main className="mt-6 space-y-2">
							{calulateClicked ? (
								<>
									{/* <div className="flexBetween">
										<div className="space-y-1">
											<h4 className="font-semibold md:text-lg">
												Bunga {calculateResult.bunga}%
											</h4>
										</div>

										<p className="font-semibold md:text-lg">
											{formatRupiah(calculateResult.totalBunga, 'Rp. ')}{' '}
											<span className="text-sm font-light text-secondary">
												/ Tahun
											</span>
										</p>
									</div> */}
									<div className="flexBetween">
										<div className="space-y-1">
											<h4 className="font-semibold md:text-lg">Angsuran</h4>
										</div>

										<p className="font-semibold md:text-lg">
											{formatRupiah(calculateResult.cicilanNasabah, 'Rp. ')}{' '}
											<span className="text-sm font-light text-secondary">
												/ Bulan
											</span>
										</p>
									</div>
								</>
							) : (
								<p className="text-sm font-medium text-center md:text-lg text-secondary">
									Simulasikan KPR terlebih dahulu
								</p>
							)}
						</main>
					</div>

					<div className="py-4 border-t border-borderPrimary">
						<p className="text-sm text-secondary">
							<span className="font-semibold text-black">Disclaimer :</span>{' '}
							Hasil di atas merupakan angka estimasi, data perhitungan dapat
							berbeda dengan perhitungan bank.
						</p>
					</div>
				</div>
			</main>
		</MainContainer>
	);
}
