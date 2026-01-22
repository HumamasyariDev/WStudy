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
            <div className="space-y-4 overflow-x-hidden max-w-5xl mx-auto">
                {/* Header with Timer */}
                <div className="bg-white rounded-xl p-4 shadow-sm sticky top-0 z-10">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-lg md:text-xl font-bold text-[#191A23] font-geist">{quiz.title}</h1>
                            <p className="text-sm text-gray-600">{quiz.course}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {/* Timer */}
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
                                timeLeft < 300 ? 'bg-red-50 text-red-600' : 'bg-[#F3F3F3] text-[#191A23]'
                            }`}>
                                <Clock className="w-5 h-5" />
                                <span className="font-mono font-bold">{formatTime(timeLeft)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-4">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600">
                                Question {currentQuestion + 1} of {quiz.questions.length}
                            </span>
                            <span className="text-sm font-semibold text-[#191A23]">
                                {answeredCount}/{quiz.questions.length} answered
                            </span>
                        </div>
                        <div className="w-full h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                            <div 
                                className="h-full bg-[#B9FF66] transition-all duration-300"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                    </div>
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl p-6 md:p-8 shadow-sm"
                >
                    {/* Question Number Badge */}
                    <div className="inline-flex items-center gap-2 bg-[#F3F3F3] px-3 py-1 rounded-full mb-4">
                        <span className="text-sm font-semibold text-[#191A23]">
                            Question {currentQuestion + 1}
                        </span>
                    </div>

                    {/* Question Text */}
                    <h2 className="text-xl md:text-2xl font-bold text-[#191A23] mb-6">
                        {quiz.questions[currentQuestion].question}
                    </h2>

                    {/* Answer Options */}
                    <div className="space-y-3">
                        {quiz.questions[currentQuestion].options.map((option, idx) => {
                            const isSelected = answers[currentQuestion] === option;
                            const optionLabel = String.fromCharCode(65 + idx); // A, B, C, D

                            return (
                                <button
                                    key={idx}
                                    onClick={() => handleAnswerSelect(option)}
                                    className={`w-full p-4 rounded-xl border-2 transition-all text-left flex items-center gap-4 ${
                                        isSelected
                                            ? 'border-[#B9FF66] bg-[#B9FF66]/10'
                                            : 'border-gray-200 hover:border-[#191A23] hover:bg-[#F3F3F3]'
                                    }`}
                                >
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                        isSelected
                                            ? 'bg-[#B9FF66] text-[#191A23]'
                                            : 'bg-[#F3F3F3] text-gray-600'
                                    }`}>
                                        {optionLabel}
                                    </div>
                                    <span className={`flex-1 ${isSelected ? 'font-semibold text-[#191A23]' : 'text-gray-700'}`}>
                                        {option}
                                    </span>
                                    {isSelected && (
                                        <CheckCircle2 className="w-5 h-5 text-[#B9FF66]" />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Navigation */}
                <div className="bg-white rounded-xl p-4 shadow-sm sticky bottom-0">
                    <div className="flex items-center justify-between gap-4">
                        <button
                            onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                            disabled={currentQuestion === 0}
                            className="flex items-center gap-2 px-4 py-2 bg-[#F3F3F3] text-[#191A23] rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ChevronLeft className="w-5 h-5" />
                            <span className="hidden sm:inline">Previous</span>
                        </button>

                        <button
                            onClick={() => setShowSubmitConfirm(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-[#191A23] text-[#B9FF66] rounded-lg font-semibold hover:bg-[#2a2b3a] transition-colors"
                        >
                            <Flag className="w-5 h-5" />
                            Submit Quiz
                        </button>

                        <button
                            onClick={() => setCurrentQuestion(Math.min(quiz.questions.length - 1, currentQuestion + 1))}
                            disabled={currentQuestion === quiz.questions.length - 1}
                            className="flex items-center gap-2 px-4 py-2 bg-[#B9FF66] text-[#191A23] rounded-lg font-semibold hover:bg-[#a8ee55] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="hidden sm:inline">Next</span>
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Question Navigator */}
                <div className="bg-white rounded-xl p-4 md:p-6 shadow-sm">
                    <h3 className="font-bold text-[#191A23] mb-4">Question Navigator</h3>
                    <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                        {quiz.questions.map((_, idx) => {
                            const isAnswered = answers[idx] !== undefined;
                            const isCurrent = idx === currentQuestion;

                            return (
                                <button
                                    key={idx}
                                    onClick={() => setCurrentQuestion(idx)}
                                    className={`aspect-square rounded-lg font-semibold text-sm transition-all ${
                                        isCurrent
                                            ? 'bg-[#191A23] text-[#B9FF66] ring-2 ring-[#B9FF66]'
                                            : isAnswered
                                            ? 'bg-[#B9FF66] text-[#191A23]'
                                            : 'bg-[#F3F3F3] text-gray-600 hover:bg-gray-200'
                                    }`}
                                >
                                    {idx + 1}
                                </button>
                            );
                        })}
                    </div>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm">
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#B9FF66] rounded"></div>
                            <span className="text-gray-600">Answered</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#F3F3F3] rounded"></div>
                            <span className="text-gray-600">Not Answered</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#191A23] rounded"></div>
                            <span className="text-gray-600">Current</span>
                        </div>
                    </div>
                </div>

                {/* Submit Confirmation Modal */}
                {showSubmitConfirm && (
                    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white rounded-xl p-6 max-w-md w-full"
                        >
                            <div className="flex items-start gap-4 mb-4">
                                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                                    <AlertCircle className="w-6 h-6 text-yellow-600" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#191A23] mb-2">Submit Quiz?</h3>
                                    <p className="text-gray-600 mb-4">
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
                                    className="flex-1 px-4 py-2 bg-[#F3F3F3] text-[#191A23] rounded-lg font-semibold hover:bg-gray-200 transition-colors"
                                >
                                    Continue Quiz
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    className="flex-1 px-4 py-2 bg-[#191A23] text-[#B9FF66] rounded-lg font-semibold hover:bg-[#2a2b3a] transition-colors"
                                >
                                    Submit Now
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default QuizTaking;
