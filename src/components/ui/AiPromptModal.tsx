import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PenTool, X, ArrowRight } from 'lucide-react';

interface AiPromptModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUseAI: () => void;
    onCreateManually: () => void;
    title: string;
    description: string;
}

const AiPromptModal = ({ isOpen, onClose, onUseAI, onCreateManually, title, description }: AiPromptModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop with blur */}
                    <motion.div
                        initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        animate={{ opacity: 1, backdropFilter: 'blur(8px)' }}
                        exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/40 z-50"
                        style={{ backdropFilter: 'blur(8px)' }}
                    />

                    {/* Modal */}
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                            animate={{ opacity: 1, scale: 1, rotateX: 0 }}
                            exit={{ opacity: 0, scale: 0.95, rotateX: 10 }}
                            transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                            className="relative max-w-lg w-full"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Glass card */}
                            <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute top-5 right-5 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors"
                                >
                                    <X className="w-4 h-4 text-gray-600" />
                                </button>

                                {/* Content */}
                                <div className="p-8">
                                    {/* Title Section */}
                                    <div className="text-center mb-8">
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                                            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#B9FF66] mb-4"
                                        >
                                            <Sparkles className="w-8 h-8 text-[#191A23]" strokeWidth={2.5} />
                                        </motion.div>
                                        <h2 className="text-2xl font-bold text-[#191A23] mb-2">{title}</h2>
                                        <p className="text-[#191A23]/60 text-sm">{description}</p>
                                    </div>

                                    {/* Options */}
                                    <div className="space-y-3">
                                        {/* AI Option */}
                                        <motion.button
                                            onClick={onUseAI}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full group"
                                        >
                                            <div className="bg-[#191A23] rounded-2xl p-5 border-2 border-[#B9FF66]">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-[#B9FF66] flex items-center justify-center flex-shrink-0">
                                                            <Sparkles className="w-6 h-6 text-[#191A23]" strokeWidth={2.5} />
                                                        </div>
                                                        <div className="text-left">
                                                            <div className="text-white font-bold text-lg mb-0.5">AI Generator</div>
                                                            <div className="text-white/60 text-xs">Instant creation with AI</div>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-[#B9FF66] group-hover:translate-x-1 transition-transform" />
                                                </div>
                                            </div>
                                        </motion.button>

                                        {/* Manual Option */}
                                        <motion.button
                                            onClick={onCreateManually}
                                            whileHover={{ scale: 1.02, y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full group"
                                        >
                                            <div className="bg-white rounded-2xl p-5 border-2 border-[#191A23]/20 hover:border-[#191A23]/40 transition-colors">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 rounded-xl bg-[#191A23] flex items-center justify-center flex-shrink-0">
                                                            <PenTool className="w-6 h-6 text-[#B9FF66]" strokeWidth={2.5} />
                                                        </div>
                                                        <div className="text-left">
                                                            <div className="text-[#191A23] font-bold text-lg mb-0.5">Manual Mode</div>
                                                            <div className="text-[#191A23]/60 text-xs">Create from scratch</div>
                                                        </div>
                                                    </div>
                                                    <ArrowRight className="w-5 h-5 text-[#191A23]/40 group-hover:translate-x-1 group-hover:text-[#191A23] transition-all" />
                                                </div>
                                            </div>
                                        </motion.button>
                                    </div>

                                    {/* Footer */}
                                    <div className="mt-6 text-center">
                                        <p className="text-xs text-[#191A23]/40">Choose your preferred creation method</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
};

export default AiPromptModal;
