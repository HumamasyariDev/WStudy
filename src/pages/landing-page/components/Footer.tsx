
const Footer = () => {
    return (
        <footer className="w-full mt-auto bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#191A23] rounded-t-[24px] sm:rounded-t-[32px] md:rounded-t-[45px] pt-10 sm:pt-12 md:pt-14 px-6 sm:px-8 md:px-12 pb-6 sm:pb-8 md:pb-12 text-white">
                    {/* Top Section */}
                    <div className="flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10 pb-6 sm:pb-8 md:pb-10 border-b border-white/20 -mt-8 sm:-mt-12 md:-mt-8">
                        {/* Logo */}
                        <div className="flex items-center w-full md:w-auto justify-center md:justify-start -mt-6 sm:-mt-8 md:-mt-6">
                            <img
                                src="/logo_text_transparent.png"
                                alt="WStudy"
                                className="h-28 sm:h-32 md:h-36 lg:h-40 w-auto object-contain brightness-0 invert"
                            />
                        </div>

                        {/* Navigation */}
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 sm:gap-5 md:gap-6 lg:gap-8 text-sm sm:text-base font-medium -mt-4 sm:-mt-6 md:mt-0">
                            <a href="#" className="text-white hover:text-[#B9FF66] transition-colors duration-200">About us</a>
                            <a href="#" className="text-white hover:text-[#B9FF66] transition-colors duration-200">Courses</a>
                            <a href="#" className="text-white hover:text-[#B9FF66] transition-colors duration-200">Mentors</a>
                            <a href="#" className="text-white hover:text-[#B9FF66] transition-colors duration-200">Pricing</a>
                        </div>

                        {/* Social Icons */}
                        <div className="flex gap-4 sm:gap-5 mb-4 sm:mb-6 md:mb-0">
                            <a href="#" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#191A23] flex items-center justify-center 
                                                 hover:bg-[#B9FF66] hover:scale-110 transition-all duration-300 shadow-lg">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                            </a>
                            <a href="#" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#191A23] flex items-center justify-center 
                                                 hover:bg-[#B9FF66] hover:scale-110 transition-all duration-300 shadow-lg">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                            </a>
                            <a href="#" className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white text-[#191A23] flex items-center justify-center 
                                                 hover:bg-[#B9FF66] hover:scale-110 transition-all duration-300 shadow-lg">
                                <svg className="w-7 h-7 sm:w-8 sm:h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                            </a>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-16 mb-8 sm:mb-10">
                        {/* Contact Info */}
                        <div>
                            <h4 className="bg-[#B9FF66] text-[#191A23] px-4 py-2 rounded-xl inline-block font-bold mb-5 sm:mb-6 md:mb-7 text-sm sm:text-base shadow-lg">
                                Get in Touch
                            </h4>
                            <div className="space-y-4 sm:space-y-5">
                                {/* Email */}
                                <div className="flex items-start gap-3 sm:gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#B9FF66] transition-all duration-300">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#191A23] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs sm:text-sm text-white/50 mb-0.5 font-medium">Email</p>
                                        <a href="mailto:info@wstudy.com" className="text-sm sm:text-base text-white hover:text-[#B9FF66] transition-colors font-medium">
                                            info@wstudy.com
                                        </a>
                                    </div>
                                </div>

                                {/* Phone */}
                                <div className="flex items-start gap-3 sm:gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#B9FF66] transition-all duration-300">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#191A23] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs sm:text-sm text-white/50 mb-0.5 font-medium">Phone</p>
                                        <a href="tel:555-567-8901" className="text-sm sm:text-base text-white hover:text-[#B9FF66] transition-colors font-medium">
                                            555-567-8901
                                        </a>
                                    </div>
                                </div>

                                {/* Address */}
                                <div className="flex items-start gap-3 sm:gap-4 group">
                                    <div className="flex-shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/10 flex items-center justify-center group-hover:bg-[#B9FF66] transition-all duration-300">
                                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:text-[#191A23] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs sm:text-sm text-white/50 mb-0.5 font-medium">Address</p>
                                        <p className="text-sm sm:text-base text-white leading-relaxed">
                                            1234 Main St, Jakarta<br />
                                            Indonesia 12345
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        <div className="bg-gradient-to-br from-[#292A32] to-[#1f2028] p-6 sm:p-7 md:p-9 rounded-2xl border border-white/5 shadow-xl">
                            <div className="flex items-start gap-3 mb-5 sm:mb-6">
                                <div className="flex-shrink-0 w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-[#B9FF66]/10 flex items-center justify-center">
                                    <svg className="w-6 h-6 sm:w-7 sm:h-7 text-[#B9FF66]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-white font-bold mb-1.5 text-base sm:text-lg">Join Our Newsletter</h4>
                                    <p className="text-white/60 text-xs sm:text-sm leading-relaxed">Get exclusive updates, course launches, and special offers delivered to your inbox</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-3">
                                <input
                                    type="email"
                                    placeholder="Enter your email address"
                                    className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 sm:px-5 py-3 sm:py-3.5 
                                             text-sm sm:text-base text-white placeholder-white/30 
                                             focus:outline-none focus:border-[#B9FF66] focus:bg-white/10
                                             transition-all duration-200"
                                />
                                <button className="bg-[#B9FF66] text-[#191A23] px-7 sm:px-9 py-3 sm:py-3.5 rounded-xl 
                                                 text-sm sm:text-base font-bold 
                                                 hover:bg-[#a3eb5b] hover:shadow-lg hover:shadow-[#B9FF66]/20
                                                 transition-all duration-200 whitespace-nowrap">
                                    Subscribe Now
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Bottom */}
                    <div className="pt-6 sm:pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-3 sm:gap-4 text-xs sm:text-sm">
                        <p className="text-white/60 text-center md:text-left">© 2026 WStudy. All Rights Reserved.</p>
                        <div className="flex gap-4 sm:gap-6">
                            <a href="#" className="text-white/60 hover:text-[#B9FF66] transition-colors duration-200">Privacy Policy</a>
                            <a href="#" className="text-white/60 hover:text-[#B9FF66] transition-colors duration-200">Terms of Service</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
