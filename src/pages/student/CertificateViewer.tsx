import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';
import { X, Download, Share2, Award, CheckCircle } from 'lucide-react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';

const CertificateViewer = () => {
    const navigate = useNavigate();
    const { certificateId } = useParams();
    const certificateRef = useRef<HTMLDivElement>(null);

    const handleDownload = async () => {
        if (!certificateRef.current) return;

        try {
            // Capture the certificate as canvas
            const canvas = await html2canvas(certificateRef.current, {
                scale: 2,
                backgroundColor: '#ffffff',
                logging: false,
                useCORS: true,
                allowTaint: true,
                foreignObjectRendering: false,
                imageTimeout: 0,
                removeContainer: true
            });

            // Convert canvas to data URL and download
            const dataUrl = canvas.toDataURL('image/png', 1.0);
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = `WStudy-Certificate-${certificate.credentialId}.png`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error('Error downloading certificate:', error);
            alert('Failed to download certificate. Please try again.');
        }
    };

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
                className="w-full max-w-2xl"
            >
                {/* Certificate */}
                <div 
                    ref={certificateRef} 
                    className="bg-white rounded-2xl shadow-2xl overflow-hidden"
                    style={{
                        backgroundColor: '#ffffff',
                        color: '#191A23'
                    }}
                >
                    {/* Certificate Header - Decorative Border */}
                    <div className="h-4" style={{ background: 'linear-gradient(to right, #191A23, #B9FF66, #191A23)' }}></div>

                    {/* Certificate Content */}
                    <div className="p-6 md:p-8 lg:p-10 relative">
                        {/* Watermark Background */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                            <Award className="w-64 md:w-96 h-64 md:h-96 text-[#191A23]" />
                        </div>

                        {/* Content */}
                        <div className="relative z-10 space-y-3 md:space-y-5">
                            {/* Logo & Title */}
                            <div className="text-center">
                                <div className="flex items-center justify-center mb-2 md:mb-4">
                                    <img 
                                        src="/logo_transparent.png" 
                                        alt="WStudy Logo" 
                                        className="h-12 md:h-16 w-auto object-contain"
                                    />
                                </div>
                                <h1 className="text-xl md:text-3xl font-bold font-geist mb-1 md:mb-2" style={{ color: '#191A23' }}>
                                    Certificate of Completion
                                </h1>
                                <p className="text-sm md:text-base" style={{ color: '#6B7280' }}>This certifies that</p>
                            </div>

                            {/* Student Name */}
                            <div className="text-center py-2 md:py-4" style={{ borderBottom: '2px solid #B9FF66' }}>
                                <h2 className="text-xl md:text-3xl font-bold font-geist" style={{ color: '#191A23' }}>
                                    {certificate.studentName}
                                </h2>
                            </div>

                            {/* Achievement Text */}
                            <div className="text-center space-y-2 md:space-y-4">
                                <p className="text-sm md:text-lg" style={{ color: '#374151' }}>
                                    has successfully completed the course
                                </p>
                                <h3 className="text-lg md:text-2xl font-bold font-geist" style={{ color: '#191A23' }}>
                                    {certificate.course}
                                </h3>
                                <p className="text-sm md:text-lg" style={{ color: '#374151' }}>
                                    with a score of <span className="font-bold text-lg md:text-2xl" style={{ color: '#B9FF66' }}>{certificate.score}%</span>
                                </p>
                            </div>

                            {/* Achievement Badge */}
                            <div className="flex justify-center py-3 md:py-4">
                                <div className="relative">
                                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center" style={{ backgroundColor: '#B9FF66', border: '4px solid #191A23' }}>
                                        <Award className="w-10 h-10 md:w-12 md:h-12" style={{ color: '#191A23' }} />
                                    </div>
                                    <div className="absolute -top-1 -right-1 md:-top-2 md:-right-2 w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: '#191A23', border: '2px solid #ffffff' }}>
                                        <CheckCircle className="w-4 h-4 md:w-6 md:h-6" style={{ color: '#B9FF66' }} />
                                    </div>
                                </div>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-4 md:gap-6 pt-4 md:pt-6">
                                <div className="text-center">
                                    <p className="text-xs md:text-sm mb-1" style={{ color: '#6B7280' }}>Issue Date</p>
                                    <p className="text-sm md:text-base font-semibold" style={{ color: '#191A23' }}>{certificate.issueDate}</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs md:text-sm mb-1" style={{ color: '#6B7280' }}>Instructor</p>
                                    <p className="text-sm md:text-base font-semibold" style={{ color: '#191A23' }}>{certificate.instructor}</p>
                                </div>
                            </div>

                            {/* Credential ID */}
                            <div className="text-center pt-4 md:pt-6" style={{ borderTop: '1px solid #E5E7EB' }}>
                                <p className="text-xs md:text-sm mb-1" style={{ color: '#6B7280' }}>Credential ID</p>
                                <p className="text-xs md:text-base font-mono font-bold" style={{ color: '#191A23' }}>{certificate.credentialId}</p>
                            </div>

                            {/* Signature Section - Hidden on mobile */}
                            <div className="hidden md:flex justify-center gap-12 pt-8">
                                <div className="text-center">
                                    <div className="w-48 pt-2" style={{ borderTop: '2px solid #191A23' }}>
                                        <p className="font-semibold" style={{ color: '#191A23' }}>{certificate.instructor}</p>
                                        <p className="text-sm" style={{ color: '#4B5563' }}>Course Instructor</p>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="w-48 pt-2" style={{ borderTop: '2px solid #191A23' }}>
                                        <p className="font-semibold" style={{ color: '#191A23' }}>WStudy Platform</p>
                                        <p className="text-sm" style={{ color: '#4B5563' }}>Authorized By</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Certificate Footer - Decorative Border */}
                    <div className="h-4" style={{ background: 'linear-gradient(to right, #191A23, #B9FF66, #191A23)' }}></div>
                </div>

                {/* Action Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="flex flex-wrap justify-center gap-4 mt-6"
                >
                    <button 
                        onClick={handleDownload}
                        className="px-6 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center gap-2 shadow-lg"
                    >
                        <Download className="w-5 h-5" />
                        Download Certificate
                    </button>
                    <button 
                        onClick={() => {
                            // Copy certificate link to clipboard
                            const url = window.location.href;
                            navigator.clipboard.writeText(url).then(() => {
                                alert('Certificate link copied to clipboard!');
                            });
                        }}
                        className="px-6 py-3 bg-white text-[#191A23] rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2 shadow-lg"
                    >
                        <Share2 className="w-5 h-5" />
                        Share Certificate
                    </button>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default CertificateViewer;
