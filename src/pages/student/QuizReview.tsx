import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ArrowLeft, CheckCircle, XCircle, Award, Clock, Target, TrendingUp, ChevronDown, ChevronUp } from 'lucide-react';

const QuizReview = () => {
    const navigate = useNavigate();
    const { quizId } = useParams();
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);

    // Mock quiz result data
    const quizResult = {
        id: quizId,
        title: 'Cell Biology Quiz',
        course: 'Biology & Life Sciences',
        completedDate: 'Jan 12, 2026',
        score: 88,
        totalQuestions: 5,
        correctAnswers: 4,
        timeSpent: '38 min',
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
                userAnswer: 'Mitochondria',
                correctAnswer: 'Mitochondria',
                isCorrect: true,
                explanation: 'Mitochondria are known as the powerhouse of the cell because they generate most of the cell\'s supply of ATP (adenosine triphosphate), which is used as a source of chemical energy.'
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
                userAnswer: 'Ribosome',
                correctAnswer: 'Ribosome',
                isCorrect: true,
                explanation: 'Ribosomes are the cellular structures responsible for protein synthesis. They translate messenger RNA (mRNA) into proteins.'
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
                userAnswer: 'Energy production',
                correctAnswer: 'Regulates what enters and exits the cell',
                isCorrect: false,
                explanation: 'The cell membrane acts as a selective barrier, controlling what substances can enter and exit the cell. This is crucial for maintaining the cell\'s internal environment.'
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
                userAnswer: 'Photosynthesis',
                correctAnswer: 'Photosynthesis',
                isCorrect: true,
                explanation: 'Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar (glucose).'
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
                userAnswer: 'Genetic material',
                correctAnswer: 'Genetic material',
                isCorrect: true,
                explanation: 'DNA (Deoxyribonucleic Acid) is the hereditary material in humans and almost all other organisms. It contains the instructions needed for an organism to develop, survive, and reproduce.'
            },
        ]
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 75) return 'text-blue-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const getScoreBgColor = () => {
        return 'from-[#191A23] to-[#2a2b3a]';
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/student/quizzes')}
                        className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#191A23]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl md:text-2xl font-bold text-[#191A23] font-geist">Quiz Review</h1>
                        <p className="text-sm text-gray-600">{quizResult.title}</p>
                    </div>
                </div>

                {/* Score Summary Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className={`relative bg-gradient-to-r ${getScoreBgColor()} rounded-2xl p-8 overflow-hidden`}
                >
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9FF66] rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B9FF66] rounded-full opacity-10 blur-3xl"></div>
                    
                    <div className="relative z-10 text-center">
                        <Award className="w-16 h-16 text-[#B9FF66] mx-auto mb-4" />
                        <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">{quizResult.score}%</h2>
                        <p className="text-gray-300 text-lg mb-6">
                            {quizResult.score >= 90 ? 'Excellent Work!' : quizResult.score >= 75 ? 'Great Job!' : quizResult.score >= 60 ? 'Good Effort!' : 'Keep Practicing!'}
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                                <p className="text-2xl font-bold text-[#B9FF66]">{quizResult.correctAnswers}/{quizResult.totalQuestions}</p>
                                <p className="text-sm text-gray-300">Correct Answers</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                                <p className="text-2xl font-bold text-white">{quizResult.timeSpent}</p>
                                <p className="text-sm text-gray-300">Time Spent</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                                <p className="text-2xl font-bold text-white">{quizResult.completedDate}</p>
                                <p className="text-sm text-gray-300">Completed</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Questions', value: quizResult.totalQuestions, icon: Target },
                        { label: 'Correct', value: quizResult.correctAnswers, icon: CheckCircle },
                        { label: 'Incorrect', value: quizResult.totalQuestions - quizResult.correctAnswers, icon: XCircle },
                        { label: 'Accuracy', value: `${quizResult.score}%`, icon: TrendingUp },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
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

                {/* Question Review */}
                <div className="space-y-4">
                    <h2 className="text-xl font-bold text-[#191A23] font-geist">Answer Review</h2>
                    
                    {quizResult.questions.map((q, idx) => (
                        <motion.div
                            key={q.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                            className="bg-white rounded-xl overflow-hidden shadow-sm"
                        >
                            {/* Question Header */}
                            <button
                                onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                                className="w-full p-6 flex items-start gap-4 hover:bg-[#F3F3F3] transition-colors"
                            >
                                {/* Status Icon */}
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                                    q.isCorrect ? 'bg-green-100' : 'bg-red-100'
                                }`}>
                                    {q.isCorrect ? (
                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                    ) : (
                                        <XCircle className="w-6 h-6 text-red-600" />
                                    )}
                                </div>

                                {/* Question Info */}
                                <div className="flex-1 text-left">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-sm font-semibold text-gray-500">Question {idx + 1}</span>
                                        <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                                            q.isCorrect ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                            {q.isCorrect ? 'Correct' : 'Incorrect'}
                                        </span>
                                    </div>
                                    <p className="font-semibold text-[#191A23]">{q.question}</p>
                                </div>

                                {/* Expand Icon */}
                                {expandedQuestion === idx ? (
                                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                )}
                            </button>

                            {/* Expanded Content */}
                            {expandedQuestion === idx && (
                                <div className="px-6 pb-6 space-y-4 border-t border-gray-100">
                                    {/* Options */}
                                    <div className="space-y-2 mt-4">
                                        {q.options.map((option, optionIdx) => {
                                            const isUserAnswer = option === q.userAnswer;
                                            const isCorrectAnswer = option === q.correctAnswer;
                                            const optionLabel = String.fromCharCode(65 + optionIdx);

                                            return (
                                                <div
                                                    key={optionIdx}
                                                    className={`p-4 rounded-xl border-2 flex items-center gap-4 ${
                                                        isCorrectAnswer
                                                            ? 'border-green-500 bg-green-50'
                                                            : isUserAnswer && !q.isCorrect
                                                            ? 'border-red-500 bg-red-50'
                                                            : 'border-gray-200 bg-white'
                                                    }`}
                                                >
                                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${
                                                        isCorrectAnswer
                                                            ? 'bg-green-500 text-white'
                                                            : isUserAnswer && !q.isCorrect
                                                            ? 'bg-red-500 text-white'
                                                            : 'bg-[#F3F3F3] text-gray-600'
                                                    }`}>
                                                        {optionLabel}
                                                    </div>
                                                    <span className="flex-1 font-medium">{option}</span>
                                                    {isCorrectAnswer && (
                                                        <div className="flex items-center gap-1 text-green-600 text-sm font-semibold">
                                                            <CheckCircle size={16} />
                                                            Correct
                                                        </div>
                                                    )}
                                                    {isUserAnswer && !q.isCorrect && (
                                                        <div className="flex items-center gap-1 text-red-600 text-sm font-semibold">
                                                            <XCircle size={16} />
                                                            Your Answer
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>

                                    {/* Explanation */}
                                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
                                        <p className="text-sm font-semibold text-blue-900 mb-1">Explanation</p>
                                        <p className="text-sm text-blue-800">{q.explanation}</p>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pb-6">
                    <button
                        onClick={() => navigate('/student/quizzes')}
                        className="flex-1 px-6 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl font-semibold hover:bg-gray-200 transition-colors"
                    >
                        Back to Quizzes
                    </button>
                    <button
                        onClick={() => navigate(`/student/quiz/${quizId}`)}
                        className="flex-1 px-6 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-semibold hover:bg-[#2a2b3a] transition-colors"
                    >
                        Retake Quiz
                    </button>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default QuizReview;
