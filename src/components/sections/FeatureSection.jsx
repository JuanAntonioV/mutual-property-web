import MainContainer from '../containers/MainContainer';
import SectionContainer from '../containers/SectionContainer';
import SectionTitle from '../titles/SectionTitle';

export default function FeatureSection() {
	const handleContactUsClicked = e => {
		e.preventDefault();
		window.location.replace('/#contact-us');
	};

	return (
		<SectionContainer className="mt-20">
			<MainContainer>
				<header>
					<SectionTitle
						title={'Integrity is our priority'}
						description={
							'Tim kami berkomitmen untuk memberikan pelayanan terbaik untuk Anda'
						}
						titleColor="text-primary"
						center
					/>
				</header>

				<main className="mt-4 md:mt-10">
					<div className="grid grid-cols-1 gap-y-8 gap-x-4 md:grid-cols-2 lg:grid-cols-3">
						<div className="overflow-hidden border rounded-xl">
							<header className="w-full py-5 text-white bg-primaryHover">
								<h3 className="text-lg font-bold text-center">PENJUAL</h3>
							</header>

							<main className="relative pt-10 bg-slate-800">
								<div className="absolute w-full h-full -translate-x-1/2 -translate-y-1/2 bg-center bg-no-repeat bg-cover opacity-20 bg-featurePenjual left-1/2 top-1/2"></div>

								<div className="p-10 mx-4 mb-6 text-white border border-white rounded-lg">
									<h4 className="text-lg text-center md:text-left">
										Mau properti anda terjual dengan{' '}
										<span className="font-bold text-yellow-300">Cepat ?</span>{' '}
									</h4>
								</div>

								<div className="flex items-center justify-center w-full p-4 pb-6">
									<button
										className="z-10 px-10 bg-white btnPrimary text-primary hover:text-white"
										onClick={handleContactUsClicked}
									>
										Hubungi Kami
									</button>
								</div>
							</main>
						</div>
						<div className="overflow-hidden transition-all duration-200 border shadow-2xl rounded-xl h-fit">
							<header className="w-full py-5 text-white bg-primaryHover">
								<h3 className="text-lg font-bold text-center">PEMBELI</h3>
							</header>

							<main className="relative pt-10 bg-slate-800">
								<div className="absolute w-full h-full -translate-x-1/2 -translate-y-1/2 bg-center bg-no-repeat bg-cover opacity-20 bg-featurePembeli left-1/2 top-1/2"></div>

								<div className="p-10 mx-4 mb-6 text-white border border-white rounded-lg">
									<h4 className="text-lg text-center md:text-left">
										Mau mencari properti impian{' '}
										<span className="font-bold text-yellow-300">Terbaik ?</span>{' '}
									</h4>
								</div>

								<div className="flex items-center justify-center w-full p-4 pb-6">
									<button
										className="z-10 px-10 duration-200 bg-white shadow-lg hover:shadow-sm btnPrimary text-primary hover:text-white"
										onClick={handleContactUsClicked}
									>
										Hubungi Kami
									</button>
								</div>
							</main>
						</div>
						<div className="overflow-hidden border rounded-xl">
							<header className="w-full py-5 text-white bg-primaryHover">
								<h3 className="text-lg font-bold text-center">AGEN PROPERTI</h3>
							</header>

							<main className="relative pt-10 bg-slate-800">
								<div className="absolute w-full h-full -translate-x-1/2 -translate-y-1/2 bg-center bg-no-repeat bg-cover opacity-20 bg-featureAgen left-1/2 top-1/2"></div>

								<div className="p-10 mx-4 mb-6 text-white border border-white rounded-lg">
									<h4 className="text-lg text-center md:text-left">
										Mau mendapatkan penghasilan diatas{' '}
										<span className="font-bold text-yellow-300">
											1 Milyar ?
										</span>
									</h4>
								</div>

								<div className="flex items-center justify-center w-full p-4 pb-6">
									<button
										className="z-10 px-10 bg-white btnPrimary text-primary hover:text-white"
										onClick={handleContactUsClicked}
									>
										Hubungi Kami
									</button>
								</div>
							</main>
						</div>
					</div>
				</main>
			</MainContainer>
		</SectionContainer>
	);
}
