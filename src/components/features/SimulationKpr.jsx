'use client';

import { calculatePMT, formatRupiah, parseRupiah } from '@/utils/helpers';
import { useEffect, useMemo, useState } from 'react';
import { PulseLoader } from 'react-spinners';
import CollapseWrapper from '../wrappers/CollapseWrapper';

export default function SimulationKpr() {
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
		let value = target.value;
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
		<CollapseWrapper title={'Simulasi KPR'}>
			<form className="space-y-8" onSubmit={calculate}>
				<div className="space-y-4">
					<label htmlFor="price" className="text-sm font-medium sm:text-base">
						Harga Properti
					</label>

					<div className="relative flex items-center h-fit">
						<div className="w-20 h-[50px] flexCenter rounded-l-lg bg-[#f5f5f5] border-l border-y border-borderPrimary text-secondarySoftTrans">
							<span className="text-base font-bold md:text-lg text-primary">
								Rp
							</span>
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
							<span className="text-base font-bold md:text-lg text-primary">
								Rp
							</span>
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

				<div className="flexBetween">
					<label htmlFor="range" className="text-sm font-medium sm:text-base">
						Jangka Waktu KPR
					</label>

					<div className="relative flex items-center w-32 sm:w-52 h-fit">
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
							<span className="text-sm font-bold text-primary">Tahun</span>
						</div>
					</div>
				</div>

				<div className="flexBetween">
					<label htmlFor="bunga" className="text-sm font-medium sm:text-base">
						Bunga/Tahun
					</label>

					<div className="relative flex items-center w-32 h-fit sm:w-52 ">
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
							<span className="text-base font-bold md:text-lg text-primary">
								%
							</span>
						</div>
					</div>
				</div>

				{calulateClicked && !calulateLoading && (
					<div className="px-4 pt-6 mt-2 space-y-4 border-t border-borderPrimary">
						{/* <div className="flexBetween">
							<p className="font-semibold">Bunga {calculateResult.bunga}%</p>
							<p className="font-semibold">
								{formatRupiah(calculateResult.totalBunga, 'Rp. ')}{' '}
								<span className="text-sm font-light text-secondary">
									/ Tahun
								</span>
							</p>
						</div> */}
						<div className="flexBetween">
							<p className="font-semibold">Angsuran</p>
							<p className="font-semibold">
								{formatRupiah(calculateResult.cicilanNasabah, 'Rp. ')}{' '}
								<span className="text-sm font-light text-secondary">
									/ Bulan
								</span>
							</p>
						</div>
					</div>
				)}

				<div>
					<button
						type="submit"
						className="mt-2 btnPrimary"
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
		</CollapseWrapper>
	);
}
