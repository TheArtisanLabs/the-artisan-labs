import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import Process from '@/components/sections/Process';
import Services from '@/components/sections/Services';
import Portfolio from '@/components/sections/Portfolio';
import Team from '@/components/sections/Team';
import Stack from '@/components/sections/Stack';
import FAQ from '@/components/sections/FAQ';
import CTA from '@/components/sections/CTA';
import Contact from '@/components/sections/Contact';
import Footer from '@/components/layout/Footer';

const Home = () => {
	return (
		<>
			<Hero />
			<About />
			<Process />
			<Services />
			<Portfolio />
			<Team />
			<Stack />
			<FAQ />
			<CTA />
			<Contact />
			<Footer />
		</>
	);
};

export default Home;
