import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';

export default function ContactFeatureSection() {
	return (
		<SectionContainer className="my-20 bg-gradient-to-b from-white via-indigo-50 via-50% to-white">
			<MainContainer>
				<main className="grid grid-cols-1 mt-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3 place-items-center">
					<div className="p-6 bg-white border border-borderPrimary shadow-xl rounded-2xl md:w-[400px] ">
						<header className="text-center">
							<h3 className="text-lg font-semibold">
								Mau properti anda terjual <br /> dengan cepat?
							</h3>
						</header>

						<button className="mt-10 btnPrimary">Hubungi Kami</button>
					</div>
					<div className="p-6 mt-40 bg-white border border-borderPrimary shadow-xl rounded-2xl md:w-[400px] ">
						<header className="text-center">
							<h3 className="text-lg font-semibold">
								Mau mencari properti impian terbaik?
							</h3>
						</header>

						<button className="mt-10 btnPrimary">Hubungi Kami</button>
					</div>
					<div className="p-6 bg-white border border-borderPrimary shadow-xl rounded-2xl md:w-[400px] ">
						<header className="text-center">
							<h3 className="text-lg font-semibold">
								Mau menjadi agen properti dengan profit tinggi?
							</h3>
						</header>

						<button className="mt-10 btnPrimary">Hubungi Kami</button>
					</div>
				</main>
			</MainContainer>
		</SectionContainer>
	);
}
