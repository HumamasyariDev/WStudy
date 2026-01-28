import React from 'react';
import { motion } from 'framer-motion';
import { Calculator, Dna, Hourglass, Globe2, Laptop, Palette } from 'lucide-react';

const categories = [
    { title: 'Mathematics', icon: <Calculator className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#F3F3F3]', textBg: 'bg-[#B9FF66]' },
    { title: 'Science', icon: <Dna className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#B9FF66]', textBg: 'bg-white' },
    { title: 'History', icon: <Hourglass className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#B9FF66]', textBg: 'bg-white' },
    { title: 'Language', icon: <Globe2 className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#F3F3F3]', textBg: 'bg-[#B9FF66]' },
    { title: 'Technology', icon: <Laptop className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#F3F3F3]', textBg: 'bg-[#B9FF66]' },
    { title: 'Arts', icon: <Palette className="w-6 h-6 text-[#191A23]" />, bg: 'bg-[#B9FF66]', textBg: 'bg-white' },
];

const Categories = () => {
    return (
        <section id="categories" className="pt-4 md:pt-6 pb-8 md:pb-12 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 mb-12 md:mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <h2 className="text-2xl md:text-4xl font-bold bg-[#B9FF66] px-2 rounded-md font-geist inline-block text-[#191A23]">Popular Courses</h2>
                    <p className="text-sm md:text-base text-gray-600 max-w-xl font-geist">
                        Explore our wide range of interactive courses designed to help you master any subject at your own pace.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {categories.map((cat, idx) => (
                        <motion.div
                            key={idx}
                            className={`p-4 md:p-8 rounded-2xl md:rounded-[45px] border-2 border-[#191A23] shadow-[0_4px_0_#191A23] ${cat.bg} flex flex-col sm:flex-row items-start sm:items-center justify-between group cursor-pointer`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                            whileHover={{
                                y: -4,
                                boxShadow: "0 6px 0 #191A23",
                                scale: 1.02,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="flex flex-col justify-between h-full gap-3 md:gap-6 flex-1 w-full">
                                <h3 className={`text-base md:text-xl font-bold rounded-md px-2 py-1 inline-block ${cat.textBg} text-[#191A23]`}>{cat.title}</h3>
                                <div className="flex items-center gap-2">
                                    <div className="w-7 h-7 md:w-8 md:h-8 rounded-full flex items-center justify-center bg-[#191A23] text-[#B9FF66]">
                                        <svg className="w-3.5 h-3.5 md:w-4 md:h-4 -rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                    </div>
                                    <span className="text-xs md:text-sm font-medium text-[#191A23]">Enroll Now</span>
                                </div>
                            </div>
                            <div className="absolute right-4 top-4 sm:relative sm:right-auto sm:top-auto w-12 h-12 md:w-20 md:h-20 flex items-center justify-center mt-0 sm:mt-0 sm:ml-4">
                                <div className="w-full h-full rounded-full flex items-center justify-center bg-white shadow-sm border border-gray-100 sm:border-none">
                                    {React.cloneElement(cat.icon as React.ReactElement, { className: "w-5 h-5 md:w-6 md:h-6 text-[#191A23]" })}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Categories;
