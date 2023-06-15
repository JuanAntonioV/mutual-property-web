import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { getProfileApi } from '@/api/user-api';
import AuthContext from '@/contexts/AuthProvider';
import { parsePhoneNumber } from '@/utils/helpers';
import { PulseLoader } from 'react-spinners';
import { updateProfileApi } from '../../../api/user-api';

export default function FormSection() {
	const { auth, setAuth } = useContext(AuthContext);
	const [isEditMode, setIsEditMode] = useState(false);
	const [form, setForm] = useState({
		fullName: '',
		email: '',
		phone: '',
	});

	const handleOnChange = e => {
		const { name, value } = e.target;

		setForm({
			...form,
			[name]: value,
		});
	};

	const qc = useQueryClient();

	const { mutate: updateProfile, isLoading: isUserUpdateLoading } = useMutation(
		payload => updateProfileApi(payload),
		{
			onSuccess: data => {
				qc.invalidateQueries('user');
				setIsEditMode(false);
			},
		}
	);

	const handleFormSubmit = e => {
		e.preventDefault();

		const payload = {
			full_name: form.fullName ? form.fullName : undefined,
			email: form.email ? form.email : undefined,
			phone_number: form.phone ? form.phone : undefined,
		};

		updateProfile({ data: payload, token: auth.token });
	};

	const { isLoading: isUserLoading } = useQuery(
		['user'],
		() => getProfileApi(auth.token),
		{
			enabled: !!auth.token,
			select: data => data.results,
			onSuccess: data => {
				const profileData = {
					fullName: data.full_name,
					email: data.email,
					phone: parsePhoneNumber(data.phone_number),
				};

				setForm(profileData);
			},
		}
	);

	return (
		<div className="flex flex-col w-full gap-10">
			<div className="w-full p-10 bg-white border border-borderPrimary rounded-xl">
				<form className="space-y-4" onSubmit={handleFormSubmit}>
					<div className="flex flex-col space-y-2">
						<label
							htmlFor="fullName"
							className="text-sm font-medium md:text-base"
						>
							Nama Lengkap
						</label>
						<input
							name="fullName"
							type="text"
							placeholder="Masukkan nama lengkap"
							id="fullName"
							className="inputSecondary"
							value={form.fullName}
							onChange={handleOnChange}
							disabled={!isEditMode || isUserLoading || isUserUpdateLoading}
						/>
					</div>
					<div className="gap-8 flexBetween">
						<div className="flex flex-col w-full space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium md:text-base"
							>
								Email
							</label>
							<input
								name="email"
								type="text"
								placeholder="Masukkan email anda"
								id="email"
								className="inputSecondary"
								value={form.email}
								onChange={handleOnChange}
								disabled={!isEditMode || isUserLoading || isUserUpdateLoading}
							/>
						</div>
						<div className="flex flex-col w-full space-y-2">
							<label
								htmlFor="phone"
								className="text-sm font-medium md:text-base"
							>
								Nomor Handphone
							</label>
							<input
								name="phone"
								type="number"
								placeholder="Masukkan nomor handphone"
								id="phone"
								className="inputSecondary"
								value={form.phone}
								onChange={handleOnChange}
								disabled={!isEditMode || isUserLoading || isUserUpdateLoading}
							/>
						</div>
					</div>

					<div>
						{isEditMode ? (
							<div className="flex items-center gap-6 mt-10">
								<button
									type="submit"
									className="px-10 py-3 text-sm w-fit btnPrimary md:text-base"
									disabled={isUserUpdateLoading}
								>
									{isUserUpdateLoading ? (
										<PulseLoader size={10} color={'#fff'} />
									) : (
										'Simpan'
									)}
								</button>
								<button
									type="button"
									className="px-8 py-3 text-sm w-fit btnSecondary md:text-base"
									onClick={() => setIsEditMode(false)}
									disabled={isUserUpdateLoading}
								>
									Batalkan
								</button>
							</div>
						) : (
							<button
								type="button"
								className="px-10 py-3 mt-6 text-sm bg-green-500 w-fit btnPrimary md:text-base hover:bg-green-600"
								onClick={() => setIsEditMode(true)}
								disabled={isUserLoading}
							>
								{isUserLoading ? (
									<PulseLoader size={10} color={'#fff'} />
								) : (
									'Edit'
								)}
							</button>
						)}
					</div>
				</form>
			</div>

			<div className="w-full p-10 bg-white border border-borderPrimary rounded-xl">
				<form className="space-y-4">
					<div className="flex flex-col space-y-2">
						<label htmlFor="nama" className="text-sm font-medium md:text-base">
							Kata Sandi Lama
						</label>
						<input
							type="text"
							placeholder="Masukkan kata sandi lama"
							id="nama"
							className="inputSecondary"
						/>
					</div>
					<div className="gap-8 flexBetween">
						<div className="flex flex-col w-full space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium md:text-base"
							>
								Kata Sandi Baru
							</label>
							<input
								type="text"
								placeholder="Masukkan Kata Sandi Baru"
								id="email"
								className="inputSecondary"
							/>
						</div>
						<div className="flex flex-col w-full space-y-2">
							<label
								htmlFor="email"
								className="text-sm font-medium md:text-base"
							>
								Konfirmasi Kata Sandi Baru
							</label>
							<input
								type="text"
								placeholder="Konfirmasi Kata Sandi Baru"
								id="email"
								className="inputSecondary"
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center gap-6 mt-10">
							<button className="px-10 py-3 text-sm w-fit btnPrimary md:text-base">
								Ubah
							</button>
							<button className="px-8 py-3 text-sm w-fit btnSecondary md:text-base">
								Batalkan
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
