import MainContainer from '@/components/containers/MainContainer';
import HomePageHeroSection from '@/components/sections/HomePageHeroSection';
import NewPropertySection from '@/components/sections/NewPropertySection';
import SubscriptionSection from '@/components/sections/SubscriptionSection';
import ListingPropertySection from '@/components/sections/ListingPropertySection';
import ContactForm from '../../components/sections/ContactForm';
import FeatureSection from '@/components/sections/FeatureSection';

export default function HomePage() {
	return (
		<>
			<MainContainer className="mt-10 md:mt-[120px]">
				<HomePageHeroSection />
			</MainContainer>

			<NewPropertySection />
			<ListingPropertySection />
			<FeatureSection />
			<ContactForm />
			<SubscriptionSection />
		</>
	);
}
