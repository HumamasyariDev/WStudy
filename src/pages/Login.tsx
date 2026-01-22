import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore, UserRole } from '../store/useAuthStore';
import { GraduationCap, BookOpen, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

const Login = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);

    const handleLogin = (role: UserRole) => {
        login(role);
        navigate(`/${role}/dashboard`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#F8F1F1] dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
            {/* Background Decoration */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[600px] h-[600px] rounded-full bg-[#11698E] opacity-5 dark:opacity-10 blur-[100px]"></div>
                <div className="absolute -bottom-[20%] -right-[10%] w-[500px] h-[500px] rounded-full bg-[#16C79A] opacity-5 dark:opacity-10 blur-[100px]"></div>
            </div>

            <div className="z-10 bg-white/80 dark:bg-slate-800/80 backdrop-blur-lg p-8 rounded-3xl shadow-xl border border-white dark:border-slate-700 max-w-2xl w-full text-center transition-colors duration-300">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="flex justify-center mb-6">
                        <img src="/logo_transparent.png" alt="WStudy Logo" className="w-24 h-24 object-contain drop-shadow-md dark:brightness-0 dark:invert" />
                    </div>
                    <h1 className="text-4xl font-bold text-[#19456B] dark:text-white mb-2 font-lexend">Welcome to WStudy</h1>
                    <p className="text-gray-500 dark:text-gray-400 mb-8 font-jakarta">Select your role to simulate the experience</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <RoleCard
                        role="student"
                        title="Student"
                        icon={<BookOpen size={24} />}
                        color="bg-[#16C79A]"
                        onClick={() => handleLogin('student')}
                        delay={0.1}
                    />
                    <RoleCard
                        role="teacher"
                        title="Teacher"
                        icon={<GraduationCap size={24} />}
                        color="bg-[#11698E]"
                        onClick={() => handleLogin('teacher')}
                        delay={0.2}
                    />
                    <RoleCard
                        role="admin"
                        title="Admin"
                        icon={<ShieldCheck size={24} />}
                        color="bg-[#19456B]"
                        onClick={() => handleLogin('admin')}
                        delay={0.3}
                    />
                </div>
            </div>
        </div>
    );
};

const RoleCard = ({ role, title, icon, color, onClick, delay }: { role: string, title: string, icon: React.ReactNode, color: string, onClick: () => void, delay: number }) => {
    return (
        <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay, duration: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            className="flex flex-col items-center p-6 rounded-2xl bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 shadow-md hover:shadow-xl transition-all group"
        >
            <div className={`${color} text-white w-14 h-14 rounded-full flex items-center justify-center mb-4 shadow-md group-hover:rotate-12 transition-transform`}>
                {icon}
            </div>
            <span className="font-bold text-lg text-[#19456B] dark:text-white">{title}</span>
            <span className="text-xs text-gray-400 mt-2">Login as {title}</span>
        </motion.button>
    )
}

export default Login;
