import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative pt-24 pb-32 lg:pt-48 lg:pb-40 overflow-hidden bg-white min-h-screen flex flex-col justify-center"
        >
            {/* Animated Background Effects */}
            <div className="absolute inset-0 overflow-hidden z-0 hero-background">
                {/* Animated SVG Background */}
                <svg className="absolute inset-0 w-full h-full hero-background" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#B9FF66', stopOpacity: 0.3 }}>
                                <animate attributeName="stop-color" values="#B9FF66; #4285f4; #B9FF66" dur="8s" repeatCount="indefinite" />
                            </stop>
                            <stop offset="100%" style={{ stopColor: '#4285f4', stopOpacity: 0.3 }}>
                                <animate attributeName="stop-color" values="#4285f4; #B9FF66; #4285f4" dur="8s" repeatCount="indefinite" />
                            </stop>
                        </linearGradient>
                        
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                            <feMerge>
                                <feMergeNode in="coloredBlur"/>
                                <feMergeNode in="SourceGraphic"/>
                            </feMerge>
                        </filter>
                    </defs>
                    
                    {/* Animated Circles */}
                    <circle cx="10%" cy="20%" r="100" fill="url(#grad1)" opacity="0.4">
                        <animate attributeName="cy" values="20%; 80%; 20%" dur="15s" repeatCount="indefinite" />
                        <animate attributeName="r" values="100; 150; 100" dur="10s" repeatCount="indefinite" />
                    </circle>
                    
                    <circle cx="90%" cy="70%" r="120" fill="url(#grad1)" opacity="0.3">
                        <animate attributeName="cy" values="70%; 30%; 70%" dur="12s" repeatCount="indefinite" />
                        <animate attributeName="r" values="120; 80; 120" dur="8s" repeatCount="indefinite" />
                    </circle>
                    
                    <circle cx="50%" cy="50%" r="80" fill="url(#grad1)" opacity="0.2">
                        <animate attributeName="cx" values="50%; 60%; 40%; 50%" dur="20s" repeatCount="indefinite" />
                        <animate attributeName="r" values="80; 120; 80" dur="12s" repeatCount="indefinite" />
                    </circle>
                    
                    {/* Animated Lines */}
                    <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#B9FF66" strokeWidth="2" opacity="0.1" filter="url(#glow)">
                        <animate attributeName="y1" values="30%; 70%; 30%" dur="10s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="30%; 70%; 30%" dur="10s" repeatCount="indefinite" />
                    </line>
                    
                    <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#4285f4" strokeWidth="2" opacity="0.1" filter="url(#glow)">
                        <animate attributeName="y1" values="60%; 40%; 60%" dur="14s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="60%; 40%; 60%" dur="14s" repeatCount="indefinite" />
                    </line>
                </svg>
                
                {/* Floating Geometric Shapes */}
                <div className="absolute top-1/4 left-[15%] w-20 h-20 border-2 border-[#B9FF66] rotate-45 animate-float opacity-20"></div>
                <div className="absolute top-1/3 right-[20%] w-16 h-16 border-2 border-blue-400 animate-float-delayed opacity-15"></div>
                <div className="absolute bottom-1/4 left-[25%] w-12 h-12 bg-[#B9FF66] opacity-10 animate-float-slow"></div>
                <div className="absolute bottom-1/3 right-[15%] w-14 h-14 border-2 border-purple-400 rounded-full animate-float opacity-15"></div>
            </div>

            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle, rgba(25, 26, 35, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Hero Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center hero-content">
                {/* Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#191A23]/5 border border-[#191A23]/10 mb-8 backdrop-blur-sm"
                >
                    <span className="w-2 h-2 rounded-full bg-[#B9FF66] animate-pulse" />
                    <span className="text-sm font-semibold text-[#191A23]">New Courses Available</span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, x: -100, skewX: -5 }}
                    animate={{ opacity: 1, x: 0, skewX: 0 }}
                    transition={{ duration: 1, delay: 0.4, ease: [0.42, 0, 0.58, 1] }}
                    className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 leading-tight md:leading-[1.05] font-geist text-[#191A23]"
                >
                    Master new skills <br />
                    <span className="relative inline-block">
                        with <span className="relative z-10 px-4 text-[#191A23]">WStudy</span>
                        <motion.span
                            initial={{ scaleX: 0 }}
                            animate={{ scaleX: 1 }}
                            transition={{ duration: 0.6, delay: 0.7, ease: [0.42, 0, 0.58, 1] }}
                            style={{ transformOrigin: 'left' }}
                            className="hero-highlight absolute left-0 right-0 top-6 -bottom-2 bg-[#B9FF66] rounded-xl -rotate-2 -z-10"
                        />
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.8, ease: [0.42, 0, 0.58, 1] }}
                    className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-geist px-4"
                >
                    The ultimate platform for interactive learning. Access thousands of quizzes, expert-led courses, and track your progress in real-time.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
                >
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link to="/signup" className="group relative w-full sm:w-auto max-w-xs sm:max-w-none px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#191A23] text-white font-bold text-sm sm:text-lg overflow-hidden flex justify-center will-change-transform shadow-lg hover:shadow-2xl hover:shadow-[#191A23]/30 transition-shadow">
                        <span className="relative z-10 flex items-center gap-2">
                            Start Learning Free
                            <motion.span 
                                className="arrow-icon"
                                animate={{ x: [0, 5, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                            >
                                →
                            </motion.span>
                        </span>
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-r from-[#2a2b3a] to-[#B9FF66]"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        />
                        </Link>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.7, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.05, y: -3 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full sm:w-auto max-w-xs sm:max-w-none px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-[#191A23] font-bold text-sm sm:text-lg hover:bg-gray-100 transition-all flex items-center justify-center gap-3 will-change-transform border-2 border-transparent hover:border-[#B9FF66] group"
                    >
                        <motion.div 
                            className="w-10 h-10 rounded-full border-2 border-[#191A23] flex items-center justify-center group-hover:border-[#B9FF66] group-hover:bg-[#B9FF66] transition-all"
                            whileHover={{ rotate: 360 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="text-sm ml-1 -mt-0.5">▶</span>
                        </motion.div>
                        Watch Demo
                    </motion.button>
                </motion.div>
            </div>

            {/* Brand Logos Strip - Infinite Scroll (Separated Section) */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.3, ease: [0.42, 0, 0.58, 1] }}
                className="relative z-10 mt-16 pt-8 pb-8 border-t border-[#191A23]/10 bg-white/80 backdrop-blur-sm"
            >
                <p className="text-gray-500 font-medium text-sm mb-6 uppercase tracking-widest text-center">Trusted by leading institutions</p>
                <div className="relative overflow-hidden">
                    {/* Gradient fade on left and right edges */}
                    <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white/90 to-transparent z-10 pointer-events-none"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white/90 to-transparent z-10 pointer-events-none"></div>
                    
                    <div 
                        className="flex items-center"
                        style={{
                            animation: 'scrollLeft 15s linear infinite',
                            willChange: 'transform',
                            transform: 'translate3d(0, 0, 0)',
                        }}
                    >
                        {/* Multiple sets for seamless loop - 6 sets total */}
                        {[...Array(6)].map((_, setIndex) => (
                            ['HARVARD', 'MIT', 'STANFORD', 'UDEMY', 'COURSERA', 'KHAN ACADEMY'].map((brand, index) => (
                                <span
                                    key={`${brand}-${setIndex}-${index}`}
                                    className="brand-item text-base sm:text-lg md:text-xl lg:text-2xl font-bold 
                                             mx-6 sm:mx-8 md:mx-10 lg:mx-14 whitespace-nowrap flex-shrink-0 
                                             text-[#191A23] hover:text-[#B9FF66]
                                             transition-colors duration-300 cursor-pointer"
                                >
                                    {brand}
                                </span>
                            ))
                        ))}
                    </div>
                </div>
            </motion.div>
        </motion.section>
    );
};

export default Hero;
