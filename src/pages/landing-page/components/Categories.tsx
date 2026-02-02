import React from 'react';
import { Calculator, Dna, Hourglass, Globe2, Laptop, Palette } from 'lucide-react';
import { motion } from 'framer-motion';

const categories = [
    { title: 'Mathematics', icon: <Calculator className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#F3F3F3]', textBg: 'bg-[#B9FF66]' },
    { title: 'Science', icon: <Dna className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#B9FF66]', textBg: 'bg-white' },
    { title: 'History', icon: <Hourglass className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#B9FF66]', textBg: 'bg-white' },
    { title: 'Language', icon: <Globe2 className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#F3F3F3]', textBg: 'bg-[#B9FF66]' },
    { title: 'Technology', icon: <Laptop className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#F3F3F3]', textBg: 'bg-[#B9FF66]' },
    { title: 'Arts', icon: <Palette className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#B9FF66]', textBg: 'bg-white' },
];

const Categories = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 80, scale: 0.8, rotateX: 15 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            rotateX: 0,
            transition: {
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1] as const
            }
        }
    };

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
            id="categories"
            className="pt-4 md:pt-6 pb-8 md:pb-12 bg-white"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, ease: [0.42, 0, 0.58, 1] }}
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-12 md:mb-16"
                >
                    <h2 className="text-2xl md:text-4xl font-bold bg-[#B9FF66] px-2 rounded-md font-geist inline-block text-[#191A23]">Popular Courses</h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-xl font-geist">
                        Explore our wide range of interactive courses designed to help you master any subject at your own pace.
                    </p>
                </motion.div>

                <motion.div
                    variants={containerVariants}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
                >
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            variants={cardVariants}
                            whileHover={{
                                y: -12,
                                boxShadow: "0 12px 0 #191A23",
                                scale: 1.03,
                                transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] }
                            }}
                            whileTap={{ scale: 0.98 }}
                            className={`category-card p-4 md:p-8 rounded-2xl md:rounded-[45px] border-2 border-[#191A23] shadow-[0_4px_0_#191A23] ${cat.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between group cursor-pointer transition-shadow`}
                        >
                            <div className="flex flex-col justify-between h-full gap-3 md:gap-6 flex-1 w-full">
                                <motion.h3 
                                    className={`text-base md:text-xl font-bold rounded-md px-2 py-1 inline-block ${cat.textBg} text-[#191A23]`}
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    {cat.title}
                                </motion.h3>
                                <div className="flex items-center gap-2">
                                    <motion.div 
                                        className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-[#191A23] text-[#B9FF66]"
                                        whileHover={{ rotate: 45, scale: 1.1 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </motion.div>
                                    <span className="text-xs md:text-sm font-medium text-[#191A23]">Enroll Now</span>
                                </div>
                            </div>
                            <motion.div 
                                className="absolute right-4 top-4 sm:relative sm:right-auto sm:top-auto w-12 h-12 md:w-20 md:h-20 flex items-center justify-center mt-0 sm:mt-0 sm:ml-4"
                                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-full h-full rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 sm:border-none group-hover:shadow-lg transition-shadow">
                                    {React.cloneElement(cat.icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6 text-[#191A23]" })}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    );
};

export default Categories;
