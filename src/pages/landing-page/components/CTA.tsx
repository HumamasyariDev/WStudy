import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CTA = () => {
    return (
        <motion.section 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
            className="py-16 md:py-24 bg-white relative overflow-hidden"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                {/* Decorative elements around container */}
                <motion.div
                    className="absolute -top-12 -left-12 w-20 md:w-24 h-20 md:h-24 bg-[#B9FF66] rounded-full opacity-60"
                    animate={{ y: [0, -20, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -top-8 right-32 w-12 md:w-16 h-12 md:h-16 bg-[#191A23] rounded-lg rotate-12"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/2 -right-8 w-16 md:w-20 h-16 md:h-20 bg-[#B9FF66] rounded-full opacity-50"
                    animate={{ y: [0, 20, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute -bottom-10 left-1/4 w-12 md:w-14 h-12 md:h-14 bg-[#191A23] rounded-full"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-20 -left-6 w-10 md:w-12 h-10 md:h-12 bg-[#B9FF66] rounded-lg rotate-45"
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute top-1/3 left-12 w-6 md:w-8 h-6 md:h-8 bg-[#191A23] rounded-full opacity-70"
                    animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.9, 0.5] }}
                    transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-16 w-8 md:w-10 h-8 md:h-10 bg-[#B9FF66] rounded-lg rotate-12 opacity-60"
                    animate={{ y: [0, 18, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
                />

                <motion.div
                    className="bg-[#F3F3F3] border-2 border-[#191A23] rounded-[24px] md:rounded-[32px] p-8 md:p-12 lg:p-16 text-center relative overflow-hidden"
                    initial={{ opacity: 0, y: 50, scale: 0.95 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ scale: 1.02 }}
                >
                    {/* Background gradient animation */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-[#B9FF66]/5 via-transparent to-[#191A23]/5"
                        animate={{ 
                            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                        }}
                        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    />
                    
                    <motion.h2 
                        className="text-3xl md:text-4xl lg:text-5xl font-bold font-geist text-[#191A23] mb-4 md:mb-6 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Let's make things happen
                    </motion.h2>
                    <motion.p 
                        className="text-sm md:text-base lg:text-lg text-[#191A23] max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed px-4 relative z-10"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                        Contact us today to learn more about how our quiz platform can help your students succeed and achieve their learning goals.
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                        whileHover={{ scale: 1.05, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className="relative z-10"
                    >
                        <Link
                            to="/signup"
                            className="inline-block px-6 md:px-8 py-3 md:py-4 bg-[#191A23] text-white font-semibold text-base md:text-lg rounded-xl transition-all hover:bg-[#B9FF66] hover:text-[#191A23] hover:shadow-2xl hover:shadow-[#B9FF66]/20 relative overflow-hidden group"
                        >
                            <span className="relative z-10">Get your free proposal</span>
                            <motion.div
                                className="absolute inset-0 bg-[#B9FF66]"
                                initial={{ x: '-100%' }}
                                whileHover={{ x: 0 }}
                                transition={{ duration: 0.3 }}
                            />
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </motion.section>
    );
};

export default CTA;
