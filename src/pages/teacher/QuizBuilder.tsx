import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SuccessModal from '../../components/ui/SuccessModal';
import WarningModal from '../../components/ui/WarningModal';
import AiPromptModal from '../../components/ui/AiPromptModal';
import { ArrowLeft, Plus, Trash2, Save, ChevronDown, ChevronUp, BookOpen, Wand2, Loader2 } from 'lucide-react';
import { generateQuizWithAI } from '../../services/quizAiService';

const QuizBuilder = () => {
    const navigate = useNavigate();
    const [quizTitle, setQuizTitle] = useState('');
    const [course, setCourse] = useState('');
    const [duration, setDuration] = useState('');
    const [passingScore, setPassingScore] = useState(70);
    const [expandedQuestion, setExpandedQuestion] = useState<number | null>(0);
    const [questions, setQuestions] = useState([
        {
            id: 1,
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            points: 10
        }
    ]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAiSection, setShowAiSection] = useState(false);
    const [showAiPromptModal, setShowAiPromptModal] = useState(false);
    const [showAiPage, setShowAiPage] = useState(false);

    useEffect(() => {
        // Show AI prompt modal on page load
        setShowAiPromptModal(true);
    }, []);

    const addQuestion = () => {
        setQuestions([...questions, {
            id: questions.length + 1,
            question: '',
            options: ['', '', '', ''],
            correctAnswer: 0,
            points: 10
        }]);
    };

    const removeQuestion = (id: number) => {
        setQuestions(questions.filter(q => q.id !== id));
    };

    const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

    const generateQuizAI = async () => {
        if (!aiPrompt.trim()) {
            setWarningMessage('Please enter a quiz topic for AI to generate.');
            setShowWarningModal(true);
            return;
        }

        setIsGenerating(true);

        try {
            const result = await generateQuizWithAI(aiPrompt);
            
            setQuizTitle(result.title);
            setCourse(result.course);
            setDuration(result.duration.toString());
            setPassingScore(result.passingScore);
            setQuestions(result.questions);
            
            setIsGenerating(false);
            setShowAiPage(false);
            setShowAiSection(false);
        } catch (error) {
            setIsGenerating(false);
            setWarningMessage(error instanceof Error ? error.message : 'Failed to generate quiz. Please try again.');
            setShowWarningModal(true);
        }
    };

    return (
        <DashboardLayout>
            {/* AI Prompt Modal */}
            <AiPromptModal
                isOpen={showAiPromptModal}
                onClose={() => setShowAiPromptModal(false)}
                onUseAI={() => {
                    setShowAiPromptModal(false);
                    setShowAiPage(true);
                }}
                onCreateManually={() => {
                    setShowAiPromptModal(false);
                    setShowAiPage(false);
                }}
                title="Create Quiz with AI"
                description="Let AI generate quiz questions and answers automatically"
            />

            {/* AI Generation Page */}
            {showAiPage ? (
                <div className="min-h-screen bg-white p-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <button
                                onClick={() => setShowAiPage(false)}
                                className="flex items-center gap-2 text-gray-600 hover:text-[#191A23] mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back</span>
                            </button>
                            <h1 className="text-3xl font-bold text-[#191A23] mb-2">Quick Quiz Builder</h1>
                            <p className="text-gray-600">Tell us about your quiz and we'll create the questions for you</p>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <div className="space-y-6">
                                {/* Prompt Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#191A23] mb-2">
                                        Quiz Description
                                    </label>
                                    <textarea
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        placeholder="Example: Create a quiz about JavaScript fundamentals covering variables, functions, arrays, objects, and ES6 features. Include 10 multiple-choice questions with varying difficulty levels..."
                                        rows={6}
                                        disabled={isGenerating}
                                        className="w-full px-4 py-3 bg-white text-[#191A23] rounded-lg border border-gray-300 focus:border-[#191A23] focus:ring-2 focus:ring-[#191A23]/10 outline-none transition-all resize-none placeholder:text-gray-400 disabled:opacity-50 text-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Include topic, difficulty level, and number of questions for best results</p>
                                </div>

                                {/* Action Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={generateQuizAI}
                                        disabled={isGenerating || !aiPrompt.trim()}
                                        className="px-6 py-3 bg-[#191A23] text-white rounded-lg font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Creating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Create Quiz Questions</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Loading State */}
                                {isGenerating && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="w-5 h-5 text-[#191A23] animate-spin" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#191A23]">Creating quiz questions...</p>
                                                <p className="text-xs text-gray-600">This may take a few moments</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
            <div className="space-y-6 overflow-x-hidden max-w-5xl mx-auto">
                {/* AI Generation Section */}
                {showAiSection && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-[#B9FF66] via-[#a8ee55] to-[#B9FF66] rounded-2xl p-8 shadow-xl relative overflow-hidden"
                    >
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#191A23] rounded-full blur-3xl animate-pulse"></div>
                        </div>
                        
                        <div className="relative z-10 space-y-4">
                            <div className="flex items-center gap-3">
                                <BookOpen className="w-8 h-8 text-[#191A23]" />
                                <div>
                                    <h2 className="text-2xl font-bold text-[#191A23]">AI Quiz Generator</h2>
                                    <p className="text-sm text-[#191A23]/80">Generate complete quiz with questions automatically</p>
                                </div>
                            </div>
                            
                            <div>
                                <label className="block text-sm font-semibold text-[#191A23] mb-2">Quiz Topic</label>
                                <textarea
                                    value={aiPrompt}
                                    onChange={(e) => setAiPrompt(e.target.value)}
                                    placeholder="e.g., Advanced calculus covering derivatives, integrals, and limits"
                                    rows={3}
                                    disabled={isGenerating}
                                    className="w-full px-4 py-3 bg-white text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] outline-none transition-all resize-none placeholder:text-gray-400 disabled:opacity-50"
                                />
                            </div>
                            
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={generateQuizAI}
                                    disabled={isGenerating}
                                    className="px-8 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-bold hover:bg-[#2a2b3a] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                >
                                    {isGenerating ? (
                                        <>
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                            Generating...
                                        </>
                                    ) : (
                                        <>
                                            <Wand2 className="w-5 h-5" />
                                            Generate with AI
                                        </>
                                    )}
                                </button>
                                <button
                                    onClick={() => setShowAiSection(false)}
                                    disabled={isGenerating}
                                    className="px-6 py-3 bg-white text-[#191A23] rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                                >
                                    Create Manually
                                </button>
                            </div>
                            
                            {isGenerating && (
                                <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                                    <div className="flex items-center gap-3">
                                        <Loader2 className="w-5 h-5 text-[#191A23] animate-spin" />
                                        <div>
                                            <p className="text-sm font-semibold text-[#191A23]">AI is working its magic...</p>
                                            <p className="text-xs text-[#191A23]/70">Generating quiz questions and answers</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#191A23]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#191A23] font-geist">Quiz Builder</h1>
                        <p className="text-sm text-gray-600">Create engaging quizzes for your students</p>
                    </div>
                    <button
                        onClick={() => {
                            if (!quizTitle || !course || !duration) {
                                setWarningMessage('Please fill in all required fields (title, course, and duration).');
                                setShowWarningModal(true);
                                return;
                            }
                            if (questions.some(q => !q.question || q.options.some(opt => !opt))) {
                                setWarningMessage('Please complete all questions and fill in all answer options.');
                                setShowWarningModal(true);
                                return;
                            }
                            setShowSuccessModal(true);
                        }}
                        className="px-6 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Save Quiz
                    </button>
                </div>

                {/* Quiz Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-xl font-bold text-[#191A23] font-geist mb-4">Quiz Settings</h2>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Quiz Title</label>
                            <input
                                type="text"
                                value={quizTitle}
                                onChange={(e) => setQuizTitle(e.target.value)}
                                placeholder="e.g., Calculus Midterm Exam"
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Course</label>
                            <select
                                value={course}
                                onChange={(e) => setCourse(e.target.value)}
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                            >
                                <option value="">Select course</option>
                                <option value="calculus">Advanced Calculus</option>
                                <option value="biology">Biology & Life Sciences</option>
                                <option value="webdev">Web Development</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Duration (minutes)</label>
                            <input
                                type="number"
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                placeholder="45"
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Passing Score (%)</label>
                            <input
                                type="number"
                                value={passingScore}
                                onChange={(e) => setPassingScore(Number(e.target.value))}
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Questions */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h2 className="text-xl font-bold text-[#191A23] font-geist">Questions</h2>
                            <p className="text-sm text-gray-600">Total Points: <span className="font-bold text-[#191A23]">{totalPoints}</span></p>
                        </div>
                        <button
                            onClick={addQuestion}
                            className="px-4 py-2 bg-[#B9FF66] text-[#191A23] rounded-lg font-semibold hover:bg-[#a8ee55] transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Question
                        </button>
                    </div>

                    <div className="space-y-4">
                        {questions.map((q, idx) => (
                            <motion.div
                                key={q.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="bg-white rounded-xl shadow-sm overflow-hidden"
                            >
                                {/* Question Header */}
                                <button
                                    onClick={() => setExpandedQuestion(expandedQuestion === idx ? null : idx)}
                                    className="w-full p-4 flex items-center justify-between hover:bg-[#F3F3F3] transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 bg-[#191A23] text-[#B9FF66] rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                            {idx + 1}
                                        </div>
                                        <span className="font-semibold text-[#191A23]">
                                            {q.question || `Question ${idx + 1}`}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-sm text-gray-600">{q.points} pts</span>
                                        {expandedQuestion === idx ? (
                                            <ChevronUp className="w-5 h-5 text-gray-400" />
                                        ) : (
                                            <ChevronDown className="w-5 h-5 text-gray-400" />
                                        )}
                                    </div>
                                </button>

                                {/* Question Content */}
                                {expandedQuestion === idx && (
                                    <div className="p-6 border-t border-gray-100 space-y-4">
                                        <div className="grid md:grid-cols-3 gap-4">
                                            <div className="md:col-span-2">
                                                <label className="block text-sm font-semibold text-[#191A23] mb-2">Question</label>
                                                <textarea
                                                    value={q.question}
                                                    onChange={(e) => {
                                                        const newQuestions = [...questions];
                                                        newQuestions[idx].question = e.target.value;
                                                        setQuestions(newQuestions);
                                                    }}
                                                    placeholder="Enter your question here..."
                                                    rows={3}
                                                    className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all resize-none placeholder:text-gray-400"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm font-semibold text-[#191A23] mb-2">Points</label>
                                                <input
                                                    type="number"
                                                    value={q.points}
                                                    onChange={(e) => {
                                                        const newQuestions = [...questions];
                                                        newQuestions[idx].points = Number(e.target.value);
                                                        setQuestions(newQuestions);
                                                    }}
                                                    className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                                                />
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Answer Options</label>
                                            <div className="space-y-2">
                                                {q.options.map((option, optIdx) => (
                                                    <div key={optIdx} className="flex items-center gap-3">
                                                        <input
                                                            type="radio"
                                                            name={`question-${q.id}`}
                                                            checked={q.correctAnswer === optIdx}
                                                            onChange={() => {
                                                                const newQuestions = [...questions];
                                                                newQuestions[idx].correctAnswer = optIdx;
                                                                setQuestions(newQuestions);
                                                            }}
                                                            className="w-5 h-5 accent-[#B9FF66]"
                                                        />
                                                        <input
                                                            type="text"
                                                            value={option}
                                                            onChange={(e) => {
                                                                const newQuestions = [...questions];
                                                                newQuestions[idx].options[optIdx] = e.target.value;
                                                                setQuestions(newQuestions);
                                                            }}
                                                            placeholder={`Option ${String.fromCharCode(65 + optIdx)}`}
                                                            className={`flex-1 px-4 py-3 text-[#191A23] rounded-xl border-2 transition-all outline-none placeholder:text-gray-400 ${q.correctAnswer === optIdx
                                                                ? 'border-[#B9FF66] bg-[#B9FF66]/10'
                                                                : 'border-transparent bg-[#F3F3F3] focus:border-[#191A23] focus:bg-white'
                                                                }`}
                                                        />
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {questions.length > 1 && (
                                            <button
                                                onClick={() => removeQuestion(q.id)}
                                                className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                                Delete Question
                                            </button>
                                        )}
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
            )}

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate('/teacher/dashboard');
                }}
                title="Quiz Created!"
                message="Your quiz has been saved successfully. Students can now take this quiz."
                buttonText="Back to Dashboard"
            />

            {/* Warning Modal */}
            <WarningModal
                isOpen={showWarningModal}
                onClose={() => setShowWarningModal(false)}
                title="Missing Information"
                message={warningMessage}
                buttonText="Got it"
            />
        </DashboardLayout>
    );
};

export default QuizBuilder;
