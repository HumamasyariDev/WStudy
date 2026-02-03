import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, CheckCircle } from 'lucide-react';

interface ForgotPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const ForgotPasswordModal = ({ isOpen, onClose }: ForgotPasswordModalProps) => {
    const [email, setEmail] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            setIsSubmitted(true);
        }, 1500);
    };

    const handleClose = () => {
        setEmail('');
        setIsSubmitted(false);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-2xl border-2 border-[#191A23] shadow-[0_8px_0_#191A23] w-full max-w-md relative"
                        >
                            {/* Close button */}
                            <button
                                onClick={handleClose}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-gray-600" />
                            </button>

                            <div className="p-8">
                                {!isSubmitted ? (
                                    <>
                                        {/* Header */}
                                        <div className="mb-6">
                                            <h2 className="text-2xl font-bold text-[#191A23] mb-2">
                                                Forgot Password?
                                            </h2>
                                            <p className="text-gray-600 text-sm">
                                                Enter your email address and we'll send you a link to reset your password.
                                            </p>
                                        </div>

                                        {/* Form */}
                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div>
                                                <label className="block text-sm font-semibold text-[#191A23] mb-2">
                                                    Email Address
                                                </label>
                                                <div className="relative">
                                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                                    <input
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        placeholder="your.email@example.com"
                                                        className="w-full pl-12 pr-4 py-3.5 border-2 border-[#191A23] rounded-xl bg-white text-[#191A23] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] transition-all"
                                                        required
                                                        disabled={isLoading}
                                                    />
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                disabled={isLoading}
                                                className="w-full py-3.5 bg-[#191A23] text-[#B9FF66] rounded-xl font-bold hover:bg-[#2a2b3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isLoading ? 'Sending...' : 'Send Reset Link'}
                                            </button>
                                        </form>
                                    </>
                                ) : (
                                    <>
                                        {/* Success state */}
                                        <div className="text-center py-4">
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                transition={{ type: 'spring', stiffness: 200 }}
                                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#B9FF66] mb-4"
                                            >
                                                <CheckCircle className="w-8 h-8 text-[#191A23]" />
                                            </motion.div>
                                            <h3 className="text-xl font-bold text-[#191A23] mb-2">
                                                Check Your Email
                                            </h3>
                                            <p className="text-gray-600 text-sm mb-6">
                                                We've sent a password reset link to <strong>{email}</strong>
                                            </p>
                                            <button
                                                onClick={handleClose}
                                                className="w-full py-3.5 bg-[#191A23] text-[#B9FF66] rounded-xl font-bold hover:bg-[#2a2b3a] transition-colors"
                                            >
                                                Got it
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default ForgotPasswordModal;
