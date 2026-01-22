import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SuccessModal from '../../components/ui/SuccessModal';
import WarningModal from '../../components/ui/WarningModal';
import { ArrowLeft, Plus, Trash2, Save, ChevronDown, ChevronUp } from 'lucide-react';

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

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden max-w-5xl mx-auto">
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
