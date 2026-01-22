import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Users, BookOpen, TrendingUp, Award, ShieldCheck, Eye, UserPlus, FileText } from 'lucide-react';

const AdminOverview = () => {
    const navigate = useNavigate();

    const stats = [
        { label: 'Total Users', value: '2,543', change: '+12%', trend: 'up', icon: Users, color: 'bg-[#B9FF66]' },
        { label: 'Active Courses', value: '156', change: '+5%', trend: 'up', icon: BookOpen, color: 'bg-blue-100' },
        { label: 'Teachers', value: '48', change: '+8%', trend: 'up', icon: ShieldCheck, color: 'bg-purple-100' },
        { label: 'Students', value: '2,495', change: '+15%', trend: 'up', icon: Award, color: 'bg-green-100' },
    ];

    const recentUsers = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Student', joinedAt: '2 mins ago', status: 'active' },
        { id: 2, name: 'Prof. Robert', email: 'robert@example.com', role: 'Teacher', joinedAt: '15 mins ago', status: 'active' },
        { id: 3, name: 'Emma Wilson', email: 'emma@example.com', role: 'Student', joinedAt: '1 hour ago', status: 'active' },
        { id: 4, name: 'Dr. Michael', email: 'michael@example.com', role: 'Teacher', joinedAt: '2 hours ago', status: 'pending' },
    ];

    const recentCourses = [
        { id: 1, title: 'Advanced Calculus', teacher: 'Prof. Sarah', students: 156, status: 'published' },
        { id: 2, title: 'Web Development Bootcamp', teacher: 'Prof. Robert', students: 234, status: 'published' },
        { id: 3, title: 'Machine Learning Basics', teacher: 'Dr. Michael', students: 89, status: 'pending' },
    ];

    const quickActions = [
        { label: 'Verify Teachers', icon: ShieldCheck, color: 'bg-blue-100 text-blue-600', onClick: () => navigate('/admin/users') },
        { label: 'Review Courses', icon: Eye, color: 'bg-purple-100 text-purple-600', onClick: () => navigate('/admin/courses') },
        { label: 'Manage Users', icon: Users, color: 'bg-green-100 text-green-600', onClick: () => navigate('/admin/users') },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden">
                {/* Header */}
                <div className="mb-2">
                    <h1 className="text-2xl md:text-3xl font-bold text-[#191A23] font-geist">Admin Overview</h1>
                    <p className="text-sm text-gray-600">Manage your platform users and courses</p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="bg-white rounded-xl p-5 shadow-sm"
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                                        <Icon className="w-6 h-6 text-[#191A23]" />
                                    </div>
                                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-green-50 text-green-600">
                                        {stat.change} <TrendingUp className="w-3 h-3 inline" />
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-[#191A23] mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Users */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white rounded-xl p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-[#191A23] font-geist">Recent Users</h2>
                            <button
                                onClick={() => navigate('/admin/users')}
                                className="text-sm text-[#191A23] hover:text-[#B9FF66] font-semibold transition-colors"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentUsers.map((user) => (
                                <div key={user.id} className="flex items-center justify-between p-3 bg-[#F3F3F3] rounded-xl hover:bg-gray-200 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#B9FF66] rounded-full flex items-center justify-center font-bold text-[#191A23]">
                                            {user.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#191A23]">{user.name}</p>
                                            <p className="text-xs text-gray-600">{user.role} • {user.joinedAt}</p>
                                        </div>
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${user.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                                        }`}>
                                        {user.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Recent Courses */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white rounded-xl p-6 shadow-sm"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xl font-bold text-[#191A23] font-geist">Recent Courses</h2>
                            <button
                                onClick={() => navigate('/admin/courses')}
                                className="text-sm text-[#191A23] hover:text-[#B9FF66] font-semibold transition-colors"
                            >
                                View All
                            </button>
                        </div>
                        <div className="space-y-3">
                            {recentCourses.map((course) => (
                                <div key={course.id} className="flex items-center justify-between p-3 bg-[#F3F3F3] rounded-xl hover:bg-gray-200 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-[#191A23] rounded-xl flex items-center justify-center">
                                            <BookOpen className="w-5 h-5 text-[#B9FF66]" />
                                        </div>
                                        <div>
                                            <p className="font-semibold text-[#191A23]">{course.title}</p>
                                            <p className="text-xs text-gray-600">by {course.teacher}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-bold text-[#191A23]">{course.students} students</p>
                                        <span className={`text-xs font-semibold ${course.status === 'published' ? 'text-green-600' : 'text-yellow-600'
                                            }`}>
                                            {course.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-xl font-bold text-[#191A23] font-geist mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {quickActions.map((action, idx) => {
                            const Icon = action.icon;
                            return (
                                <button
                                    key={idx}
                                    onClick={action.onClick}
                                    className="p-6 rounded-xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center gap-3 hover:border-[#B9FF66] hover:bg-[#B9FF66]/10 transition-all group"
                                >
                                    <div className={`w-12 h-12 rounded-full ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-sm font-bold text-[#191A23]">{action.label}</span>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default AdminOverview;
