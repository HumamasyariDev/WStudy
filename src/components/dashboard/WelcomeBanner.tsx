import React from 'react';
import { motion } from 'framer-motion';

const WelcomeBanner = ({ name, progress = 75 }: { name: string, progress?: number }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-[#11698E] rounded-[24px] p-8 md:p-10 text-white relative overflow-hidden shadow-lg shadow-blue-900/10 mb-6"
        >
            {/* Abstract Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#16C79A] opacity-10 rounded-full translate-y-1/2 -translate-x-1/4 blur-xl"></div>

            <div className="relative z-10 max-w-2xl">
                <h2 className="text-3xl md:text-4xl font-bold font-lexend mb-2">Welcome, {name}!</h2>
                <h3 className="text-2xl md:text-3xl font-medium text-blue-100 mb-6 font-lexend">Continue your learning journey.</h3>

                <div className="flex items-center gap-4 mb-2">
                    <span className="text-sm font-medium text-blue-100">Overall Progress: {progress}%</span>
                </div>
                <div className="w-full h-3 bg-blue-900/30 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1.5, ease: "easeOut" }}
                        className="h-full bg-[#16C79A] rounded-full shadow-[0_0_10px_rgba(22,199,154,0.5)]"
                    />
                </div>
            </div>
        </motion.div>
    );
};

export default WelcomeBanner;
