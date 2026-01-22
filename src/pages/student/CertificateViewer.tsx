import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Download, Share2, Award, CheckCircle } from 'lucide-react';

const CertificateViewer = () => {
    const navigate = useNavigate();
    const { certificateId } = useParams();

    // Mock certificate data
    const certificate = {
        id: certificateId,
        title: 'Advanced Calculus Mastery',
        course: 'Advanced Calculus',
        studentName: 'Alex Student',
        issueDate: 'January 15, 2026',
        instructor: 'Dr. Sarah Johnson',
        score: 92,
        credentialId: 'CALC-2026-001234',
        institution: 'WStudy Learning Platform'
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
            {/* Close Button */}
            <button
                onClick={() => navigate('/student/certificates')}
                className="fixed top-4 right-4 w-12 h-12 bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors shadow-lg z-10"
            >
                <X className="w-6 h-6 text-[#191A23]" />
            </button>

            {/* Certificate Container */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="w-full max-w-4xl"
            >
                {/* Certificate */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Certificate Header - Decorative Border */}
                    <div className="h-4 bg-gradient-to-r from-[#191A23] via-[#B9FF66] to-[#191A23]"></div>

                    {/* Certificate Content */}
                    <div className="p-6 md:p-12 lg:p-16 relative">
                        {/* Watermark Background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                            <Award className="w-64 md:w-96 h-64 md:h-96 text-[#191A23]" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 space-y-4 md:space-y-8">
                            {/* Logo & Title */}
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-2 md:mb-4">
                                    <img 
                                        src="/logo_transparent.png" 
                                        alt="WStudy Logo" 
                                        className="h-12 md:h-16 w-auto object-contain"
                                    />
                                </div>
                                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#191A23] font-geist mb-1 md:mb-2">
                                    Certificate of Completion
                                </h1>
                                <p className="text-sm md:text-base text-gray-600">This certifies that</p>
                            </div>

                            {/* Student Name */}
                            <div className="text-center py-3 md:py-6 border-b-2 border-[#B9FF66]">
                                <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[#191A23] font-geist">
                                    {certificate.studentName}
                                </h2>
                            </div>

                            {/* Achievement Text */}
                            <div className="text-center space-y-2 md:space-y-4">
                                <p className="text-sm md:text-lg text-gray-700">
                                    has successfully completed the course
                                </p>
                                <h3 className="text-xl md:text-3xl lg:text-4xl font-bold text-[#191A23] font-geist">
                                    {certificate.course}
                                </h3>
                                <p className="text-sm md:text-lg text-gray-700">
                                    with a score of <span className="font-bold text-[#B9FF66] text-lg md:text-2xl">{certificate.score}%</span>
                                </p>
                            </div>

                            {/* Achievement Badge */}
                            <div className="flex justify-center py-4 md:py-6">
                                <div className="relative">
                                    <div className="w-24 h-24 md:w-32 md:h-32 bg-[#B9FF66] rounded-full flex items-center justify-center border-4 border-[#191A23]">
                                        <Award className="w-12 h-12 md:w-16 md:h-16 text-[#191A23]" />
                                    </div>
                                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-8 h-8 md:w-12 md:h-12 bg-[#191A23] rounded-full flex items-center justify-center border-2 md:border-4 border-white">
                                        <CheckCircle className="w-4 h-4 md:w-6 md:h-6 text-[#B9FF66]" />
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
                                <div className="text-center">
                                    <p className="text-xs md:text-sm text-gray-500 mb-1">Issue Date</p>
                                    <p className="text-sm md:text-base font-semibold text-[#191A23]">{certificate.issueDate}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs md:text-sm text-gray-500 mb-1">Instructor</p>
                                    <p className="text-sm md:text-base font-semibold text-[#191A23]">{certificate.instructor}</p>
                                </div>
                            </div>

                            {/* Credential ID */}
                            <div className="text-center pt-4 md:pt-6 border-t border-gray-200">
                                <p className="text-xs md:text-sm text-gray-500 mb-1">Credential ID</p>
                                <p className="text-xs md:text-base font-mono font-bold text-[#191A23]">{certificate.credentialId}</p>
                            </div>

                            {/* Signature Section - Hidden on mobile */}
                            <div className="hidden md:flex justify-center gap-12 pt-8">
                                <div className="text-center">
                                    <div className="w-48 border-t-2 border-[#191A23] pt-2">
                                        <p className="font-semibold text-[#191A23]">{certificate.instructor}</p>
                                        <p className="text-sm text-gray-600">Course Instructor</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="w-48 border-t-2 border-[#191A23] pt-2">
                                        <p className="font-semibold text-[#191A23]">WStudy Platform</p>
                                        <p className="text-sm text-gray-600">Authorized By</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Footer - Decorative Border */}
                    <div className="h-4 bg-gradient-to-r from-[#191A23] via-[#B9FF66] to-[#191A23]"></div>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mt-6"
                >
                    <button className="px-6 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center gap-2 shadow-lg">
                        <Download className="w-5 h-5" />
                        Download Certificate
                    </button>
                    <button className="px-6 py-3 bg-white text-[#191A23] rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg">
                        <Share2 className="w-5 h-5" />
                        Share Certificate
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CertificateViewer;
