import { motion } from 'framer-motion';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { useAuthStore } from '../../store/useAuthStore';
import { Calculator, Dna, Globe2, BookOpen, Clock, Award, TrendingUp, Users, CheckCircle, BarChart3, Calendar } from 'lucide-react';

const StudentDashboard = () => {
    const { user } = useAuthStore();

    const stats = [
        { label: 'Active Courses', value: '8', change: '+12%', icon: BookOpen },
        { label: 'Total Hours', value: '124', change: '+8%', icon: Clock },
        { label: 'Completed', value: '12', change: '+23%', icon: CheckCircle },
        { label: 'Avg Score', value: '92%', change: '+5%', icon: TrendingUp },
    ];

    const activeCourses = [
        { id: 1, title: 'Mathematics Fundamentals', instructor: 'Dr. Sarah Johnson', icon: Calculator, progress: 68, students: 234 },
        { id: 2, title: 'Biology & Life Sciences', instructor: 'Prof. Michael Chen', icon: Dna, progress: 82, students: 189 },
        { id: 3, title: 'World Languages', instructor: 'Ms. Emma Wilson', icon: Globe2, progress: 45, students: 156 },
    ];

    const upcomingTasks = [
        { title: 'Mathematics Quiz', date: 'Jan 24', time: '10:00 AM', type: 'Quiz' },
        { title: 'Biology Assignment', date: 'Jan 26', time: '5:00 PM', type: 'Assignment' },
        { title: 'Language Practice', date: 'Jan 28', time: '2:00 PM', type: 'Practice' },
    ];

    const recentActivity = [
        { course: 'Mathematics', action: 'Completed Chapter 5', time: '2 hours ago' },
        { course: 'Biology', action: 'Submitted Assignment', time: '5 hours ago' },
        { course: 'Languages', action: 'Watched Lecture 3', time: '1 day ago' },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden">
                {/* Welcome Card with Gradient */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="relative bg-gradient-to-r from-[#191A23] to-[#2a2b3a] rounded-2xl p-5 md:p-8 overflow-hidden"
                >
                    {/* Decorative circles */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B9FF66] rounded-full opacity-10 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#B9FF66] rounded-full opacity-10 blur-3xl"></div>

                    <div className="relative z-10">
                        <p className="text-[#B9FF66] text-xs md:text-sm font-semibold mb-1 md:mb-2">Welcome back,</p>
                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 md:mb-2 font-geist">
                            {user?.name || 'Student'}!
                        </h1>
                        <p className="text-gray-300 text-sm md:text-base mb-4 md:mb-6">Glad to see you again!</p>
                        <div className="flex flex-wrap gap-2 md:gap-4">
                            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/20">
                                <p className="text-xs text-gray-300">Streak</p>
                                <p className="text-base md:text-xl font-bold text-white">12 Days 🔥</p>
                            </div>
                            <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 md:px-4 md:py-2 rounded-lg border border-white/20">
                                <p className="text-xs text-gray-300">Points</p>
                                <p className="text-base md:text-xl font-bold text-[#B9FF66]">2,450</p>
                            </div>
                        </div>
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
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 + idx * 0.05, ease: "easeOut" }}
                                whileHover={{
                                    y: -2,
                                    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                                    transition: { duration: 0.2 }
                                }}
                                className="bg-white rounded-xl p-4 shadow-sm cursor-pointer"
                            >
                                <div className="flex items-center gap-4">
                                    {/* Icon - compact */}
                                    <div className="w-12 h-12 bg-[#F3F3F3] rounded-xl flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-[#191A23]" />
                                    </div>

                                    {/* Content */}
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

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Active Courses - 2 columns */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Course Progress Section */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-[#191A23] font-geist">Active Courses</h2>
                                <button className="text-sm font-semibold text-[#191A23] hover:text-[#B9FF66] transition-colors">
                                    View All →
                                </button>
                            </div>

                            <div className="space-y-4">
                                {activeCourses.map((course, idx) => {
                                    const Icon = course.icon;
                                    return (
                                        <motion.div
                                            key={course.id}
                                            initial={{ opacity: 0, x: -20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true, margin: "-20px" }}
                                            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                                            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
                                            className="p-4 bg-[#F3F3F3] rounded-xl hover:bg-gray-100 cursor-pointer group"
                                        >
                                            <div className="flex items-start gap-4 mb-3">
                                                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform">
                                                    <Icon className="w-6 h-6 text-[#191A23]" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-[#191A23] mb-1">{course.title}</h3>
                                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                                        <span className="flex items-center gap-1">
                                                            <Users size={14} />
                                                            {course.students} students
                                                        </span>
                                                        <span>•</span>
                                                        <span>{course.instructor}</span>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <p className="text-2xl font-bold text-[#191A23]">{course.progress}%</p>
                                                    <p className="text-xs text-gray-600">Complete</p>
                                                </div>
                                            </div>
                                            <div className="w-full h-2 bg-white rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#B9FF66] transition-all duration-500"
                                                    style={{ width: `${course.progress}%` }}
                                                />
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold text-[#191A23] font-geist mb-6">Recent Activity</h2>
                            <div className="space-y-4">
                                {recentActivity.map((activity, idx) => (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 + idx * 0.1 }}
                                        className="flex items-start gap-4 pb-4 border-b border-gray-100 last:border-0 last:pb-0"
                                    >
                                        <div className="w-10 h-10 bg-[#B9FF66] rounded-full flex items-center justify-center flex-shrink-0">
                                            <CheckCircle className="w-5 h-5 text-[#191A23]" />
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-semibold text-[#191A23]">{activity.course}</p>
                                            <p className="text-sm text-gray-600">{activity.action}</p>
                                        </div>
                                        <span className="text-xs text-gray-500">{activity.time}</span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar - 1 column */}
                    <div className="space-y-6">
                        {/* Upcoming Tasks */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="bg-white rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-[#191A23] font-geist">Upcoming Tasks</h3>
                                <Calendar className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="space-y-3">
                                {upcomingTasks.map((task, idx) => (
                                    <div key={idx} className="p-4 bg-[#F3F3F3] rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex-1">
                                                <p className="font-bold text-sm text-[#191A23] mb-1">{task.title}</p>
                                                <p className="text-xs text-gray-600">{task.type}</p>
                                            </div>
                                            <span className="text-xs font-semibold text-[#191A23] bg-[#B9FF66] px-2 py-1 rounded-full">
                                                {task.date}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <Clock size={12} />
                                            {task.time}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        {/* Performance Overview */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="bg-[#191A23] rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-[#B9FF66] rounded-xl flex items-center justify-center">
                                    <BarChart3 className="w-6 h-6 text-[#191A23]" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-white font-geist">Performance</h3>
                                    <p className="text-xs text-gray-400">This month</p>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Attendance</span>
                                    <span className="text-sm font-bold text-[#B9FF66]">95%</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Assignments</span>
                                    <span className="text-sm font-bold text-[#B9FF66]">12/14</span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-300">Quizzes</span>
                                    <span className="text-sm font-bold text-[#B9FF66]">8/10</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Achievements */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="bg-white rounded-xl p-6 shadow-sm"
                        >
                            <h3 className="text-lg font-bold text-[#191A23] font-geist mb-4">Recent Badges</h3>
                            <div className="grid grid-cols-3 gap-3">
                                {[1, 2, 3].map((badge) => (
                                    <div key={badge} className="aspect-square bg-[#F3F3F3] rounded-xl flex items-center justify-center hover:bg-[#B9FF66] transition-colors cursor-pointer group">
                                        <Award className="w-8 h-8 text-gray-400 group-hover:text-[#191A23] transition-colors" />
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 text-sm font-semibold text-[#191A23] hover:text-[#B9FF66] transition-colors">
                                View All Achievements →
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default StudentDashboard;
