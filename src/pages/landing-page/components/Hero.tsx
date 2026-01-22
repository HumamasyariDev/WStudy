import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Trophy, BookOpen, Zap, Star } from 'lucide-react';

const Hero = () => {
    // Mouse parallax setup
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for mouse movement
    const springConfig = { damping: 25, stiffness: 150 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Transformations for different layers
    const layer1X = useTransform(springX, [-0.5, 0.5], [-20, 20]);
    const layer1Y = useTransform(springY, [-0.5, 0.5], [-20, 20]);

    const layer2X = useTransform(springX, [-0.5, 0.5], [30, -30]);
    const layer2Y = useTransform(springY, [-0.5, 0.5], [30, -30]);

    const layer3X = useTransform(springX, [-0.5, 0.5], [-40, 40]);
    const layer3Y = useTransform(springY, [-0.5, 0.5], [-40, 40]);

    // Handle mouse move
    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize coordinates to -0.5 to 0.5
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    // Scroll parallax setup
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <section
            className="relative pt-24 pb-16 lg:pt-48 lg:pb-32 overflow-hidden bg-white min-h-[85vh] lg:min-h-[90vh] flex items-center"
            onMouseMove={handleMouseMove}
        >
            {/* Dynamic Background */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `
                            radial-gradient(circle, rgba(25, 26, 35, 0.08) 1.5px, transparent 1px),
                            radial-gradient(circle, rgba(185, 255, 102, 0.05) 1px, transparent 1px)
                        `,
                        backgroundSize: '40px 40px, 60px 60px',
                        backgroundPosition: '0 0, 30px 30px'
                    }}
                />

                {/* Moving Blobs */}
                <motion.div
                    className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-[#B9FF66]/20 rounded-full blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 90, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ x: layer1X, y: layer1Y }}
                />
                <motion.div
                    className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#191A23]/5 rounded-full blur-[80px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        rotate: [0, -45, 0],
                        opacity: [0.3, 0.5, 0.3]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                    style={{ x: layer2X, y: layer2Y }}
                />
            </div>

            {/* Floating Elements (3D-like Icons) */}
            <div className="absolute inset-0 pointer-events-none z-0">
                {/* Trophy - Top Right */}
                <motion.div
                    className="absolute top-[15%] right-[10%] lg:right-[15%] hidden md:block"
                    style={{ x: layer3X, y: layer3Y }}
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 5, 0]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <div className="bg-white p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.1)] border border-gray-100 rotate-12 backdrop-blur-sm">
                        <Trophy className="w-12 h-12 text-[#B9FF66] fill-[#191A23]" />
                    </div>
                </motion.div>

                {/* Book - Bottom Left */}
                <motion.div
                    className="absolute bottom-[20%] left-[5%] lg:left-[10%] hidden md:block"
                    style={{ x: layer2X, y: layer2Y }}
                    animate={{
                        y: [0, 25, 0],
                        rotate: [0, -10, 0]
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1
                    }}
                >
                    <div className="bg-[#191A23] p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.2)] border border-[#191A23] -rotate-6">
                        <BookOpen className="w-10 h-10 text-[#B9FF66]" />
                    </div>
                </motion.div>

                {/* Star - Middle Left */}
                <motion.div
                    className="absolute top-[30%] left-[15%] hidden lg:block"
                    style={{ x: layer1X, y: layer1Y }}
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360]
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                >
                    <Star className="w-8 h-8 text-[#191A23]/20 fill-[#B9FF66]/30" />
                </motion.div>

                {/* Zap - Bottom Right */}
                <motion.div
                    className="absolute bottom-[30%] right-[20%] hidden lg:block"
                    style={{ x: layer2X, y: layer2Y }}
                    animate={{
                        y: [0, -15, 0],
                        opacity: [0.5, 0.8, 0.5]
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Zap className="w-12 h-12 text-[#B9FF66] opacity-60" />
                </motion.div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                <motion.div style={{ y: y1, opacity }}>
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#191A23]/5 border border-[#191A23]/10 mb-8 backdrop-blur-sm"
                    >
                        <span className="w-2 h-2 rounded-full bg-[#B9FF66] animate-pulse" />
                        <span className="text-sm font-semibold text-[#191A23]">New Courses Available</span>
                    </motion.div>

                    <motion.h1
                        className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 md:mb-8 leading-tight md:leading-[1.05] font-geist text-[#191A23]"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        Master new skills <br />
                        <span className="relative inline-block">
                            with <span className="relative z-10 px-4 text-[#191A23]">WStudy</span>
                            <motion.span
                                className="absolute inset-0 bg-[#B9FF66] rounded-xl -rotate-2 -z-10"
                                initial={{ scale: 0, rotate: 0 }}
                                animate={{ scale: 1, rotate: -2 }}
                                transition={{ duration: 0.5, delay: 0.8, type: "spring" }}
                            />
                        </span>
                    </motion.h1>

                    <motion.p
                        className="text-sm sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-12 leading-relaxed font-geist px-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        The ultimate platform for interactive learning. Access thousands of quizzes, expert-led courses, and track your progress in real-time.
                    </motion.p>

                    <motion.div
                        className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <Link to="/signup" className="group relative w-full sm:w-auto max-w-xs sm:max-w-none px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-[#191A23] text-white font-bold text-sm sm:text-lg overflow-hidden transition-all hover:shadow-2xl hover:scale-105 active:scale-95 flex justify-center">
                            <span className="relative z-10 flex items-center gap-2">
                                Start Learning Free
                                <motion.span
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    →
                                </motion.span>
                            </span>
                            <div className="absolute inset-0 bg-[#2a2b3a] translate-y-full transition-transform duration-300 group-hover:translate-y-0" />
                        </Link>

                        <button className="w-full sm:w-auto max-w-xs sm:max-w-none px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-[#191A23] font-bold text-sm sm:text-lg hover:bg-gray-100 transition-colors flex items-center justify-center gap-2">
                            <motion.div
                                className="w-8 h-8 rounded-full border-2 border-[#191A23] flex items-center justify-center"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                            >
                                <span className="text-xs">▶</span>
                            </motion.div>
                            Watch Demo
                        </button>
                    </motion.div>
                </motion.div>

                {/* Brand Logos Strip with simple float */}
                <motion.div
                    className="mt-16 md:mt-32 pt-8 md:pt-10 border-t border-[#191A23]/10"
                    style={{ y: y2 }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ duration: 1, delay: 0.8 }}
                >
                    <p className="text-gray-500 font-medium text-sm mb-8 uppercase tracking-widest">Trusted by leading institutions</p>
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                        {['HARVARD', 'MIT', 'STANFORD', 'UDEMY', 'COURSERA', 'KHAN ACADEMY'].map((brand) => (
                            <motion.span
                                key={brand}
                                className="text-base md:text-2xl font-bold text-[#191A23] cursor-default"
                                whileHover={{ scale: 1.1, color: '#191A23' }}
                            >
                                {brand}
                            </motion.span>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default Hero;
