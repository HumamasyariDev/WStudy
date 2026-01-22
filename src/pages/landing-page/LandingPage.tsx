import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Features from './components/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

const LandingPage = () => {
    return (
        <div className="min-h-screen bg-white text-[#191A23] font-geist overflow-x-hidden flex flex-col">
            <Navbar />
            <main className="flex-1">
                <Hero />
                <Categories />
                <Features />
                <CTA />
            </main>
            <Footer />
        </div>
    );
};

export default LandingPage;
