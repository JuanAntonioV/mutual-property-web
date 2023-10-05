import { textCapitalize } from '@/utils/helpers';

import MainContainer from '../containers/MainContainer';
import PropertyHeroImage from '@/assets/img/page-hero-img.svg';

export default function PropertyHeroSection({ type, category }) {
	const formatedType = type?.includes('-') ? type?.replace('-', ' / ') : type;

	const openContactModal = () => {
		window.contactModal.showModal();
	};

	return (
		<MainContainer className="grid grid-cols-1 lg:grid-cols-2 h-full lg:h-[600px] place-content-center">
			<div className="order-2 mt-10 text-center flexCenter lg:text-start lg:flexStart lg:order-1 lg:m-0">
				<div className="flex flex-col gap-14">
					<div className="space-y-4">
						<h1 className="text-3xl font-bold leading-normal md:text-4xl lg:text-3xl">
							{textCapitalize(formatedType)} {textCapitalize(category)}
						</h1>

						<p className="text-base md:text-lg text-medium lg:text-base w-full lg:w-[500px]">
							Mulailah petualangan rumah baru Anda bersama kami dan jadikan
							setiap momen menjadi pengalaman yang tak terlupakan.
						</p>
					</div>

					<div>
						<button
							onClick={openContactModal}
							className="px-20 btnPrimary w-fit"
						>
							Hubungi Kami
						</button>
					</div>
				</div>
			</div>

			<div className="order-1 mt-10 flexCenter lg:flexEnd lg:order-2 lg:m-0">
				<img src={PropertyHeroImage} alt="Properti Hero Image" width={720} />
			</div>
		</MainContainer>
	);
}
