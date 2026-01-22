
import DashboardLayout from '../../components/layout/DashboardLayout';
import Card from '../../components/ui/Card';

import { Users, BookOpen, TrendingUp, Settings, ShieldCheck } from 'lucide-react';

const AdminDashboard = () => {
    // const { user } = useAuthStore();

    return (
        <DashboardLayout>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Welcome & Overview */}
                <div className="col-span-1 md:col-span-2 lg:col-span-4 mb-2">
                    <h1 className="text-3xl font-bold text-[#19456B] dark:text-white font-lexend">Admin Overview</h1>
                    <p className="text-gray-500 dark:text-gray-400">Manage your platform users and courses.</p>
                </div>

                {/* Stats Cards - Expanded */}
                <Card delay={0.1} className="col-span-1 md:col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 border dark:border-slate-800 text-[#19456B] dark:text-white">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-blue-50 dark:bg-slate-800 rounded-xl text-[#11698E] dark:text-blue-400">
                            <Users size={24} />
                        </div>
                        <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg">
                            +12% <TrendingUp size={12} className="ml-1" />
                        </span>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-4xl font-bold font-lexend">2,543</h3>
                        <p className="text-base text-gray-400">Total Users</p>
                    </div>
                </Card>

                <Card delay={0.2} className="col-span-1 md:col-span-1 lg:col-span-2 bg-white dark:bg-slate-900 border dark:border-slate-800 text-[#19456B] dark:text-white">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 bg-green-50 dark:bg-slate-800 rounded-xl text-[#16C79A]">
                            <BookOpen size={24} />
                        </div>
                        <span className="flex items-center text-xs font-bold text-green-500 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg">
                            +5% <TrendingUp size={12} className="ml-1" />
                        </span>
                    </div>
                    <div className="mt-2">
                        <h3 className="text-4xl font-bold font-lexend">156</h3>
                        <p className="text-base text-gray-400">Active Courses</p>
                    </div>
                </Card>


                {/* Main Content Area */}

                {/* Newest Members */}
                <Card delay={0.3} className="col-span-1 md:col-span-2 lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-[#19456B] dark:text-white">Newest Members</h3>
                        <button className="text-sm text-[#11698E] dark:text-blue-400 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 overflow-hidden">
                                        <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=user${i}`} alt="User" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#19456B] dark:text-white">User Name {i}</p>
                                        <p className="text-xs text-gray-400">Student • 2 mins ago</p>
                                    </div>
                                </div>
                                <span className="text-xs font-medium text-green-600 bg-green-50 dark:bg-green-900/30 px-2 py-1 rounded-lg">Active</span>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Recent Courses List (Replaces Chart) */}
                <Card delay={0.4} className="col-span-1 md:col-span-2 lg:col-span-2">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-[#19456B] dark:text-white">Recent Courses</h3>
                        <button className="text-sm text-[#11698E] dark:text-blue-400 hover:underline">View All</button>
                    </div>
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl transition-colors cursor-pointer border border-transparent hover:border-gray-100 dark:hover:border-slate-700">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-lg bg-blue-50 dark:bg-slate-800 flex items-center justify-center text-[#11698E] dark:text-blue-400">
                                        <BookOpen size={20} />
                                    </div>
                                    <div>
                                        <p className="text-sm font-bold text-[#19456B] dark:text-white">Web Development {i}</p>
                                        <p className="text-xs text-gray-400">Updated 1 hour ago</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-xs font-bold text-[#19456B] dark:text-white">{10 + i} Students</p>
                                    <p className="text-[10px] text-gray-400">Published</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Quick Actions - Full width bottom */}
                <Card delay={0.5} className="col-span-1 md:col-span-2 lg:col-span-4">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-[#19456B] dark:text-white">Quick Actions</h3>
                        <Settings size={18} className="text-gray-400" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 hover:border-[#11698E] hover:bg-blue-50 dark:hover:bg-slate-800 transition-all group">
                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-slate-800 text-[#11698E] dark:text-blue-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <ShieldCheck size={20} />
                            </div>
                            <span className="text-sm font-bold text-[#19456B] dark:text-white">Verify Teachers</span>
                        </button>
                        <button className="p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 hover:border-[#11698E] hover:bg-blue-50 dark:hover:bg-slate-800 transition-all group">
                            <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-slate-800 text-purple-600 dark:text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <BookOpen size={20} />
                            </div>
                            <span className="text-sm font-bold text-[#19456B] dark:text-white">Review Courses</span>
                        </button>
                        <button className="p-4 rounded-xl border-2 border-dashed border-gray-200 dark:border-slate-700 flex flex-col items-center justify-center gap-2 hover:border-[#11698E] hover:bg-blue-50 dark:hover:bg-slate-800 transition-all group">
                            <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-slate-800 text-green-600 dark:text-green-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                <Users size={20} />
                            </div>
                            <span className="text-sm font-bold text-[#19456B] dark:text-white">Manage Users</span>
                        </button>
                    </div>
                </Card>

            </div>
        </DashboardLayout >
    );
};

export default AdminDashboard;
