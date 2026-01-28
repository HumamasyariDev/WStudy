import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';

interface WarningModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    message: string;
    buttonText?: string;
    onConfirm?: () => void;
    confirmText?: string;
}

const WarningModal = ({ isOpen, onClose, title, message, buttonText = 'Got it', onConfirm, confirmText = 'Confirm' }: WarningModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] max-w-md"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden relative">
                            {/* Close button */}
                            <button
                                onClick={onClose}
                                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors z-10"
                            >
                                <X className="w-5 h-5 text-gray-400" />
                            </button>

                            {/* Content */}
                            <div className="p-8 text-center">
                                {/* Warning Icon */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.2, duration: 0.6 }}
                                    className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6"
                                >
                                    <AlertTriangle className="w-10 h-10 text-amber-500" />
                                </motion.div>

                                {/* Title */}
                                <motion.h2
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl font-bold text-[#191A23] mb-2"
                                >
                                    {title}
                                </motion.h2>

                                {/* Message */}
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-gray-600 mb-6"
                                >
                                    {message}
                                </motion.p>

                                {/* Buttons */}
                                {onConfirm ? (
                                    <div className="flex gap-3 justify-center">
                                        <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            onClick={onClose}
                                            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                                        >
                                            Batal
                                        </motion.button>
                                        <motion.button
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5 }}
                                            onClick={onConfirm}
                                            className="px-6 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors"
                                        >
                                            {confirmText}
                                        </motion.button>
                                    </div>
                                ) : (
                                    <motion.button
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        onClick={onClose}
                                        className="px-8 py-3 bg-amber-500 text-white rounded-xl font-semibold hover:bg-amber-600 transition-colors"
                                    >
                                        {buttonText}
                                    </motion.button>
                                )}
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 left-0 w-24 h-24 bg-amber-100/50 rounded-br-full" />
                            <div className="absolute bottom-0 right-0 w-32 h-32 bg-amber-100/50 rounded-tl-full" />
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default WarningModal;
