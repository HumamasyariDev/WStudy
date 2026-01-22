import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuthStore } from '../../store/useAuthStore';
import { BookOpen, Users, FileQuestion, TrendingUp, Plus, Eye, Edit, BarChart3 } from 'lucide-react';

const TeacherDashboard = () => {
    const { user } = useAuthStore();
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Courses', value: '12', change: '+2', icon: BookOpen },
        { label: 'Total Students', value: '1,284', change: '+48', icon: Users },
        { label: 'Active Quizzes', value: '24', change: '+5', icon: FileQuestion },
        { label: 'Avg. Score', value: '87%', change: '+3%', icon: TrendingUp },
    ];

    const courses = [
        { id: 1, title: 'Advanced Calculus', students: 234, quizzes: 8, avgScore: 85 },
        { id: 2, title: 'Biology & Life Sciences', students: 189, quizzes: 6, avgScore: 92 },
        { id: 3, title: 'Web Development Bootcamp', students: 312, quizzes: 12, avgScore: 88 },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden">

                {/* Welcome Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-gradient-to-r from-[#191A23] to-[#2a2b3a] rounded-2xl p-5 md:p-8 overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9FF66] rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B9FF66] rounded-full opacity-10 blur-3xl"></div>
                    
                    <div className="relative z-10">
                        <p className="text-[#B9FF66] text-xs md:text-sm font-semibold mb-1 md:mb-2">Welcome back,</p>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 font-geist">
                            {user?.name || 'Teacher'}!
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">Ready to inspire and educate today?</p>
                        <button
                            onClick={() => navigate('/teacher/create-course')}
                            className="px-6 py-3 bg-[#B9FF66] text-[#191A23] rounded-xl font-semibold hover:bg-[#a8ee55] transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-5 h-5" />
                            Create New Course
                        </button>
                    </div>
                </motion.div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05 }}
                                className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-[#F3F3F3] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-[#191A23]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <p className="text-2xl font-bold text-[#191A23]">{stat.value}</p>
                                            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                                                {stat.change}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-600 truncate">{stat.label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* My Courses */}
                <div>
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[#191A23] font-geist">My Courses</h2>
                        <button
                            onClick={() => navigate('/teacher/courses')}
                            className="text-sm text-gray-600 hover:text-[#191A23] font-semibold"
                        >
                            View All
                        </button>
                    </div>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {courses.map((course, idx) => (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all"
                            >
                                <h3 className="font-bold text-lg text-[#191A23] mb-3">{course.title}</h3>
                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Students</span>
                                        <span className="font-semibold text-[#191A23]">{course.students}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Quizzes</span>
                                        <span className="font-semibold text-[#191A23]">{course.quizzes}</span>
                                    </div>
                                    <div className="flex items-center justify-between text-sm">
                                        <span className="text-gray-600">Avg. Score</span>
                                        <span className="font-semibold text-green-600">{course.avgScore}%</span>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button className="flex-1 px-3 py-2 bg-[#F3F3F3] text-[#191A23] rounded-lg text-sm font-semibold hover:bg-gray-200 transition-colors flex items-center justify-center gap-1">
                                        <Eye className="w-4 h-4" />
                                        View
                                    </button>
                                    <button className="flex-1 px-3 py-2 bg-[#191A23] text-[#B9FF66] rounded-lg text-sm font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center justify-center gap-1">
                                        <Edit className="w-4 h-4" />
                                        Edit
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-xl font-bold text-[#191A23] font-geist mb-4">Quick Actions</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <button
                            onClick={() => navigate('/teacher/create-course')}
                            className="p-4 bg-[#F3F3F3] rounded-xl hover:bg-gray-200 transition-colors text-left"
                        >
                            <Plus className="w-8 h-8 text-[#191A23] mb-2" />
                            <p className="font-semibold text-[#191A23]">Create Course</p>
                            <p className="text-xs text-gray-600 mt-1">Start a new course</p>
                        </button>
                        <button
                            onClick={() => navigate('/teacher/quiz-builder')}
                            className="p-4 bg-[#F3F3F3] rounded-xl hover:bg-gray-200 transition-colors text-left"
                        >
                            <FileQuestion className="w-8 h-8 text-[#191A23] mb-2" />
                            <p className="font-semibold text-[#191A23]">Build Quiz</p>
                            <p className="text-xs text-gray-600 mt-1">Create new quiz</p>
                        </button>
                        <button
                            onClick={() => navigate('/teacher/students')}
                            className="p-4 bg-[#F3F3F3] rounded-xl hover:bg-gray-200 transition-colors text-left"
                        >
                            <BarChart3 className="w-8 h-8 text-[#191A23] mb-2" />
                            <p className="font-semibold text-[#191A23]">View Analytics</p>
                            <p className="text-xs text-gray-600 mt-1">Student performance</p>
                        </button>
                    </div>
                </motion.div>

            </div>
        </DashboardLayout>
    );
};

export default TeacherDashboard;
