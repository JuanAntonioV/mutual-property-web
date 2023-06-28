import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useContext, useState } from 'react';
import { getProfileApi } from '@/api/user-api';
import AuthContext from '@/contexts/AuthProvider';
import { parsePhoneNumber } from '@/utils/helpers';
import { PulseLoader } from 'react-spinners';
import { updateProfileApi } from '../../../api/user-api';
import { changePasswordApi } from '../../../api/auth-api';
import ErrorAlert from '../../../components/alerts/ErrorAlert';

export default function FormSection() {
	const { auth, token } = useContext(AuthContext);
	const [isEditMode, setIsEditMode] = useState(false);
	const [form, setForm] = useState({
		fullName: '',
		email: '',
		phone: '',
	});
	const [changePasswordForm, setChangePasswordForm] = useState({
		oldPassword: '',
		newPassword: '',
		confirmPassword: '',
	});
	const [changePasswordFormError, setChangePasswordFormError] = useState('');

	const handleOnChangePassword = e => {
		const { name, value } = e.target;

		setChangePasswordForm(prev => ({
			...prev,
			[name]: value,
		}));
	};

	const handleOnChange = e => {
		const { name, value } = e.target;

		setForm(prev => ({
			...prev,
			[name]: value,
		}));
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

	const { mutate: changePasswordAction, isLoading: isChangePasswordLoading } =
		useMutation(payload => changePasswordApi(payload), {
			onSuccess: () => {
				setChangePasswordForm({
					oldPassword: '',
					newPassword: '',
					confirmPassword: '',
				});
				setChangePasswordFormError('');
			},
			onError: err => {
				setChangePasswordFormError(err.message);
			},
		});

	const handleChangePassword = e => {
		e.preventDefault();
		setChangePasswordFormError('');

		if (changePasswordForm.newPassword !== changePasswordForm.confirmPassword) {
			setChangePasswordFormError('Konfirmasi kata sandi baru tidak sama');
			return;
		}

		const payload = {
			old_password: changePasswordForm.oldPassword,
			new_password: changePasswordForm.newPassword,
		};

		changePasswordAction({ data: payload, token: auth.token });
	};

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
				<ErrorAlert
					isError={!!changePasswordFormError}
					error={{ message: changePasswordFormError }}
				/>
				<form className="space-y-4" onSubmit={handleChangePassword}>
					<div className="flex flex-col space-y-2">
						<label
							htmlFor="oldPassword"
							className="text-sm font-medium md:text-base"
						>
							Kata Sandi Lama
						</label>
						<input
							name="oldPassword"
							type="password"
							placeholder="Masukkan kata sandi lama"
							id="oldPassword"
							className="inputSecondary"
							value={changePasswordForm.oldPassword}
							onChange={handleOnChangePassword}
						/>
					</div>
					<div className="gap-8 flexBetween">
						<div className="flex flex-col w-full space-y-2">
							<label
								htmlFor="newPassword"
								className="text-sm font-medium md:text-base"
							>
								Kata Sandi Baru
							</label>
							<input
								name="newPassword"
								type="password"
								placeholder="Masukkan Kata Sandi Baru"
								id="newPassword"
								className="inputSecondary"
								value={changePasswordForm.newPassword}
								onChange={handleOnChangePassword}
							/>
						</div>
						<div className="flex flex-col w-full space-y-2">
							<label
								htmlFor="confirmPassword"
								className="text-sm font-medium md:text-base"
							>
								Konfirmasi Kata Sandi Baru
							</label>
							<input
								name="confirmPassword"
								type="password"
								placeholder="Konfirmasi Kata Sandi Baru"
								id="confirmPassword"
								className="inputSecondary"
								value={changePasswordForm.confirmPassword}
								onChange={handleOnChangePassword}
							/>
						</div>
					</div>

					<div>
						<div className="flex items-center gap-6 mt-10">
							<button
								className="px-10 py-3 text-sm w-fit btnPrimary md:text-base"
								disabled={
									changePasswordForm.oldPassword === '' ||
									changePasswordForm.newPassword === '' ||
									changePasswordForm.confirmPassword === '' ||
									isChangePasswordLoading
								}
							>
								{isChangePasswordLoading ? (
									<PulseLoader size={10} color={'#fff'} />
								) : (
									'Simpan'
								)}
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
}
