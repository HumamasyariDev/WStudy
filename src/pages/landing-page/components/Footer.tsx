import React from 'react';

const Footer = () => {
    return (
        <footer className="w-full mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-[#191A23] rounded-t-[32px] md:rounded-t-[45px] p-6 md:p-12 text-white">
                <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-12 mb-12 md:mb-16 border-b border-white/20 pb-8 md:pb-12">
                    <div className="flex items-center">
                        <img 
                            src="/logo_text_transparent.png" 
                            alt="WStudy" 
                            className="h-10 w-auto object-contain brightness-0 invert"
                        />
                    </div>

                    <div className="flex flex-wrap gap-4 md:gap-8 text-sm md:text-base">
                        <a href="#" className="hover:underline hover:text-[#B9FF66]">About us</a>
                        <a href="#" className="hover:underline hover:text-[#B9FF66]">Courses</a>
                        <a href="#" className="hover:underline hover:text-[#B9FF66]">Mentors</a>
                        <a href="#" className="hover:underline hover:text-[#B9FF66]">Pricing</a>
                        <a href="#" className="hover:underline hover:text-[#B9FF66]">Blog</a>
                    </div>

                    <div className="flex gap-3 md:gap-4">
                        <div className="w-8 h-8 rounded-full bg-white text-[#191A23] flex items-center justify-center cursor-pointer hover:bg-[#B9FF66] transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" /></svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white text-[#191A23] flex items-center justify-center cursor-pointer hover:bg-[#B9FF66] transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-white text-[#191A23] flex items-center justify-center cursor-pointer hover:bg-[#B9FF66] transition-colors">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" /></svg>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-12 mb-12">
                    <div>
                        <h4 className="bg-[#B9FF66] text-[#191A23] px-2 rounded-md inline-block font-bold mb-4 md:mb-6 text-sm md:text-base">Contact us:</h4>
                        <p className="mb-2 text-sm md:text-base">Email: info@wstudy.com</p>
                        <p className="mb-2 text-sm md:text-base">Phone: 555-567-8901</p>
                        <p className="text-sm md:text-base">Address: 1234 Main St<br />Jakarta, Indonesia 12345</p>
                    </div>

                    <div className="bg-[#292A32] p-4 md:p-8 rounded-[20px] flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="flex-1 bg-transparent border-2 border-white rounded-xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base text-white placeholder-gray-400 focus:outline-none focus:border-[#B9FF66]" 
                        />
                        <button className="bg-[#B9FF66] text-[#191A23] px-6 md:px-8 py-3 md:py-4 rounded-xl text-sm md:text-base font-bold hover:bg-[#a3eb5b] transition-colors whitespace-nowrap">
                            Subscribe
                        </button>
                    </div>
                </div>

                <div className="pt-6 md:pt-8 border-t border-white/20 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm text-gray-400">
                    <p>© 2024 WStudy. All Rights Reserved.</p>
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                </div>
            </div>
            </div>
        </footer>
    );
};

export default Footer;
