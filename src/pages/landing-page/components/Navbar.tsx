import { Link } from 'react-router-dom';
import { useState } from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <motion.nav 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 right-0 z-50 bg-white/98 backdrop-blur-xl shadow-sm border-b border-[#191A23]/5"
        >
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center group">
                        <img
                            src="/logo_text_transparent.png"
                            alt="WStudy"
                            className="h-36 w-auto object-contain transition-all duration-300 group-hover:scale-105"
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-8">
                        <a 
                            href="#about" 
                            className="relative text-[15px] font-semibold text-[#191A23] transition-all duration-300 
                                     px-3 py-2 group"
                        >
                            <span className="relative z-10">About us</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#191A23] 
                                           transition-all duration-300 ease-out
                                           group-hover:w-full group-active:w-full group-active:h-[3px]"></span>
                        </a>
                        <a 
                            href="#categories" 
                            className="relative text-[15px] font-semibold text-[#191A23] transition-all duration-300 
                                     px-3 py-2 group"
                        >
                            <span className="relative z-10">Courses</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#191A23] 
                                           transition-all duration-300 ease-out
                                           group-hover:w-full group-active:w-full group-active:h-[3px]"></span>
                        </a>
                        <a 
                            href="#features" 
                            className="relative text-[15px] font-semibold text-[#191A23] transition-all duration-300 
                                     px-3 py-2 group"
                        >
                            <span className="relative z-10">Mentors</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#191A23] 
                                           transition-all duration-300 ease-out
                                           group-hover:w-full group-active:w-full group-active:h-[3px]"></span>
                        </a>
                        <a 
                            href="#pricing" 
                            className="relative text-[15px] font-semibold text-[#191A23] transition-all duration-300 
                                     px-3 py-2 group"
                        >
                            <span className="relative z-10">Pricing</span>
                            <span className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[2px] w-0 bg-[#191A23] 
                                           transition-all duration-300 ease-out
                                           group-hover:w-full group-active:w-full group-active:h-[3px]"></span>
                        </a>
                    </div>

                    {/* Desktop Auth Buttons */}
                    <div className="hidden lg:flex items-center gap-4">
                        <Link 
                            to="/login" 
                            className="relative overflow-hidden px-7 py-3 rounded-full border-2 border-[#191A23] text-[15px] font-bold 
                                     transition-all duration-300 group hover:scale-105 hover:shadow-xl"
                        >
                            <span className="relative z-10 text-[#191A23] group-hover:text-white transition-colors duration-300">Login</span>
                            <span className="absolute inset-0 bg-[#191A23] rounded-full -translate-x-full group-hover:translate-x-0 
                                           transition-transform duration-300 ease-out"></span>
                        </Link>
                        <Link 
                            to="/signup" 
                            className="px-7 py-3 rounded-full bg-[#B9FF66] border-2 border-[#B9FF66] text-[15px] font-bold text-[#191A23]
                                     transition-all duration-300 hover:scale-105 hover:brightness-110 
                                     shadow-md shadow-[#B9FF66]/20 hover:shadow-xl hover:shadow-[#B9FF66]/50"
                        >
                            Sign Up
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
                        aria-label="Toggle menu"
                    >
                        <div className="w-6 h-5 flex flex-col justify-between">
                            <span className={`block h-0.5 w-full bg-[#191A23] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                            <span className={`block h-0.5 w-full bg-[#191A23] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}></span>
                            <span className={`block h-0.5 w-full bg-[#191A23] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                        </div>
                    </button>
                </div>

                {/* Mobile Menu */}
                <div className={`md:hidden overflow-hidden transition-all duration-300 ${mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="py-4 space-y-3">
                        <a 
                            href="#about" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-base font-semibold text-[#191A23] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            About us
                        </a>
                        <a 
                            href="#categories" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-base font-semibold text-[#191A23] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Courses
                        </a>
                        <a 
                            href="#features" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-base font-semibold text-[#191A23] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Mentors
                        </a>
                        <a 
                            href="#pricing" 
                            onClick={() => setMobileMenuOpen(false)}
                            className="block px-4 py-2 text-base font-semibold text-[#191A23] hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Pricing
                        </a>
                        <div className="pt-4 space-y-2">
                            <Link 
                                to="/login" 
                                className="block w-full px-6 py-2.5 rounded-full border-2 border-[#191A23] text-[#191A23] text-sm font-bold text-center
                                         hover:bg-[#191A23] hover:text-white transition-all duration-300"
                            >
                                Login
                            </Link>
                            <Link 
                                to="/signup" 
                                className="block w-full px-6 py-2.5 rounded-full bg-[#B9FF66] border-2 border-[#B9FF66] text-[#191A23] text-sm font-bold text-center
                                         hover:bg-[#c8ff85] transition-all duration-300"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
