import React from 'react';
import { motion } from 'framer-motion';
import { Target, Trophy, BarChart3, TrendingUp, Users, Smartphone, ArrowRight } from 'lucide-react';

const features = [
    { title: 'Personalized Learning', icon: Target, description: 'Adaptive quizzes that adjust to your knowledge level and learning pace.', bg: 'bg-white', textBg: 'bg-[#B9FF66]' },
    { title: 'Reward System', icon: Trophy, description: 'Earn points, badges, and real rewards for your achievements.', bg: 'bg-[#B9FF66]', textBg: 'bg-white' },
    { title: 'Teacher Dashboard', icon: BarChart3, description: 'Comprehensive tools for educators to create and manage quizzes.', bg: 'bg-white', textBg: 'bg-[#B9FF66]' },
    { title: 'Progress Tracking', icon: TrendingUp, description: 'Monitor progress with detailed analytics and insights.', bg: 'bg-white', textBg: 'bg-[#B9FF66]' },
    { title: 'Competitive Leaderboards', icon: Users, description: 'Compete with peers and climb the ranks on weekly leaderboards.', bg: 'bg-[#B9FF66]', textBg: 'bg-white' },
    { title: 'Mobile Friendly', icon: Smartphone, description: 'Access quizzes anytime, anywhere on any device.', bg: 'bg-white', textBg: 'bg-[#B9FF66]' },
];

const Features = () => {
    return (
        <section id="features" className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div 
                    className="grid md:grid-cols-2 gap-6 md:gap-8 items-start md:items-center mb-12 md:mb-16 pb-6 md:pb-8 border-b-2 border-[#191A23]"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <h2 className="text-3xl md:text-5xl font-bold font-geist text-[#191A23]">
                        Why <span className="bg-[#B9FF66] px-2 md:px-3 py-1 rounded-lg">WStudy</span>
                    </h2>
                    <p className="text-sm md:text-lg text-[#191A23] font-geist leading-relaxed">
                        Discover powerful features designed to enhance your learning experience and help you achieve your educational goals.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {features.map((feature, idx) => {
                        const Icon = feature.icon;
                        return (
                            <motion.div
                                key={idx}
                                className={`${feature.bg} border-2 border-[#191A23] rounded-[24px] md:rounded-[32px] p-6 md:p-8 flex flex-col justify-between min-h-[220px] md:min-h-[280px] transition-all hover:shadow-lg`}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
                                whileHover={{ y: -4, scale: 1.02, transition: { duration: 0.2 } }}
                            >
                                <div className="flex justify-between items-start mb-3 md:mb-4">
                                    <h3 className={`text-base md:text-xl font-semibold ${feature.textBg} text-[#191A23] px-2 py-1 rounded-md inline-block`}>
                                        {feature.title}
                                    </h3>
                                    <Icon className="w-10 h-10 md:w-12 md:h-12 text-[#191A23] opacity-15" />
                                </div>
                                <div className="mt-auto">
                                    <p className="text-xs md:text-sm mb-3 md:mb-4 leading-relaxed text-[#191A23]">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center gap-2 text-[#191A23] font-medium cursor-pointer hover:gap-3 transition-all">
                                        <div className="w-6 h-6 rounded-full bg-[#191A23] text-white flex items-center justify-center">
                                            <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4" />
                                        </div>
                                        <span className="text-xs md:text-sm font-semibold">Learn more</span>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Features;
