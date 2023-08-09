import { Link, useNavigate } from 'react-router-dom';

import HeroImage from '@/assets/img/hero-image.png';
import HeroImageProperty from '@/assets/img/property.jpeg';
import HomePageStat from '../stats/HomePageStat';
import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
	getAllCategoriesApi,
	getAllSubCategoriesApi,
} from '../../api/category-api';
import { PulseLoader } from 'react-spinners';
import { formatRupiah, parseRupiah } from '../../utils/helpers';
import { formatPrice } from '../../utils/formaters';
import { sellPropertyApi } from '../../api/contact-api';
import { toast } from 'react-toastify';
import { BiSearch } from 'react-icons/bi';
import Slider from 'react-slick';

export default function HomePageHeroSection() {
	const navigate = useNavigate();
	const [formTitipJual, setFormTitipJual] = useState({
		fullName: '',
		phoneNumber: '',
		address: '',
		property: 0,
		description: '',
	});

	const [searchValue, setSearchValue] = useState('');

	const handleOnSearch = () => {
		if (searchValue.length > 0) {
			navigate(`/property/search?keyword=${searchValue}`);
		}
	};

	const handleFormTitipJual = e => {
		const { name, value } = e.target;
		const regexPhone = /^[0-9\b]+$/;

		if (name === 'property') {
			setFormTitipJual(prev => ({
				...prev,
				[name]: parseInt(value),
			}));
		} else if (name === 'phoneNumber') {
			if (value === '' || regexPhone.test(value)) {
				setFormTitipJual(prev => ({
					...prev,
					[name]: value,
				}));
			} else {
				return;
			}
		} else {
			setFormTitipJual(prev => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const { mutate: sendSellProperty, isLoading: isSellPropertyLoading } =
		useMutation(payload => sellPropertyApi(payload), {
			onSuccess: data => {
				toast.success('Pesan berhasil dikirim');
				window.titipJualModal.close();
			},
			onError: err => {
				toast.error(err.message);
			},
		});

	const handleSubmitTitipJual = e => {
		e.preventDefault();

		const payload = {
			full_name: formTitipJual.fullName,
			phone_number: formTitipJual.phoneNumber,
			address: formTitipJual.address,
			sub_category: formTitipJual.property,
			description: formTitipJual.description,
		};

		sendSellProperty(payload);
	};

	const { data, isLoading } = useQuery(
		['subCategory'],
		getAllSubCategoriesApi,
		{
			select: res => res.results,
			refetchOnWindowFocus: false,
		}
	);

	const handleTitipJual = () => {
		window.titipJualModal.showModal();
	};

	const handleContactUsClicked = e => {
		e.preventDefault();
		window.location.replace('/#contact-us');
	};

	const settings = {
		className: 'center',
		centerMode: true,
		infinite: true,
		centerPadding: '60px',
		slidesToShow: 1,
		speed: 500,
	};

	return (
		<>
			<dialog id="titipJualModal" className="modal">
				<div className="w-11/12 max-w-3xl modal-box">
					<form method="dialog">
						<header>
							<button className="absolute outline-none btn btn-sm btn-circle btn-ghost right-2 top-2">
								✕
							</button>
							<h3 className="text-lg font-bold">Titip Jual – Sewa Properti</h3>
							<p className="text-sm text-gray-500">
								Jual / Sewa properti anda dengan mudah
							</p>
						</header>
					</form>

					<form
						className="relative py-4 space-y-2"
						id="titipJualForm"
						onSubmit={handleSubmitTitipJual}
						method="get"
					>
						<div className="absolute w-[80%] h-full -translate-x-1/2 -translate-y-1/2 bg-center bg-no-repeat bg-contain -z-10 bg-logo top-1/2 left-1/2 opacity-5"></div>

						<div className="form-control">
							<label className="label">
								<span className="label-text">Nama Lengkap</span>
							</label>
							<input
								name="fullName"
								type="text"
								placeholder="Masukkan nama lengkap"
								className="input input-bordered"
								value={formTitipJual.fullName}
								onChange={handleFormTitipJual}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Nomor WhatsApp / Telepon</span>
							</label>
							<input
								name="phoneNumber"
								type="text"
								placeholder="Masukkan nomor whatsapp / telepon Anda"
								className="input input-bordered"
								value={formTitipJual.phoneNumber}
								onChange={handleFormTitipJual}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Alamat</span>
							</label>
							<input
								name="address"
								type="text"
								placeholder="Masukkan alamat properti"
								className="input input-bordered"
								value={formTitipJual.address}
								onChange={handleFormTitipJual}
								required
							/>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Properti</span>
							</label>
							<select
								name="property"
								className="w-full select select-bordered"
								value={formTitipJual.property}
								onChange={handleFormTitipJual}
								required
							>
								<option disabled value={0}>
									Pilih Tipe Properti
								</option>
								{data?.map((item, index) => (
									<option key={index} value={item.id}>
										{item.name}
									</option>
								))}
							</select>
						</div>
						<div className="form-control">
							<label className="label">
								<span className="label-text">Deskripsi</span>
							</label>
							<textarea
								name="description"
								placeholder="Masukkan deskripsi properti"
								className="textarea textarea-bordered"
								value={formTitipJual.description}
								onChange={handleFormTitipJual}
								required
							></textarea>
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
							disabled={isSellPropertyLoading}
						>
							{isSellPropertyLoading ? (
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

			<section className="grid grid-cols-1 lg:grid-cols-2 h-full lg:h-[600px] place-content-center pt-14 md:p-0">
				<div className="order-2 mt-10 text-center flexCenter lg:text-start lg:flexStart lg:order-1 lg:m-0">
					<div className="lg:w-[460px] space-y-10">
						<div className="space-y-4">
							<h1 className="text-3xl font-bold leading-normal xl:text-4xl">
								Jual, Beli, Sewa <br className="hidden lg:block" />
								properti Anda <br className="hidden sm:block lg:hidden" />{' '}
								dengan <br className="hidden lg:block" />
								mudah
							</h1>

							<p className="text-sm text-medium lg:text-base">
								Kami hadir agar pembeli, penjual dan perantara{' '}
								<br className="hidden md:block lg:hidden xl:block" />
								dapat bertransaksi properti dengan mudah
							</p>
						</div>

						<div className="flex items-center justify-center gap-4 lg:justify-start">
							<HomePageStat
								value={'1000'}
								detail={'Properti Dijual'}
								onClick={() => navigate('/property?category=dijual&type=rumah')}
							/>
							<HomePageStat
								value={'1000'}
								detail={'Properti Disewa'}
								onClick={() => navigate('/property?category=disewa&type=rumah')}
							/>
						</div>

						<div className="relative block md:hidden">
							<input
								type="text"
								placeholder="Cari Lokasi properti..."
								className="w-full py-4 pl-5 text-black duration-200 border rounded-full shadow-lg focus:shadow-none border-primary placeholder:text-sm focus:outline-none"
								onChange={e => setSearchValue(e.target.value)}
								value={searchValue}
								maxLength={50}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										handleOnSearch();
									}
								}}
							/>

							<button
								className="absolute w-10 h-10 -translate-y-1/2 rounded-full top-1/2 right-2 flexCenter bg-primary"
								onClick={handleOnSearch}
							>
								<BiSearch color="#fff" size={18} />
							</button>
						</div>

						<div className="flex flex-col items-center gap-5 lg:flex-row">
							<button
								className="w-full px-0 text-sm text-center btnSecondary md:text-base"
								onClick={handleTitipJual}
								disabled={isLoading}
							>
								{isLoading ? (
									<PulseLoader color="#213D77" size={8} />
								) : (
									'Titip Jual Properti Anda'
								)}
							</button>
							<button
								className="w-full px-0 text-sm text-center btnSecondary md:text-base"
								onClick={handleContactUsClicked}
							>
								Hubungi Kami
							</button>
						</div>
					</div>
				</div>

				<div className="order-1 flexCenter lg:flexEnd lg:order-2 lg:m-0">
					<Slider
						{...settings}
						className="w-[400px] lg:w-[700px] hover:cursor-move"
					>
						<div className="px-2 !outline-none !border-none">
							<img
								src={HeroImageProperty}
								alt="Mutual Properti Hero Image"
								className="w-full h-full rounded-xl"
							/>
						</div>
						<div className="px-2 !outline-none !border-none">
							<img
								src={HeroImageProperty}
								alt="Mutual Properti Hero Image"
								className="w-full h-full rounded-xl"
							/>
						</div>
						<div className="px-2 !outline-none !border-none">
							<img
								src={HeroImageProperty}
								alt="Mutual Properti Hero Image"
								className="w-full h-full rounded-xl"
							/>
						</div>
						<div className="px-2 !outline-none !border-none">
							<img
								src={HeroImageProperty}
								alt="Mutual Properti Hero Image"
								className="w-full h-full rounded-xl"
							/>
						</div>
						<div className="px-2 !outline-none !border-none">
							<img
								src={HeroImageProperty}
								alt="Mutual Properti Hero Image"
								className="w-full h-full rounded-xl"
							/>
						</div>
					</Slider>
				</div>
			</section>
		</>
	);
}
