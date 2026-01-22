import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Clock, Calendar, CheckCircle, AlertCircle, Trophy, Target, Play, BarChart3, TrendingUp } from 'lucide-react';

const Quizzes = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');

    const upcomingQuizzes = [
        {
            id: 1,
            title: 'Calculus Midterm Exam',
            course: 'Advanced Calculus',
            date: 'Jan 24, 2026',
            time: '10:00 AM',
            duration: '90 min',
            questions: 50,
            difficulty: 'Hard',
            color: 'bg-[#B9FF66]'
        },
        {
            id: 2,
            title: 'Cell Biology Quiz',
            course: 'Biology & Life Sciences',
            date: 'Jan 26, 2026',
            time: '2:00 PM',
            duration: '45 min',
            questions: 30,
            difficulty: 'Medium',
            color: 'bg-[#191A23]'
        },
        {
            id: 3,
            title: 'Spanish Vocabulary Test',
            course: 'Spanish for Beginners',
            date: 'Jan 28, 2026',
            time: '11:00 AM',
            duration: '30 min',
            questions: 25,
            difficulty: 'Easy',
            color: 'bg-[#F3F3F3]'
        },
        {
            id: 4,
            title: 'React Components Quiz',
            course: 'Web Development Bootcamp',
            date: 'Jan 30, 2026',
            time: '3:00 PM',
            duration: '60 min',
            questions: 40,
            difficulty: 'Medium',
            color: 'bg-[#B9FF66]'
        },
    ];

    const completedQuizzes = [
        {
            id: 1,
            title: 'Algebra Fundamentals',
            course: 'Advanced Calculus',
            completedDate: 'Jan 15, 2026',
            score: 92,
            totalQuestions: 40,
            correctAnswers: 37,
            timeSpent: '42 min',
            color: 'bg-[#B9FF66]'
        },
        {
            id: 2,
            title: 'Genetics Basics',
            course: 'Biology & Life Sciences',
            completedDate: 'Jan 12, 2026',
            score: 88,
            totalQuestions: 30,
            correctAnswers: 26,
            timeSpent: '38 min',
            color: 'bg-[#191A23]'
        },
        {
            id: 3,
            title: 'Spanish Grammar',
            course: 'Spanish for Beginners',
            completedDate: 'Jan 10, 2026',
            score: 95,
            totalQuestions: 25,
            correctAnswers: 24,
            timeSpent: '28 min',
            color: 'bg-[#F3F3F3]'
        },
        {
            id: 4,
            title: 'HTML & CSS Basics',
            course: 'Web Development Bootcamp',
            completedDate: 'Jan 8, 2026',
            score: 100,
            totalQuestions: 35,
            correctAnswers: 35,
            timeSpent: '45 min',
            color: 'bg-[#B9FF66]'
        },
        {
            id: 5,
            title: 'Color Theory',
            course: 'Digital Art Masterclass',
            completedDate: 'Jan 5, 2026',
            score: 85,
            totalQuestions: 20,
            correctAnswers: 17,
            timeSpent: '25 min',
            color: 'bg-[#191A23]'
        },
    ];

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
            case 'Easy': return 'bg-green-100 text-green-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            case 'Hard': return 'bg-red-100 text-red-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getScoreColor = (score: number) => {
        if (score >= 90) return 'text-green-600';
        if (score >= 75) return 'text-blue-600';
        if (score >= 60) return 'text-yellow-600';
        return 'text-red-600';
    };

    const averageScore = completedQuizzes.reduce((acc, quiz) => acc + quiz.score, 0) / completedQuizzes.length;

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-[#191A23] font-geist mb-2">Quizzes</h1>
                    <p className="text-gray-600">Test your knowledge and track your performance</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Upcoming', value: upcomingQuizzes.length, icon: Calendar },
                        { label: 'Completed', value: completedQuizzes.length, icon: CheckCircle },
                        { label: 'Avg Score', value: `${Math.round(averageScore)}%`, icon: TrendingUp },
                        { label: 'Best Score', value: '100%', icon: Trophy },
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

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl p-2 shadow-sm inline-flex gap-2"
                >
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${activeTab === 'upcoming'
                                ? 'bg-[#B9FF66] text-[#191A23]'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Upcoming ({upcomingQuizzes.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`px-6 py-3 rounded-lg font-semibold text-sm transition-all ${activeTab === 'completed'
                                ? 'bg-[#B9FF66] text-[#191A23]'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Completed ({completedQuizzes.length})
                    </button>
                </motion.div>

                {/* Upcoming Quizzes */}
                {activeTab === 'upcoming' && (
                    <div className="grid md:grid-cols-2 gap-6">
                        {upcomingQuizzes.map((quiz, idx) => (
                            <motion.div
                                key={quiz.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                                whileHover={{
                                    y: -4,
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                    transition: { duration: 0.2 }
                                }}
                                className="bg-white rounded-xl overflow-hidden shadow-sm group cursor-pointer"
                            >
                                <div className={`h-3 ${quiz.color}`}></div>
                                <div className="p-6 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg text-[#191A23] mb-1">{quiz.title}</h3>
                                            <p className="text-sm text-gray-600">{quiz.course}</p>
                                        </div>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(quiz.difficulty)}`}>
                                            {quiz.difficulty}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 py-4 border-y border-gray-100">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar size={16} />
                                            <span>{quiz.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock size={16} />
                                            <span>{quiz.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Target size={16} />
                                            <span>{quiz.questions} questions</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <AlertCircle size={16} />
                                            <span>{quiz.duration}</span>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => navigate(`/student/quiz/${quiz.id}`)}
                                        className="w-full bg-[#191A23] text-[#B9FF66] py-3 rounded-xl font-bold hover:bg-[#2a2b3a] transition-colors flex items-center justify-center gap-2 group-hover:scale-[1.02] transition-transform"
                                    >
                                        <Play size={18} />
                                        Start Quiz
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Completed Quizzes */}
                {activeTab === 'completed' && (
                    <div className="space-y-4">
                        {completedQuizzes.map((quiz, idx) => (
                            <motion.div
                                key={quiz.id}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                                whileHover={{
                                    y: -2,
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    transition: { duration: 0.2 }
                                }}
                                className="bg-white rounded-xl p-6 shadow-sm"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-6">
                                    {/* Left: Quiz Info */}
                                    <div className="flex-1">
                                        <div className="flex items-start gap-4">
                                            <div className={`w-16 h-16 rounded-xl ${quiz.color} flex items-center justify-center flex-shrink-0`}>
                                                <CheckCircle className={`w-8 h-8 ${quiz.color === 'bg-[#191A23]' ? 'text-[#B9FF66]' : 'text-[#191A23]'
                                                    }`} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-bold text-lg text-[#191A23] mb-1">{quiz.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2">{quiz.course}</p>
                                                <div className="flex items-center gap-4 text-xs text-gray-500">
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={12} />
                                                        {quiz.completedDate}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Clock size={12} />
                                                        {quiz.timeSpent}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Score */}
                                    <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <div className={`text-4xl font-bold ${getScoreColor(quiz.score)}`}>
                                                {quiz.score}%
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Score</p>
                                        </div>
                                        <div className="h-16 w-px bg-gray-200"></div>
                                        <div className="text-center">
                                            <div className="text-2xl font-bold text-[#191A23]">
                                                {quiz.correctAnswers}/{quiz.totalQuestions}
                                            </div>
                                            <p className="text-xs text-gray-500 mt-1">Correct</p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/student/quiz/${quiz.id}/review`)}
                                            className="ml-4 px-4 py-2 bg-[#F3F3F3] text-[#191A23] rounded-lg font-semibold text-sm hover:bg-gray-200 transition-colors flex items-center gap-2"
                                        >
                                            <BarChart3 size={16} />
                                            Review
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default Quizzes;
