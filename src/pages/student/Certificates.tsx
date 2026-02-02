import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Award, Download, Share2, Calendar, CheckCircle, Trophy, Star, Medal } from 'lucide-react';

const Certificates = () => {
    const navigate = useNavigate();

    const certificates = [
        {
            id: 1,
            title: 'Advanced Calculus Mastery',
            course: 'Advanced Calculus',
            issueDate: 'January 15, 2026',
            instructor: 'Dr. Sarah Johnson',
            score: 92,
            credentialId: 'CALC-2026-001234',
            color: 'bg-[#B9FF66]',
            icon: Trophy
        },
        {
            id: 2,
            title: 'Biology Excellence Award',
            course: 'Biology & Life Sciences',
            issueDate: 'December 28, 2025',
            instructor: 'Prof. Michael Chen',
            score: 95,
            credentialId: 'BIO-2025-005678',
            color: 'bg-[#191A23]',
            icon: Medal
        },
        {
            id: 3,
            title: 'Spanish Language Proficiency',
            course: 'Spanish for Beginners',
            issueDate: 'December 20, 2025',
            instructor: 'Ms. Emma Wilson',
            score: 88,
            credentialId: 'LANG-2025-009012',
            color: 'bg-[#F3F3F3]',
            icon: Star
        },
        {
            id: 4,
            title: 'Web Development Professional',
            course: 'Web Development Bootcamp',
            issueDate: 'November 30, 2025',
            instructor: 'John Smith',
            score: 97,
            credentialId: 'WEB-2025-003456',
            color: 'bg-[#B9FF66]',
            icon: Award
        },
    ];

    const stats = [
        { label: 'Total Certificates', value: certificates.length, icon: Award },
        { label: 'This Year', value: certificates.filter(c => c.issueDate.includes('2026')).length, icon: Calendar },
        { label: 'Average Score', value: `${Math.round(certificates.reduce((acc, c) => acc + c.score, 0) / certificates.length)}%`, icon: CheckCircle },
        { label: 'Highest Score', value: '97%', icon: Trophy },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-[#191A23] font-geist mb-2">My Certificates</h1>
                    <p className="text-gray-600">Your achievements and completed courses</p>
                </motion.div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                                className="bg-white rounded-xl p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#F3F3F3] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-[#191A23]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xl font-bold text-[#191A23]">{stat.value}</p>
                                        <p className="text-xs text-gray-600 truncate">{stat.label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Certificates Grid */}
                <div className="grid md:grid-cols-2 gap-6">
                    {certificates.map((cert, idx) => {
                        const Icon = cert.icon;
                        return (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                                whileHover={{
                                    y: -5,
                                    boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                                }}
                                className="bg-white rounded-xl overflow-hidden shadow-sm group cursor-pointer"
                                onClick={() => navigate(`/student/certificate/${cert.id}`)}
                            >
                                {/* Certificate Header */}
                                <div className={`relative h-48 ${cert.color} p-6 overflow-hidden`}>
                                    {/* Decorative Elements */}
                                    <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -translate-y-16 translate-x-16 ${cert.color === 'bg-[#191A23]' ? 'bg-[#B9FF66]/10' : 'bg-[#191A23]/10'
                                        }`}></div>
                                    <div className={`absolute bottom-0 left-0 w-24 h-24 rounded-full translate-y-12 -translate-x-12 ${cert.color === 'bg-[#191A23]' ? 'bg-[#B9FF66]/10' : 'bg-[#191A23]/10'
                                        }`}></div>

                                    <div className="relative z-10 h-full flex flex-col justify-between">
                                        <div className="flex items-start justify-between">
                                            <div className={`w-16 h-16 rounded-xl flex items-center justify-center border-2 ${cert.color === 'bg-[#191A23]'
                                                ? 'bg-[#B9FF66]/20 border-[#B9FF66]/30'
                                                : cert.color === 'bg-[#F3F3F3]'
                                                    ? 'bg-white border-gray-300'
                                                    : 'bg-[#191A23]/20 border-[#191A23]/30'
                                                }`}>
                                                <Icon className={`w-8 h-8 ${cert.color === 'bg-[#191A23]' ? 'text-[#B9FF66]' : 'text-[#191A23]'
                                                    }`} />
                                            </div>
                                            <div className={`px-3 py-1 rounded-full border ${cert.color === 'bg-[#191A23]'
                                                ? 'bg-[#B9FF66]/20 border-[#B9FF66]/30'
                                                : cert.color === 'bg-[#F3F3F3]'
                                                    ? 'bg-white border-gray-300'
                                                    : 'bg-[#191A23]/20 border-[#191A23]/30'
                                                }`}>
                                                <p className={`text-sm font-bold ${cert.color === 'bg-[#191A23]' ? 'text-[#B9FF66]' : 'text-[#191A23]'
                                                    }`}>{cert.score}%</p>
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className={`text-2xl font-bold mb-1 ${cert.color === 'bg-[#191A23]' ? 'text-white' : 'text-[#191A23]'
                                                }`}>{cert.title}</h3>
                                            <p className={`text-sm ${cert.color === 'bg-[#191A23]' ? 'text-gray-300' : 'text-gray-600'
                                                }`}>{cert.course}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Certificate Details */}
                                <div className="p-6 space-y-4">
                                    <div className="grid grid-cols-2 gap-4 text-sm">
                                        <div>
                                            <p className="text-gray-500 text-xs mb-1">Issued Date</p>
                                            <p className="font-semibold text-[#191A23]">{cert.issueDate}</p>
                                        </div>
                                        <div>
                                            <p className="text-gray-500 text-xs mb-1">Instructor</p>
                                            <p className="font-semibold text-[#191A23]">{cert.instructor}</p>
                                        </div>
                                    </div>

                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-gray-500 text-xs mb-1">Credential ID</p>
                                        <p className="font-mono text-sm font-semibold text-[#191A23]">{cert.credentialId}</p>
                                    </div>

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-2">
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle download
                                            }}
                                            className="flex-1 bg-[#191A23] text-[#B9FF66] py-3 rounded-xl font-semibold text-sm hover:bg-[#2a2b3a] transition-colors flex items-center justify-center gap-2"
                                        >
                                            <Download size={16} />
                                            Download
                                        </button>
                                        <button 
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Handle share
                                            }}
                                            className="px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl font-semibold text-sm hover:bg-gray-200 transition-colors"
                                        >
                                            <Share2 size={16} />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Achievement Showcase */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-gradient-to-r from-[#191A23] to-[#2a2b3a] rounded-xl p-8 relative overflow-hidden"
                >
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9FF66] rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B9FF66] rounded-full opacity-10 blur-3xl"></div>

                    <div className="relative z-10 text-center">
                        <Trophy className="w-16 h-16 text-[#B9FF66] mx-auto mb-4" />
                        <h2 className="text-2xl font-bold text-white mb-2 font-geist">Keep Learning!</h2>
                        <p className="text-gray-300 mb-6">Complete more courses to earn additional certificates and showcase your skills</p>
                        <button className="bg-[#B9FF66] text-[#191A23] px-8 py-3 rounded-xl font-bold hover:bg-[#a8ee55] transition-colors">
                            Browse Courses
                        </button>
                    </div>
                </motion.div>

                {/* Empty State (if no certificates) */}
                {certificates.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-xl p-12 text-center shadow-sm"
                    >
                        <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No certificates yet</h3>
                        <p className="text-gray-600 mb-6">Complete courses to earn your first certificate</p>
                        <button className="bg-[#B9FF66] text-[#191A23] px-6 py-3 rounded-xl font-bold hover:bg-[#a8ee55] transition-colors">
                            Start Learning
                        </button>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Certificates;
