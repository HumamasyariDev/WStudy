import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ArrowLeft, Search, BookOpen, Users, Eye, Trash2, CheckCircle, XCircle, Clock } from 'lucide-react';

const AdminCourses = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const courses = [
        { id: 1, title: 'Advanced Calculus', teacher: 'Prof. Sarah Johnson', students: 156, status: 'published', category: 'Mathematics', createdAt: '2024-01-15' },
        { id: 2, title: 'Web Development Bootcamp', teacher: 'Prof. Robert Smith', students: 234, status: 'published', category: 'Technology', createdAt: '2024-01-10' },
        { id: 3, title: 'Machine Learning Basics', teacher: 'Dr. Michael Brown', students: 89, status: 'pending', category: 'Technology', createdAt: '2024-01-18' },
        { id: 4, title: 'Biology & Life Sciences', teacher: 'Dr. Emma Wilson', students: 178, status: 'published', category: 'Science', createdAt: '2024-01-12' },
        { id: 5, title: 'English Literature', teacher: 'Prof. Alice Davis', students: 0, status: 'draft', category: 'Language', createdAt: '2024-01-20' },
        { id: 6, title: 'Physics Fundamentals', teacher: 'Dr. John Miller', students: 145, status: 'published', category: 'Science', createdAt: '2024-01-08' },
    ];

    const stats = [
        { label: 'Total Courses', value: courses.length.toString(), icon: BookOpen },
        { label: 'Published', value: courses.filter(c => c.status === 'published').length.toString(), icon: CheckCircle },
        { label: 'Pending Review', value: courses.filter(c => c.status === 'pending').length.toString(), icon: Clock },
        { label: 'Draft', value: courses.filter(c => c.status === 'draft').length.toString(), icon: XCircle },
    ];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.teacher.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === 'all' || course.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'draft': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#191A23]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#191A23] font-geist">All Courses</h1>
                        <p className="text-sm text-gray-600">Review and manage all courses on the platform</p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {stats.map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: idx * 0.05 }}
                                className="bg-white rounded-xl p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#F3F3F3] rounded-lg flex items-center justify-center">
                                        <Icon className="w-5 h-5 text-[#191A23]" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-[#191A23]">{stat.value}</p>
                                        <p className="text-xs text-gray-600">{stat.label}</p>
                                    </div>
                                </div>
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
                                placeholder="Search courses or teachers..."
                                className="w-full pl-12 pr-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all placeholder:text-gray-500"
                            />
                        </div>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="published">Published</option>
                            <option value="pending">Pending</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </motion.div>

                {/* Courses Table */}
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
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Course</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Teacher</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Category</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Students</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredCourses.map((course, idx) => (
                                    <motion.tr
                                        key={course.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                                        className="hover:bg-[#F3F3F3] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#191A23] rounded-xl flex items-center justify-center flex-shrink-0">
                                                    <BookOpen className="w-5 h-5 text-[#B9FF66]" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#191A23]">{course.title}</p>
                                                    <p className="text-xs text-gray-600">{course.createdAt}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-700">{course.teacher}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-[#F3F3F3] text-[#191A23] rounded-full text-xs font-semibold">
                                                {course.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Users className="w-4 h-4 text-gray-400" />
                                                <span className="text-sm font-semibold text-[#191A23]">{course.students}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(course.status)}`}>
                                                {course.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                                                    <Eye className="w-4 h-4 text-blue-600" />
                                                </button>
                                                {course.status === 'pending' && (
                                                    <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                                                        <CheckCircle className="w-4 h-4 text-green-600" />
                                                    </button>
                                                )}
                                                <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                                                    <Trash2 className="w-4 h-4 text-red-600" />
                                                </button>
                                            </div>
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

export default AdminCourses;
