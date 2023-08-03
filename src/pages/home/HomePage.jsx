import MainContainer from '@/components/containers/MainContainer';
import ContactSection from '@/components/sections/ContactSection';
import HomePageHeroSection from '@/components/sections/HomePageHeroSection';
import NewPropertySection from '@/components/sections/NewPropertySection';
import SubscriptionSection from '@/components/sections/SubscriptionSection';
import ListingPropertySection from '@/components/sections/ListingPropertySection';

export default function HomePage() {
	return (
		<>
			<MainContainer className="mt-[120px]">
				<HomePageHeroSection />
			</MainContainer>

			<NewPropertySection />
			<ListingPropertySection />
			<ContactSection />
			<SubscriptionSection />
		</>
	);
}
