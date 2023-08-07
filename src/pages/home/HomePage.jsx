import MainContainer from '@/components/containers/MainContainer';
import HomePageHeroSection from '@/components/sections/HomePageHeroSection';
import NewPropertySection from '@/components/sections/NewPropertySection';
import SubscriptionSection from '@/components/sections/SubscriptionSection';
import ListingPropertySection from '@/components/sections/ListingPropertySection';
import ContactFeatureSection from '@/components/sections/ContactFeatureSection';
import ContactSection from '../../components/sections/ContactSection';

export default function HomePage() {
	return (
		<>
			<MainContainer className="mt-[120px]">
				<HomePageHeroSection />
			</MainContainer>

			<NewPropertySection />
			<ListingPropertySection />
			<ContactSection />
			<ContactFeatureSection />
			<SubscriptionSection />
		</>
	);
}
