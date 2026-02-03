import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Clock, ChevronLeft, ChevronRight, Flag, AlertCircle, CheckCircle2 } from 'lucide-react';

const QuizTaking = () => {
    const navigate = useNavigate();
    const { quizId } = useParams();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<{ [key: number]: string }>({});
    const [timeLeft, setTimeLeft] = useState(2700); // 45 minutes in seconds
    const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);

    // Mock quiz data
    const quiz = {
        id: quizId,
        title: 'Cell Biology Quiz',
        course: 'Biology & Life Sciences',
        duration: 45,
        totalQuestions: 30,
        questions: [
            {
                id: 1,
                question: 'What is the powerhouse of the cell?',
                options: [
                    'Nucleus',
                    'Mitochondria',
                    'Ribosome',
                    'Endoplasmic Reticulum'
                ],
                correctAnswer: 'Mitochondria'
            },
            {
                id: 2,
                question: 'Which organelle is responsible for protein synthesis?',
                options: [
                    'Golgi Apparatus',
                    'Lysosome',
                    'Ribosome',
                    'Vacuole'
                ],
                correctAnswer: 'Ribosome'
            },
            {
                id: 3,
                question: 'What is the function of the cell membrane?',
                options: [
                    'Energy production',
                    'Protein synthesis',
                    'Regulates what enters and exits the cell',
                    'DNA storage'
                ],
                correctAnswer: 'Regulates what enters and exits the cell'
            },
            {
                id: 4,
                question: 'Which process do plants use to make food?',
                options: [
                    'Respiration',
                    'Photosynthesis',
                    'Fermentation',
                    'Digestion'
                ],
                correctAnswer: 'Photosynthesis'
            },
            {
                id: 5,
                question: 'What is DNA?',
                options: [
                    'A type of protein',
                    'A carbohydrate',
                    'Genetic material',
                    'A lipid'
                ],
                correctAnswer: 'Genetic material'
            },
        ]
    };

    // Timer countdown
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerSelect = (answer: string) => {
        setAnswers({ ...answers, [currentQuestion]: answer });
    };

    const handleSubmit = () => {
        // Navigate to results page or show results
        navigate('/student/quizzes');
    };

    const answeredCount = Object.keys(answers).length;
    const progress = (answeredCount / quiz.questions.length) * 100;

    return (
        <DashboardLayout>
            {/* Animated Background - Landing Page Style */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#B9FF66]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#191A23]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #191A23 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 py-6">
                {/* Header with Timer */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white/90 backdrop-blur-md rounded-[32px] p-6 md:p-8 shadow-xl border border-gray-200/50 mb-6"
                >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-[#191A23] font-geist mb-2">{quiz.title}</h1>
                            <p className="text-base text-gray-600 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-[#B9FF66] rounded-full"></span>
                                {quiz.course}
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Timer */}
                            <motion.div 
                                animate={timeLeft < 300 ? { scale: [1, 1.02, 1] } : {}}
                                transition={{ duration: 1, repeat: timeLeft < 300 ? Infinity : 0 }}
                                className={`relative flex items-center gap-3 px-6 py-3.5 rounded-[16px] transition-all ${
                                    timeLeft < 300 
                                        ? 'bg-red-50 border-2 border-red-500' 
                                        : 'bg-gray-50 border-2 border-gray-200'
                                }`}
                            >
                                {/* Icon with background */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                    timeLeft < 300 ? 'bg-red-500' : 'bg-[#B9FF66]'
                                }`}>
                                    <Clock className={`w-5 h-5 ${timeLeft < 300 ? 'text-white' : 'text-[#191A23]'}`} />
                                </div>
                                
                                {/* Timer info */}
                                <div className="flex flex-col">
                                    <span className={`text-xs font-medium ${timeLeft < 300 ? 'text-red-600' : 'text-gray-600'}`}>
                                        Time Left
                                    </span>
                                    <span className={`font-mono font-bold text-xl leading-tight ${
                                        timeLeft < 300 ? 'text-red-600' : 'text-[#191A23]'
                                    }`}>
                                        {formatTime(timeLeft)}
                                    </span>
                                </div>

                                {/* Warning indicator for low time */}
                                {timeLeft < 300 && (
                                    <motion.div
                                        animate={{ opacity: [0.5, 1, 0.5] }}
                                        transition={{ duration: 1.5, repeat: Infinity }}
                                        className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"
                                    />
                                )}
                            </motion.div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-8">
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-sm font-medium text-gray-600">
                                Question {currentQuestion + 1} of {quiz.questions.length}
                            </span>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-[#B9FF66] rounded-full animate-pulse"></div>
                                <span className="text-sm font-bold text-[#191A23]">
                                    {answeredCount}/{quiz.questions.length} answered
                                </span>
                            </div>
                        </div>
                        <div className="w-full h-2.5 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
                            <motion.div 
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                                className="h-full bg-gradient-to-r from-[#B9FF66] to-[#a3eb5b] rounded-full relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer"></div>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Main Content - Side by Side Layout */}
                <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                    {/* Question Card */}
                    <motion.div
                        key={currentQuestion}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white/90 backdrop-blur-md rounded-[32px] p-8 md:p-12 shadow-xl border border-gray-200/50"
                    >
                        {/* Question Number Badge */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1, duration: 0.3 }}
                            className="inline-flex items-center gap-2 bg-[#B9FF66] px-5 py-2.5 rounded-[14px] mb-8 shadow-md shadow-[#B9FF66]/20"
                        >
                            <span className="text-sm font-bold text-[#191A23]">
                                Question {currentQuestion + 1}
                            </span>
                        </motion.div>

                        {/* Question Text */}
                        <motion.h2 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2, duration: 0.3 }}
                            className="text-2xl md:text-3xl font-bold text-[#191A23] mb-10 leading-tight font-geist"
                        >
                            {quiz.questions[currentQuestion].question}
                        </motion.h2>

                        {/* Answer Options */}
                        <div className="space-y-3">
                        {quiz.questions[currentQuestion].options.map((option, idx) => {
                            const isSelected = answers[currentQuestion] === option;
                            const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D

                            return (
                                <motion.button
                                    key={idx}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 + idx * 0.08, duration: 0.3 }}
                                    onClick={() => handleAnswerSelect(option)}
                                    className={`w-full p-5 rounded-[20px] border-2 transition-colors duration-200 text-left flex items-center gap-4 ${
                                        isSelected
                                            ? 'border-[#B9FF66] bg-[#B9FF66]/10 shadow-lg shadow-[#B9FF66]/10'
                                            : 'border-gray-200 hover:border-[#B9FF66]/50 hover:bg-gray-50 hover:shadow-md'
                                    }`}
                                >
                                    <div className={`w-11 h-11 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition-colors ${
                                        isSelected
                                            ? 'bg-[#B9FF66] text-[#191A23] shadow-md'
                                            : 'bg-gray-100 text-gray-600'
                                    }`}>
                                        {optionLabel}
                                    </div>
                                    <span className={`flex-1 text-base transition-all ${isSelected ? 'font-semibold text-[#191A23]' : 'text-gray-700'}`}>
                                        {option}
                                    </span>
                                    {isSelected && (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.8 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <CheckCircle2 className="w-6 h-6 text-[#B9FF66]" />
                                        </motion.div>
                                    )}
                                </motion.button>
                            );
                        })}
                        </div>

                        {/* Navigation Buttons */}
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.3 }}
                            className="flex items-center justify-between gap-4 mt-10 pt-8 border-t border-gray-200"
                        >
                            <button
                                onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                                disabled={currentQuestion === 0}
                                className="flex items-center gap-2 px-6 py-3.5 bg-gray-100 text-[#191A23] rounded-[14px] font-semibold hover:bg-gray-200 hover:shadow-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft className="w-5 h-5" />
                                <span className="hidden sm:inline">Previous</span>
                            </button>

                            <button
                                onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                                disabled={currentQuestion === quiz.questions.length - 1 || !answers[currentQuestion]}
                                className="flex items-center gap-2 px-6 py-3.5 bg-[#B9FF66] text-[#191A23] rounded-[14px] font-bold hover:bg-[#a8ee55] hover:shadow-lg hover:shadow-[#B9FF66]/30 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                            >
                                <span className="hidden sm:inline">Next</span>
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    </motion.div>

                    {/* Sidebar - Question Navigator */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="bg-white/90 backdrop-blur-md rounded-[32px] p-6 shadow-xl border border-gray-200/50 h-fit sticky top-24"
                    >
                        <div className="flex items-center gap-2 mb-5">
                            <div className="w-1 h-6 bg-[#B9FF66] rounded-full"></div>
                            <h3 className="font-bold text-lg text-[#191A23] font-geist">Questions</h3>
                        </div>
                        <div className="grid grid-cols-5 gap-2 mb-6">
                            {quiz.questions.map((_, idx) => {
                                const isAnswered = answers[idx] !== undefined;
                                const isCurrent = idx === currentQuestion;
                                
                                // Check if all previous questions are answered (sequential requirement)
                                const canAccess = idx === 0 || Object.keys(answers).filter(key => parseInt(key) < idx).length === idx;
                                const isDisabled = !canAccess && !isCurrent;

                                return (
                                    <motion.button
                                        key={idx}
                                        onClick={() => canAccess ? setCurrentQuestion(idx) : null}
                                        whileHover={canAccess ? { scale: 1.1, y: -2 } : {}}
                                        whileTap={canAccess ? { scale: 0.95 } : {}}
                                        disabled={isDisabled}
                                        className={`aspect-square rounded-[12px] font-bold text-sm transition-all ${
                                            isCurrent
                                                ? 'bg-[#191A23] text-[#B9FF66] ring-2 ring-[#B9FF66] shadow-lg'
                                                : isAnswered
                                                ? 'bg-[#B9FF66] text-[#191A23] shadow-md cursor-pointer'
                                                : isDisabled
                                                ? 'bg-gray-200 text-gray-400 cursor-not-allowed opacity-50'
                                                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:shadow-md cursor-pointer'
                                        }`}
                                    >
                                        {idx + 1}
                                    </motion.button>
                                );
                            })}
                        </div>
                        
                        {/* Legend */}
                        <div className="space-y-2 text-sm mb-6 pb-6 border-b border-gray-200">
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-[#B9FF66] rounded-[8px]"></div>
                                <span className="text-gray-600">Answered</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-gray-100 rounded-[8px]"></div>
                                <span className="text-gray-600">Available</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-gray-200 rounded-[8px] opacity-50"></div>
                                <span className="text-gray-600">Locked</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-5 h-5 bg-[#191A23] rounded-[8px]"></div>
                                <span className="text-gray-600">Current</span>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            onClick={() => setShowSubmitConfirm(true)}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-[#191A23] text-[#B9FF66] rounded-[14px] font-bold hover:bg-[#2a2b3a] hover:shadow-xl hover:shadow-[#191A23]/30 transition-all"
                        >
                            <Flag className="w-5 h-5" />
                            Submit Quiz
                        </motion.button>
                    </motion.div>
                </div>

            </div>

            {/* Submit Confirmation Modal */}
            {showSubmitConfirm && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[32px] p-8 max-w-md w-full shadow-2xl"
                    >
                        <div className="flex items-start gap-4 mb-6">
                            <div className="w-14 h-14 bg-yellow-100 rounded-[20px] flex items-center justify-center flex-shrink-0">
                                <AlertCircle className="w-7 h-7 text-yellow-600" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-[#191A23] mb-2 font-geist">Submit Quiz?</h3>
                                <p className="text-gray-600 text-base">
                                    You have answered {answeredCount} out of {quiz.questions.length} questions.
                                    {answeredCount < quiz.questions.length && (
                                        <span className="block mt-2 text-yellow-600 font-semibold">
                                            {quiz.questions.length - answeredCount} questions are still unanswered.
                                        </span>
                                    )}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowSubmitConfirm(false)}
                                className="flex-1 px-6 py-3 bg-[#F3F3F3] text-[#191A23] rounded-[14px] font-semibold hover:bg-gray-200 transition-colors"
                            >
                                Continue Quiz
                            </button>
                            <button
                                onClick={handleSubmit}
                                className="flex-1 px-6 py-3 bg-[#191A23] text-[#B9FF66] rounded-[14px] font-bold hover:bg-[#2a2b3a] transition-colors"
                            >
                                Submit Now
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </DashboardLayout>
    );
};

export default QuizTaking;
