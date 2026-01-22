import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ArrowLeft, Search, Users, UserCheck, UserX, ShieldCheck, GraduationCap, Eye } from 'lucide-react';

const AdminUsers = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [roleFilter, setRoleFilter] = useState('all');
    const [statusFilter, setStatusFilter] = useState('all');

    const users = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'student', status: 'active', joinedAt: '2024-01-15', courses: 3 },
        { id: 2, name: 'Prof. Robert Smith', email: 'robert@example.com', role: 'teacher', status: 'active', joinedAt: '2024-01-10', courses: 5 },
        { id: 3, name: 'Emma Wilson', email: 'emma@example.com', role: 'student', status: 'active', joinedAt: '2024-01-18', courses: 2 },
        { id: 4, name: 'Dr. Michael Brown', email: 'michael@example.com', role: 'teacher', status: 'pending', joinedAt: '2024-01-19', courses: 0 },
        { id: 5, name: 'Sarah Davis', email: 'sarah@example.com', role: 'student', status: 'inactive', joinedAt: '2024-01-05', courses: 1 },
        { id: 6, name: 'Prof. John Miller', email: 'john@example.com', role: 'teacher', status: 'active', joinedAt: '2024-01-08', courses: 4 },
        { id: 7, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'student', status: 'active', joinedAt: '2024-01-20', courses: 0 },
        { id: 8, name: 'Admin User', email: 'admin@wstudy.com', role: 'admin', status: 'active', joinedAt: '2024-01-01', courses: 0 },
    ];

    const stats = [
        { label: 'Total Users', value: users.length.toString(), icon: Users, color: 'bg-[#B9FF66]' },
        { label: 'Students', value: users.filter(u => u.role === 'student').length.toString(), icon: GraduationCap, color: 'bg-blue-100' },
        { label: 'Teachers', value: users.filter(u => u.role === 'teacher').length.toString(), icon: ShieldCheck, color: 'bg-purple-100' },
        { label: 'Pending', value: users.filter(u => u.status === 'pending').length.toString(), icon: UserCheck, color: 'bg-yellow-100' },
    ];

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === 'all' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'active': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'inactive': return 'bg-gray-100 text-gray-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const getRoleStyle = (role: string) => {
        switch (role) {
            case 'admin': return 'bg-red-100 text-red-700';
            case 'teacher': return 'bg-purple-100 text-purple-700';
            case 'student': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#191A23]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#191A23] font-geist">Users Management</h1>
                        <p className="text-sm text-gray-600">Manage all users, teachers, and students</p>
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
                                    <div className={`w-10 h-10 ${stat.color} rounded-lg flex items-center justify-center`}>
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
                                placeholder="Search users by name or email..."
                                className="w-full pl-12 pr-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all placeholder:text-gray-500"
                            />
                        </div>
                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                        >
                            <option value="all">All Roles</option>
                            <option value="student">Students</option>
                            <option value="teacher">Teachers</option>
                            <option value="admin">Admins</option>
                        </select>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                        >
                            <option value="all">All Status</option>
                            <option value="active">Active</option>
                            <option value="pending">Pending</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </motion.div>

                {/* Users Table */}
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
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">User</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Role</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Status</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Courses</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Joined</th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-[#191A23]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {filteredUsers.map((user, idx) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: 0.4 + idx * 0.05 }}
                                        className="hover:bg-[#F3F3F3] transition-colors"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-[#B9FF66] rounded-full flex items-center justify-center font-bold text-[#191A23]">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-[#191A23]">{user.name}</p>
                                                    <p className="text-xs text-gray-600">{user.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getRoleStyle(user.role)}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${getStatusStyle(user.status)}`}>
                                                {user.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm font-semibold text-[#191A23]">{user.courses}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-sm text-gray-600">{user.joinedAt}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button className="p-2 hover:bg-blue-100 rounded-lg transition-colors" title="View">
                                                    <Eye className="w-4 h-4 text-blue-600" />
                                                </button>
                                                {user.status === 'pending' && (
                                                    <button className="p-2 hover:bg-green-100 rounded-lg transition-colors" title="Approve">
                                                        <UserCheck className="w-4 h-4 text-green-600" />
                                                    </button>
                                                )}
                                                {user.role !== 'admin' && (
                                                    <button className="p-2 hover:bg-red-100 rounded-lg transition-colors" title="Deactivate">
                                                        <UserX className="w-4 h-4 text-red-600" />
                                                    </button>
                                                )}
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

export default AdminUsers;
