import MainContainer from '@/components/containers/MainContainer';
import ContactSection from '@/components/sections/ContactSection';
import HomePageHeroSection from '@/components/sections/HomePageHeroSection';
import NewPropertySection from '@/components/sections/NewPropertySection';
import SubscriptionSection from '@/components/sections/SubscriptionSection';

export default function HomePage() {
	return (
		<>
			<MainContainer className="mt-[100px]">
				<HomePageHeroSection />
			</MainContainer>

			<NewPropertySection />
			<ContactSection />
			<SubscriptionSection />
		</>
	);
}
