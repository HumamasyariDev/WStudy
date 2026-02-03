import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Clock, Calendar, CheckCircle, AlertCircle, Trophy, Target, Play, BarChart3, TrendingUp } from 'lucide-react';

const Quizzes = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
    const [searchQuery] = useState('');

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

    // Filter quizzes based on search query
    const filteredUpcomingQuizzes = upcomingQuizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.course.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCompletedQuizzes = completedQuizzes.filter(quiz =>
        quiz.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        quiz.course.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout>
            {/* Animated Background - Landing Page Style */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
                <div className="absolute top-20 right-10 w-72 h-72 bg-[#B9FF66]/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-10 w-96 h-96 bg-[#191A23]/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                {/* Subtle grid pattern */}
                <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: 'radial-gradient(circle, #191A23 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
            </div>

            <div className="relative space-y-6" style={{ zIndex: 1 }}>
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white/90 backdrop-blur-md rounded-[32px] p-8 shadow-xl border border-gray-200/50 relative"
                    style={{ zIndex: 2 }}
                >
                    <div className="flex items-center gap-3 mb-3">
                        <div className="w-1.5 h-8 bg-[#B9FF66] rounded-full"></div>
                        <h1 className="text-3xl md:text-4xl font-bold text-[#191A23] font-geist">Quizzes</h1>
                    </div>
                    <p className="text-gray-600 text-lg ml-5">Test your knowledge and track your performance</p>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                    {[
                        { label: 'Upcoming', value: upcomingQuizzes.length, icon: Calendar, color: 'bg-blue-50', iconColor: 'text-blue-600' },
                        { label: 'Completed', value: completedQuizzes.length, icon: CheckCircle, color: 'bg-green-50', iconColor: 'text-green-600' },
                        { label: 'Avg Score', value: `${Math.round(averageScore)}%`, icon: TrendingUp, color: 'bg-purple-50', iconColor: 'text-purple-600' },
                        { label: 'Best Score', value: '100%', icon: Trophy, color: 'bg-yellow-50', iconColor: 'text-yellow-600' },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white/90 backdrop-blur-sm rounded-[24px] p-4 md:p-5 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow overflow-hidden"
                            >
                                <div className="flex items-center gap-2 md:gap-3 w-full">
                                    <div className={`w-10 h-10 md:w-12 md:h-12 ${stat.color} rounded-[14px] md:rounded-[16px] flex items-center justify-center flex-shrink-0`}>
                                        <Icon className={`w-5 h-5 md:w-6 md:h-6 ${stat.iconColor}`} />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xl md:text-2xl font-bold text-[#191A23] leading-tight truncate">{stat.value}</p>
                                        <p className="text-xs md:text-sm text-gray-600 truncate font-medium">{stat.label}</p>
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
                    transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="bg-white/90 backdrop-blur-sm rounded-[20px] p-2 shadow-lg border border-gray-200/50 inline-flex gap-2 relative"
                    style={{ zIndex: 2 }}
                >
                    <button
                        onClick={() => setActiveTab('upcoming')}
                        className={`px-8 py-3.5 rounded-[14px] font-bold text-sm transition-all ${
                            activeTab === 'upcoming'
                                ? 'bg-[#B9FF66] text-[#191A23] shadow-md'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Upcoming ({filteredUpcomingQuizzes.length})
                    </button>
                    <button
                        onClick={() => setActiveTab('completed')}
                        className={`px-8 py-3.5 rounded-[14px] font-bold text-sm transition-all ${
                            activeTab === 'completed'
                                ? 'bg-[#B9FF66] text-[#191A23] shadow-md'
                                : 'text-gray-600 hover:bg-gray-50'
                            }`}
                    >
                        Completed ({filteredCompletedQuizzes.length})
                    </button>
                </motion.div>

                {/* Upcoming Quizzes */}
                {activeTab === 'upcoming' && (
                    <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                        {filteredUpcomingQuizzes.map((quiz, idx) => (
                            <motion.div
                                key={quiz.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white/90 backdrop-blur-sm rounded-[28px] overflow-hidden shadow-lg border border-gray-200/50 hover:shadow-2xl transition-shadow"
                            >
                                <div className={`h-2 ${quiz.color}`}></div>
                                <div className="p-5 md:p-7 space-y-4 md:space-y-5">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <h3 className="font-bold text-lg md:text-xl text-[#191A23] mb-2 font-geist leading-tight">{quiz.title}</h3>
                                            <p className="text-sm text-gray-600 flex items-center gap-2 truncate">
                                                <span className="w-1.5 h-1.5 bg-[#B9FF66] rounded-full flex-shrink-0"></span>
                                                <span className="truncate">{quiz.course}</span>
                                            </p>
                                        </div>
                                        <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-[12px] text-xs font-bold flex-shrink-0 ${getDifficultyColor(quiz.difficulty)}`}>
                                            {quiz.difficulty}
                                        </span>
                                    </div>

                                    <div className="grid grid-cols-2 gap-2.5 md:gap-3 py-4 md:py-5 border-y border-gray-200">
                                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                                            <div className="w-7 h-7 md:w-8 md:h-8 bg-blue-50 rounded-[10px] flex items-center justify-center flex-shrink-0">
                                                <Calendar size={14} className="text-blue-600 md:w-4 md:h-4" />
                                            </div>
                                            <span className="font-medium truncate">{quiz.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                                            <div className="w-7 h-7 md:w-8 md:h-8 bg-purple-50 rounded-[10px] flex items-center justify-center flex-shrink-0">
                                                <Clock size={14} className="text-purple-600 md:w-4 md:h-4" />
                                            </div>
                                            <span className="font-medium truncate">{quiz.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                                            <div className="w-7 h-7 md:w-8 md:h-8 bg-green-50 rounded-[10px] flex items-center justify-center flex-shrink-0">
                                                <Target size={14} className="text-green-600 md:w-4 md:h-4" />
                                            </div>
                                            <span className="font-medium truncate">{quiz.questions} questions</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs md:text-sm text-gray-700">
                                            <div className="w-7 h-7 md:w-8 md:h-8 bg-orange-50 rounded-[10px] flex items-center justify-center flex-shrink-0">
                                                <AlertCircle size={14} className="text-orange-600 md:w-4 md:h-4" />
                                            </div>
                                            <span className="font-medium truncate">{quiz.duration}</span>
                                        </div>
                                    </div>

                                    <motion.button
                                        onClick={() => navigate(`/student/quiz/${quiz.id}`)}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.99 }}
                                        className="w-full bg-gradient-to-r from-[#191A23] to-[#2a2b3a] text-[#B9FF66] py-3.5 md:py-4 rounded-[16px] font-bold hover:shadow-xl hover:shadow-[#191A23]/30 transition-all flex items-center justify-center gap-2 group/btn"
                                    >
                                        <motion.div
                                            animate={{ x: [0, 4, 0] }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        >
                                            <Play size={18} className="group-hover/btn:scale-110 transition-transform md:w-5 md:h-5" />
                                        </motion.div>
                                        <span className="text-sm md:text-base">Start Quiz</span>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Completed Quizzes */}
                {activeTab === 'completed' && (
                    <div className="space-y-4 md:space-y-5">
                        {filteredCompletedQuizzes.map((quiz, idx) => (
                            <motion.div
                                key={quiz.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                                className="bg-white/90 backdrop-blur-sm rounded-[28px] p-5 md:p-8 shadow-lg border border-gray-200/50 hover:shadow-xl transition-shadow overflow-hidden"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
                                    {/* Left: Quiz Info */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start gap-3 md:gap-4">
                                            <div className={`w-12 h-12 md:w-16 md:h-16 rounded-[18px] ${quiz.color} flex items-center justify-center flex-shrink-0 shadow-md`}>
                                                <CheckCircle className={`w-6 h-6 md:w-8 md:h-8 ${
                                                    quiz.color === 'bg-[#191A23]' ? 'text-[#B9FF66]' : 'text-[#191A23]'
                                                }`} />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg md:text-xl text-[#191A23] mb-2 font-geist leading-tight">{quiz.title}</h3>
                                                <p className="text-sm text-gray-600 mb-2 md:mb-3 flex items-center gap-2 truncate">
                                                    <span className="w-1.5 h-1.5 bg-[#B9FF66] rounded-full flex-shrink-0"></span>
                                                    {quiz.course}
                                                </p>
                                                <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-600 flex-wrap">
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Calendar size={14} />
                                                        {quiz.completedDate}
                                                    </span>
                                                    <span className="flex items-center gap-1.5 font-medium">
                                                        <Clock size={14} />
                                                        {quiz.timeSpent}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right: Score */}
                                    <div className="flex items-center gap-3 md:gap-6 flex-wrap md:flex-nowrap">
                                        <div className="text-center flex-shrink-0">
                                            <div className={`text-3xl md:text-5xl font-bold ${getScoreColor(quiz.score)}`}>
                                                {quiz.score}%
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2 font-medium">Score</p>
                                        </div>
                                        <div className="hidden md:block h-20 w-px bg-gray-200"></div>
                                        <div className="text-center flex-shrink-0">
                                            <div className="text-2xl md:text-3xl font-bold text-[#191A23]">
                                                {quiz.correctAnswers}/{quiz.totalQuestions}
                                            </div>
                                            <p className="text-sm text-gray-600 mt-2 font-medium">Correct</p>
                                        </div>
                                        <button
                                            onClick={() => navigate(`/student/quiz/${quiz.id}/review`)}
                                            className="w-full md:w-auto md:ml-4 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-gray-100 to-gray-50 text-[#191A23] rounded-[14px] font-bold text-xs md:text-sm hover:shadow-lg transition-shadow flex items-center justify-center gap-2 flex-shrink-0"
                                        >
                                            <BarChart3 size={16} className="md:w-[18px] md:h-[18px]" />
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
