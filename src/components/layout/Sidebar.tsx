import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/useAuthStore';
import { LayoutDashboard, BookOpen, FileText, CheckCircle, Users, Settings, LogOut } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const { user, logout } = useAuthStore();
    const location = useLocation();
    const [isMobile, setIsMobile] = React.useState(window.innerWidth < 768);

    React.useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const studentLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/student/dashboard' },
        { icon: BookOpen, label: 'My Courses', path: '/student/courses' },
        { icon: FileText, label: 'Quizzes', path: '/student/quizzes' },
        { icon: CheckCircle, label: 'Certificates', path: '/student/certificates' },
    ];

    const teacherLinks = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/teacher/dashboard' },
        { icon: BookOpen, label: 'Course Creator', path: '/teacher/create-course' },
        { icon: FileText, label: 'Quiz Builder', path: '/teacher/quiz-builder' },
        { icon: Users, label: 'Students', path: '/teacher/students' },
    ];

    const adminLinks = [
        { icon: LayoutDashboard, label: 'Overview', path: '/admin/dashboard' },
        { icon: BookOpen, label: 'All Courses', path: '/admin/courses' },
        { icon: Users, label: 'Users', path: '/admin/users' },
        { icon: Settings, label: 'Settings', path: '/admin/settings' },
    ];

    const links = user?.role === 'teacher' ? teacherLinks : user?.role === 'admin' ? adminLinks : studentLinks;

    return (
        <>
            {/* Mobile Backdrop */}
            {isOpen && isMobile && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
                    onClick={onClose}
                />
            )}

            <motion.aside
                initial={false}
                animate={{ x: isMobile ? (isOpen ? 0 : '-100%') : 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col transition-colors duration-300 shadow-sm",
                )}
            >
                <div className="p-6 flex items-center justify-between border-b border-gray-200">
                    <div className="flex items-center w-full h-12 object-cover object-left">
                        <img
                            src="/logo_text_transparent.png"
                            alt="WStudy"
                            className="w-full h-12 object-cover object-left"
                        />
                    </div>
                    {/* Close button for mobile */}
                    <button onClick={onClose} className="p-2 md:hidden text-gray-600 hover:text-[#191A23]">
                        <LogOut className="rotate-180" size={24} />
                    </button>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                    {links.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                            <NavLink
                                key={link.path}
                                to={link.path}
                                onClick={() => window.innerWidth < 768 && onClose()}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group text-sm font-medium",
                                    isActive
                                        ? "bg-[#B9FF66] text-[#191A23]"
                                        : "text-gray-700 hover:bg-gray-50"
                                )}
                            >
                                <link.icon size={20} className={cn(isActive ? "text-[#191A23]" : "text-gray-400 group-hover:text-gray-600")} />
                                {link.label}
                            </NavLink>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-200">
                    <div className="bg-gray-50 rounded-2xl p-4 mb-3 flex items-center gap-3">
                        <img src={user?.avatar} alt="Profile" className="w-12 h-12 rounded-full" />
                        <div className="overflow-hidden flex-1">
                            <p className="text-sm font-bold text-gray-800 truncate">{user?.name}</p>
                            <p className="text-xs text-gray-600 capitalize">{user?.role}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => logout()}
                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl transition-colors text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </motion.aside>
        </>
    );
};

export default Sidebar;
