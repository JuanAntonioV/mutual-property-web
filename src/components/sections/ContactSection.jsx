import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';
import SectionTitle from '../titles/SectionTitle';

import { BsTelephoneFill } from 'react-icons/bs';
import { IoLocation, IoMail } from 'react-icons/io5';

export default function ContactSection() {
	return (
		<SectionContainer className="my-20">
			<MainContainer>
				<header>
					<SectionTitle
						title={'Hubungi kami untuk informasi lebih lanjut'}
						description={
							'Jika Anda memerlukan bantuan atau memiliki pertanyaan, kami siap membantu anda'
						}
						center
						titleColor="text-primary"
					/>
				</header>

				<main className="grid grid-cols-1 mt-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3 place-items-center">
					<div className="bg-white w-full md:w-[400px] h-[260px] p-8 flexCenterCol gap-4 shadow-lg rounded-xl">
						<header>
							<BsTelephoneFill size={42} color="#213D77" />
						</header>

						<main className="space-y-2 text-center">
							<p>Hubungi Kami</p>
							<p className="text-lg font-bold text-primary">
								0852 - 7730 - 3838
							</p>
						</main>
					</div>
					<div className="bg-white w-full md:w-[400px] h-[260px] p-4 flexCenterCol gap-4 shadow-lg rounded-xl">
						<header>
							<IoLocation size={42} color="#213D77" />
						</header>

						<main className="space-y-2 text-center">
							<p>Kunjungi kantor kami di</p>
							<p className="text-lg font-bold text-primary">
								Jalan William Iskandar Pasar V, <br /> Komplek MMTC Blok N-25
							</p>
						</main>
					</div>
					<div className="bg-white w-full md:w-[400px] h-[260px] p-4 flexCenterCol gap-4 shadow-lg rounded-xl">
						<header>
							<IoMail size={42} color="#213D77" />
						</header>

						<main className="space-y-2 text-center">
							<p>Email kami di</p>
							<p className="text-lg font-bold text-primary">
								mutualproperti@gmail.com
							</p>
						</main>
					</div>
				</main>
			</MainContainer>
		</SectionContainer>
	);
}
