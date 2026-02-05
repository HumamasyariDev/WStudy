import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ArrowLeft, Search, Download, Filter, TrendingUp, TrendingDown, Award, Clock } from 'lucide-react';

const StudentsManagement = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('all');
    const [selectedStatus] = useState('all');

    const students = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', course: 'Advanced Calculus', progress: 85, quizAvg: 92, lastActive: '2 hours ago', status: 'active' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', course: 'Biology & Life Sciences', progress: 72, quizAvg: 78, lastActive: '1 day ago', status: 'active' },
        { id: 3, name: 'Carol White', email: 'carol@example.com', course: 'Web Development', progress: 95, quizAvg: 88, lastActive: '3 hours ago', status: 'active' },
        { id: 4, name: 'David Brown', email: 'david@example.com', course: 'Advanced Calculus', progress: 45, quizAvg: 65, lastActive: '1 week ago', status: 'inactive' },
        { id: 5, name: 'Emma Davis', email: 'emma@example.com', course: 'Biology & Life Sciences', progress: 88, quizAvg: 95, lastActive: '5 hours ago', status: 'active' },
        { id: 6, name: 'Frank Wilson', email: 'frank@example.com', course: 'Web Development', progress: 60, quizAvg: 72, lastActive: '2 days ago', status: 'active' },
        { id: 7, name: 'Grace Lee', email: 'grace@example.com', course: 'Advanced Calculus', progress: 92, quizAvg: 98, lastActive: '1 hour ago', status: 'active' },
    ];

    // Filter students based on search, course, and status
    const filteredStudents = students.filter(student => {
        const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            student.email.toLowerCase().includes(searchQuery.toLowerCase());

        const courseMap: { [key: string]: string } = {
            'calculus': 'Advanced Calculus',
            'biology': 'Biology & Life Sciences',
            'webdev': 'Web Development'
        };
        const matchesCourse = selectedCourse === 'all' || student.course === courseMap[selectedCourse];
        const matchesStatus = selectedStatus === 'all' || student.status === selectedStatus;

        return matchesSearch && matchesCourse && matchesStatus;
    });

    const stats = [
        { label: 'Total Students', value: students.length.toString(), change: '+48', trend: 'up', icon: Award },
        { label: 'Active Students', value: students.filter(s => s.status === 'active').length.toString(), change: '+32', trend: 'up', icon: TrendingUp },
        { label: 'Avg. Progress', value: Math.round(students.reduce((acc, s) => acc + s.progress, 0) / students.length) + '%', change: '+5%', trend: 'up', icon: TrendingUp },
        { label: 'Avg. Quiz Score', value: Math.round(students.reduce((acc, s) => acc + s.quizAvg, 0) / students.length) + '%', change: '-2%', trend: 'down', icon: TrendingDown },
    ];

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#191A23]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#191A23] font-geist">Students Management</h1>
                        <p className="text-sm text-gray-600">Monitor student performance and engagement</p>
                    </div>
                    <button className="px-6 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center gap-2">
                        <Download className="w-5 h-5" />
                        Export Data
                    </button>
                </div>

                {/* Stats */}
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
                                    <div className="w-10 h-10 bg-[#F3F3F3] rounded-lg flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-[#191A23]" />
                                    </div>
                                    <span className={`text-xs font-semibold px-2 py-1 rounded-full ${stat.trend === 'up' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
                                        }`}>
                                        {stat.change}
                                    </span>
                                </div>
                                <p className="text-2xl font-bold text-[#191A23] mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl p-4 shadow-sm"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search students..."
                                className="w-full pl-12 pr-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all placeholder:text-gray-500"
                            />
                        </div>
                        <select
                            value={selectedCourse}
                            onChange={(e) => setSelectedCourse(e.target.value)}
                            className="px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                        >
                            <option value="all">All Courses</option>
                            <option value="calculus">Advanced Calculus</option>
                            <option value="biology">Biology & Life Sciences</option>
                            <option value="webdev">Web Development</option>
                        </select>
                        <button className="px-6 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl font-semibold hover:bg-gray-200 transition-colors flex items-center gap-2">
                            <Filter className="w-5 h-5" />
                            Filters
                        </button>
                    </div>
                </motion.div>

                {/* Students Table */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                >
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-[#F3F3F3]">
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Student</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Course</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Progress</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Quiz Avg</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Last Active</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredStudents.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                                            No students found matching your filters.
                                        </td>
                                    </tr>
                                ) : filteredStudents.map((student, idx) => (
                                    <motion.tr
                                        key={student.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                                        className="hover:bg-[#F3F3F3] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#B9FF66] rounded-full flex items-center justify-center font-bold text-[#191A23]">
                                                    {student.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#191A23]">{student.name}</p>
                                                    <p className="text-sm text-gray-600">{student.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-700">{student.course}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden max-w-[100px]">
                                                    <div
                                                        className="h-full bg-[#B9FF66]"
                                                        style={{ width: `${student.progress}%` }}
                                                    />
                                                </div>
                                                <span className="text-sm font-semibold text-[#191A23]">{student.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`text-sm font-semibold ${student.quizAvg >= 80 ? 'text-green-600' : student.quizAvg >= 60 ? 'text-yellow-600' : 'text-red-600'
                                                }`}>
                                                {student.quizAvg}%
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-gray-600">
                                                <Clock className="w-4 h-4" />
                                                {student.lastActive}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${student.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                                                }`}>
                                                {student.status}
                                            </span>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </motion.div>
            </div>
        </DashboardLayout>
    );
};

export default StudentsManagement;
