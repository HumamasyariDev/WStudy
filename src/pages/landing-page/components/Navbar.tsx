import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg border-b border-[#191A23]/10 transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center">
                        <img
                            src="/logo_text_transparent.png"
                            alt="WStudy"
                            className="h-40 w-auto object-contain"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        <a href="#" className="text-base font-medium text-[#191A23] hover:underline transition-all">About us</a>
                        <a href="#categories" className="text-base font-medium text-[#191A23] hover:underline transition-all">Courses</a>
                        <a href="#features" className="text-base font-medium text-[#191A23] hover:underline transition-all">Mentors</a>
                        <a href="#pricing" className="text-base font-medium text-[#191A23] hover:underline transition-all">Pricing</a>
                    </div>

                    {/* Auth Buttons */}
                    <div className="flex items-center gap-4">
                        <Link to="/login" className="px-5 py-2.5 rounded-xl border border-[#191A23] text-[#191A23] text-sm font-medium hover:bg-[#191A23] hover:text-white transition-colors">
                            Login
                        </Link>
                        <Link to="/signup" className="px-5 py-2.5 rounded-xl bg-[#B9FF66] border border-[#B9FF66] text-[#191A23] text-sm font-medium hover:bg-[#a3eb5b] transition-colors">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
