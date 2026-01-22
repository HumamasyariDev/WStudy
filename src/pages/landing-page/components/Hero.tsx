import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        radial-gradient(circle, rgba(25, 26, 35, 0.3) 2px, transparent 1px),
                        radial-gradient(circle, rgba(185, 255, 102, 0.12) 1.5px, transparent 1.5px)
                    `,
                    backgroundSize: '50px 50px, 80px 80px',
                    backgroundPosition: '0 0, 40px 40px'
                }}
            />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">

                <motion.h1
                    className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 md:mb-8 leading-[1.1] font-geist text-[#191A23]"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Master new skills <br />
                    with <span className="px-2 rounded-md bg-[#B9FF66]">WStudy</span>
                </motion.h1>

                <motion.p
                    className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-10 md:mb-12 leading-relaxed font-geist px-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    The ultimate platform for interactive learning. Access thousands of quizzes, expert-led courses, and track your progress in real-time.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <Link to="/signup" className="w-full sm:w-auto px-8 py-4 rounded-xl bg-[#191A23] text-white font-medium text-base md:text-lg transition-all hover:bg-[#B9FF66] hover:text-[#191A23] hover:-translate-y-1 hover:shadow-lg">
                        Start Learning Free
                    </Link>
                </motion.div>

                {/* Brand Logos Strip */}
                <motion.div
                    className="mt-16 md:mt-20 pt-8 md:pt-10 border-t border-[#191A23]/10 flex flex-wrap justify-center gap-6 md:gap-12 opacity-60 grayscale"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <span className="text-sm md:text-xl font-bold text-[#191A23]">HARVARD</span>
                    <span className="text-sm md:text-xl font-bold text-[#191A23]">MIT</span>
                    <span className="text-sm md:text-xl font-bold text-[#191A23]">STANFORD</span>
                    <span className="text-sm md:text-xl font-bold text-[#191A23]">UDEMY</span>
                    <span className="text-sm md:text-xl font-bold text-[#191A23]">COURSERA</span>
                    <span className="text-sm md:text-xl font-bold text-[#191A23]">KHAN ACADEMY</span>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
