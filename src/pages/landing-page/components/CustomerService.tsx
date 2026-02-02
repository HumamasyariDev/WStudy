import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
    id: string;
    text: string;
    sender: 'user' | 'bot';
    timestamp: Date;
}

const CustomerService = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: '1',
            text: '👋 Hi there! Welcome to WStudy\n\nHow can we help you today?',
            sender: 'bot',
            timestamp: new Date()
        }
    ]);
    const [inputValue, setInputValue] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const getBotResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();
        
        if (lowerMessage.includes('halo') || lowerMessage.includes('hi') || lowerMessage.includes('hello')) {
            return 'Hello! 👋 Welcome to WStudy. How can I assist you today?';
        }
        if (lowerMessage.includes('course') || lowerMessage.includes('kursus')) {
            return 'We offer a wide variety of courses! 📚\n\nYou can browse our courses by clicking the "Courses" button above, or visit our Courses section on the website. We have courses in programming, design, business, and more!';
        }
        if (lowerMessage.includes('price') || lowerMessage.includes('harga') || lowerMessage.includes('pricing')) {
            return 'Our pricing is very competitive! 💰\n\nWe offer flexible plans:\n• Free Trial - Try before you buy\n• Monthly Plan - $29/month\n• Annual Plan - $290/year (Save 17%)\n\nClick "Pricing" above to see full details!';
        }
        if (lowerMessage.includes('help') || lowerMessage.includes('bantuan') || lowerMessage.includes('support')) {
            return 'I\'m here to help! 🤝\n\nYou can:\n• Ask me questions about our courses\n• Learn about pricing plans\n• Get contact information\n• Browse our FAQ section\n\nWhat would you like to know?';
        }
        if (lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('kontak')) {
            return 'You can reach us at:\n\n📧 Email: info@wstudy.com\n📱 Phone: 555-567-8901\n📍 Address: 1234 Main St, Jakarta, Indonesia\n\nWe typically respond within 24 hours!';
        }
        if (lowerMessage.includes('thank') || lowerMessage.includes('terima kasih')) {
            return 'You\'re welcome! 😊 Is there anything else I can help you with?';
        }
        
        return 'Thanks for your message! 😊\n\nI\'m a simple chatbot, but I can help you with:\n• Course information\n• Pricing details\n• Contact information\n• General support\n\nFeel free to ask me anything!';
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: 'user',
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInputValue('');
        setIsTyping(true);

        setTimeout(() => {
            const botResponse: Message = {
                id: (Date.now() + 1).toString(),
                text: getBotResponse(inputValue),
                sender: 'bot',
                timestamp: new Date()
            };
            setMessages(prev => [...prev, botResponse]);
            setIsTyping(false);
        }, 1000 + Math.random() * 1000);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleQuickAction = (action: string) => {
        setInputValue(action);
        setTimeout(() => handleSendMessage(), 100);
    };

    return (
        <>
            {/* Chat Widget */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="fixed bottom-24 right-4 sm:right-6 md:right-8 z-50 w-[calc(100vw-2rem)] sm:w-96 max-w-md"
                    >
                        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                            {/* Header */}
                            <div className="bg-gradient-to-r from-[#191A23] to-[#2a2b35] p-5 relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#B9FF66]/10 rounded-full blur-3xl" />
                                <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-[#B9FF66]/10 rounded-full blur-2xl" />
                                
                                <div className="relative flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="w-12 h-12 rounded-full bg-[#B9FF66] flex items-center justify-center shadow-lg">
                                                <svg className="w-6 h-6 text-[#191A23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                                                </svg>
                                            </div>
                                            <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full border-2 border-[#191A23]" />
                                        </div>
                                        <div>
                                            <h3 className="text-white font-bold text-base">Customer Support</h3>
                                            <p className="text-white/60 text-xs">We're online now</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setIsOpen(false)}
                                        className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                    >
                                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className="p-5 space-y-4 bg-gray-50 h-80 overflow-y-auto">
                                {messages.map((message, index) => (
                                    <motion.div
                                        key={message.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className={`flex gap-2 ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}
                                    >
                                        {message.sender === 'bot' && (
                                            <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B9FF66] flex items-center justify-center">
                                                <svg className="w-4 h-4 text-[#191A23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                                </svg>
                                            </div>
                                        )}
                                        <div className="flex-1 max-w-[80%]">
                                            <div className={`rounded-2xl p-4 shadow-sm ${
                                                message.sender === 'bot' 
                                                    ? 'bg-white rounded-tl-sm' 
                                                    : 'bg-[#B9FF66] rounded-tr-sm ml-auto'
                                            }`}>
                                                <p className={`text-sm leading-relaxed whitespace-pre-line ${
                                                    message.sender === 'bot' ? 'text-gray-800' : 'text-[#191A23] font-medium'
                                                }`}>
                                                    {message.text}
                                                </p>
                                            </div>
                                            <p className={`text-xs text-gray-400 mt-1 ${
                                                message.sender === 'user' ? 'text-right mr-1' : 'ml-1'
                                            }`}>
                                                {message.timestamp.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}

                                {/* Typing indicator */}
                                {isTyping && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex gap-2"
                                    >
                                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#B9FF66] flex items-center justify-center">
                                            <svg className="w-4 h-4 text-[#191A23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                                            </svg>
                                        </div>
                                        <div className="bg-white rounded-2xl rounded-tl-sm p-4 shadow-sm">
                                            <div className="flex gap-1">
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                                                />
                                                <motion.div
                                                    className="w-2 h-2 bg-gray-400 rounded-full"
                                                    animate={{ y: [0, -5, 0] }}
                                                    transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                                                />
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                <div ref={messagesEndRef} />

                                {/* Quick actions - only show if no user messages yet */}
                                {messages.length === 1 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="space-y-2"
                                    >
                                        <p className="text-xs text-gray-500 font-medium ml-1">Quick Actions:</p>
                                        <div className="grid grid-cols-2 gap-2">
                                            <button onClick={() => handleQuickAction('Tell me about your courses')} className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 text-left transition-colors group">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-6 h-6 rounded-lg bg-[#B9FF66]/10 flex items-center justify-center group-hover:bg-[#B9FF66]/20 transition-colors">
                                                    <svg className="w-3.5 h-3.5 text-[#191A23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700">Courses</span>
                                            </div>
                                            <p className="text-xs text-gray-500">Browse courses</p>
                                        </button>
                                        <button onClick={() => handleQuickAction('What are your pricing plans?')} className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 text-left transition-colors group">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-6 h-6 rounded-lg bg-[#B9FF66]/10 flex items-center justify-center group-hover:bg-[#B9FF66]/20 transition-colors">
                                                    <svg className="w-3.5 h-3.5 text-[#191A23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700">Pricing</span>
                                            </div>
                                            <p className="text-xs text-gray-500">View plans</p>
                                        </button>
                                        <button onClick={() => handleQuickAction('I need help with something')} className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 text-left transition-colors group">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-6 h-6 rounded-lg bg-[#B9FF66]/10 flex items-center justify-center group-hover:bg-[#B9FF66]/20 transition-colors">
                                                    <svg className="w-3.5 h-3.5 text-[#191A23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700">Help</span>
                                            </div>
                                            <p className="text-xs text-gray-500">Get support</p>
                                        </button>
                                        <button onClick={() => handleQuickAction('How can I contact you?')} className="bg-white hover:bg-gray-50 border border-gray-200 rounded-xl p-3 text-left transition-colors group">
                                            <div className="flex items-center gap-2 mb-1">
                                                <div className="w-6 h-6 rounded-lg bg-[#B9FF66]/10 flex items-center justify-center group-hover:bg-[#B9FF66]/20 transition-colors">
                                                    <svg className="w-3.5 h-3.5 text-[#191A23]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <span className="text-xs font-semibold text-gray-700">Contact</span>
                                            </div>
                                            <p className="text-xs text-gray-500">Email us</p>
                                        </button>
                                        </div>
                                    </motion.div>
                                )}
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-white border-t border-gray-100">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="Type your message..."
                                        className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#B9FF66] focus:bg-white transition-all"
                                    />
                                    <button 
                                        onClick={handleSendMessage}
                                        disabled={!inputValue.trim()}
                                        className="bg-[#B9FF66] hover:bg-[#a3eb5b] text-[#191A23] px-4 py-2.5 rounded-xl font-semibold text-sm transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                                        </svg>
                                        Send
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-4 sm:right-6 md:right-8 z-50 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-br from-[#B9FF66] to-[#a3eb5b] shadow-2xl flex items-center justify-center group hover:scale-110 transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
                {/* Pulse effect */}
                <motion.div
                    className="absolute inset-0 rounded-full bg-[#B9FF66]"
                    animate={{
                        scale: [1, 1.3, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
                
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.svg
                            key="close"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-6 sm:w-7 sm:h-7 text-[#191A23] relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                        </motion.svg>
                    ) : (
                        <motion.svg
                            key="chat"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-6 h-6 sm:w-7 sm:h-7 text-[#191A23] relative z-10"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </motion.svg>
                    )}
                </AnimatePresence>

                {/* Notification badge */}
                {!isOpen && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center"
                    >
                        <span className="text-white text-xs font-bold">1</span>
                    </motion.div>
                )}
            </motion.button>
        </>
    );
};

export default CustomerService;
