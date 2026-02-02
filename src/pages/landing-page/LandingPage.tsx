import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Features from './components/Features';
import AboutSection from './components/AboutSection';
import PricingSection from './components/PricingSection';
import CTA from './components/CTA';
import Footer from './components/Footer';
import CustomerService from './components/CustomerService';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white text-[#191A23] font-geist overflow-x-hidden flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Categories />
                <Features />
                <AboutSection />
                <PricingSection />
                <CTA />
            </main>
            <Footer />
            <CustomerService />
        </div>
    );
};

export default LandingPage;
