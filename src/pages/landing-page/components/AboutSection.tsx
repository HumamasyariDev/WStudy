import { useRef, useState, useEffect } from 'react';
import { Target, TrendingUp, Zap, Sparkles, Users, BookOpen, Trophy, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

// Animated Counter Hook
const useCountUp = (end: number, duration: number = 2, start: number = 0) => {
    const [count, setCount] = useState(start);
    const countRef = useRef<HTMLSpanElement>(null);
    
    useEffect(() => {
        const element = countRef.current;
        if (!element) return;
        
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                let startTime: number;
                const animate = (currentTime: number) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    setCount(Math.floor(easeOutQuart * (end - start) + start));
                    if (progress < 1) requestAnimationFrame(animate);
                };
                requestAnimationFrame(animate);
                observer.disconnect();
            }
        }, { threshold: 0.5 });
        
        observer.observe(element);
        return () => observer.disconnect();
    }, [end, duration, start]);
    
    return { count, countRef };
};

const AboutSection = () => {
    const heroRef = useRef(null);
    const statsRef = useRef(null);
    const valuesRef = useRef(null);

    // Animated counters
    const students = useCountUp(50, 2.5);
    const courses = useCountUp(1000, 2.5);
    const success = useCountUp(95, 2);
    const countries = useCountUp(120, 2.5);

    const stats = [
        { value: students.count, suffix: 'K+', label: 'Active Students', ref: students.countRef, icon: Users },
        { value: courses.count, suffix: '+', label: 'Courses Available', ref: courses.countRef, icon: BookOpen },
        { value: success.count, suffix: '%', label: 'Success Rate', ref: success.countRef, icon: Trophy },
        { value: countries.count, suffix: '+', label: 'Countries', ref: countries.countRef, icon: Globe },
    ];

    const values = [
        {
            icon: Target,
            title: 'Our Mission',
            description: 'To democratize education by providing accessible, high-quality learning experiences for everyone, everywhere.',
            bg: 'bg-gradient-to-br from-[#B9FF66] to-[#a3eb5b]',
            iconBg: 'bg-[#191A23]',
            iconColor: 'text-[#B9FF66]'
        },
        {
            icon: Zap,
            title: 'Innovation',
            description: 'We leverage cutting-edge technology to create engaging, interactive learning experiences that adapt to your needs.',
            bg: 'bg-gradient-to-br from-[#191A23] to-[#2a2b3a]',
            iconBg: 'bg-[#B9FF66]',
            iconColor: 'text-[#191A23]',
            textWhite: true
        },
        {
            icon: TrendingUp,
            title: 'Growth Mindset',
            description: 'We believe in continuous improvement and empowering learners to reach their full potential through personalized learning paths.',
            bg: 'bg-gradient-to-br from-[#F3F3F3] to-white',
            iconBg: 'bg-[#191A23]',
            iconColor: 'text-[#B9FF66]',
            border: 'border-2 border-[#191A23]/20'
        },
    ];

    return (
        <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.5 }}
            id="about" 
            className="bg-white relative overflow-hidden"
        >
            {/* Decorative Background */}
            <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute top-20 left-10 w-72 h-72 bg-[#B9FF66]/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#191A23]/5 rounded-full blur-3xl" />
            </div>

            {/* Hero Section */}
            <motion.div
                ref={heroRef}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                className="py-16 md:py-24 relative"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-4xl mx-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0, rotate: -180 }}
                            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, ease: [0.68, -0.55, 0.265, 1.55] }}
                            className="about-badge inline-flex items-center gap-2 px-4 py-2 bg-[#B9FF66]/20 rounded-full mb-6"
                        >
                            <Sparkles className="w-5 h-5 text-[#191A23]" />
                            <span className="text-sm font-bold text-[#191A23]">Our Story</span>
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2, ease: [0.42, 0, 0.58, 1] }}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold text-[#191A23] mb-6 font-geist"
                        >
                            About <span className="bg-[#B9FF66] px-3 rounded-lg inline-block">WStudy</span>
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4, ease: [0.42, 0, 0.58, 1] }}
                            className="text-base md:text-xl text-gray-600 leading-relaxed font-geist"
                        >
                            We're on a mission to transform education through technology, making quality learning accessible to everyone around the world.
                        </motion.p>
                    </div>
                </div>
            </motion.div>

            {/* Stats Section - Clean & Professional */}
            <div className="py-20 md:py-32 bg-[#191A23] relative overflow-hidden">
                {/* Subtle Grid Background */}
                <div className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(185,255,102,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(185,255,102,0.1) 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}
                />
                
                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#191A23] to-transparent opacity-50" />
                
                <div ref={statsRef} className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.3 }}
                        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
                        className="grid grid-cols-2 md:grid-cols-4 gap-10 sm:gap-12 md:gap-16 lg:gap-20"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40, scale: 0.8 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.15, ease: [0.68, -0.55, 0.265, 1.55] }}
                                className="stat-item group text-center md:text-left"
                            >
                                {/* Stat Card */}
                                <div className="relative">
                                    {/* Vertical Accent Line - only on desktop */}
                                    <div className="hidden md:block absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-[#B9FF66] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    {/* Glow Effect on Mobile */}
                                    <div className="md:hidden absolute inset-0 bg-[#B9FF66]/5 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    
                                    <div className="pl-0 md:pl-6 relative">
                                        {/* Number */}
                                        <div className="mb-2">
                                            <h3 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-white font-geist tracking-tight leading-none">
                                                <span ref={stat.ref}>{stat.value}</span>
                                                <span className="text-[#B9FF66]">{stat.suffix}</span>
                                            </h3>
                                        </div>
                                        
                                        {/* Label */}
                                        <p className="text-sm sm:text-base md:text-sm text-white/60 font-geist font-medium tracking-wide">
                                            {stat.label}
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-16 md:py-24 bg-white relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 md:mb-16">
                        <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#191A23] mb-4 font-geist">
                            Our <span className="bg-[#B9FF66] px-3 rounded-lg inline-block">Values</span>
                        </h3>
                        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto font-geist">
                            The principles that guide everything we do
                        </p>
                    </div>

                    <motion.div
                        ref={valuesRef}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, amount: 0.2 }}
                        transition={{ staggerChildren: 0.15, delayChildren: 0.2 }}
                        className="grid md:grid-cols-3 gap-6 md:gap-8"
                    >
                        {values.map((value, index) => {
                            const direction = index === 0 ? -100 : index === 2 ? 100 : 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: direction, y: index === 1 ? 50 : 0 }}
                                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.15, ease: [0.42, 0, 0.58, 1] }}
                                    whileHover={{ y: -12, scale: 1.03, transition: { duration: 0.3 } }}
                                    className={`value-card ${value.bg} ${value.border || ''} rounded-3xl p-8 md:p-10 shadow-xl hover:shadow-2xl transition-shadow group relative overflow-hidden cursor-pointer`}
                                >
                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full transform translate-x-16 -translate-y-16 group-hover:translate-x-12 group-hover:-translate-y-12 transition-transform" />
                                
                                <div className="relative z-10">
                                    <div className={`w-16 h-16 ${value.iconBg} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
                                        <value.icon className={`w-8 h-8 ${value.iconColor}`} />
                                    </div>
                                    <h4 className={`text-xl md:text-2xl font-bold mb-4 font-geist ${value.textWhite ? 'text-white' : 'text-[#191A23]'}`}>
                                        {value.title}
                                    </h4>
                                    <p className={`leading-relaxed font-geist ${value.textWhite ? 'text-gray-200' : 'text-gray-700'}`}>
                                        {value.description}
                                    </p>
                                </div>
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </div>
            </div>
        </motion.section>
    );
};

export default AboutSection;
