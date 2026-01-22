import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, GraduationCap, Users, Shield, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/useAuthStore';

const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const roles: Array<{
        id: UserRole;
        title: string;
        icon: any;
        description: string;
        bg: string;
        textBg: string;
    }> = [
            {
                id: 'student',
                title: 'Student',
                icon: GraduationCap,
                description: 'Access courses and quizzes',
                bg: 'bg-[#B9FF66]',
                textBg: 'bg-white'
            },
            {
                id: 'teacher',
                title: 'Teacher',
                icon: Users,
                description: 'Manage courses and students',
                bg: 'bg-white',
                textBg: 'bg-[#B9FF66]'
            },
            {
                id: 'admin',
                title: 'Admin',
                icon: Shield,
                description: 'Full system access',
                bg: 'bg-[#F3F3F3]',
                textBg: 'bg-[#B9FF66]'
            },
        ];

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedRole) {
            login(selectedRole);
            navigate(`/${selectedRole}/dashboard`);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 relative overflow-hidden">
            {/* Background dots pattern */}
            <div
                className="absolute inset-0 opacity-30"
                style={{
                    backgroundImage: 'radial-gradient(circle, #191A23 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />
            {/* Back to Home Button */}
            <Link
                to="/"
                className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-[#191A23] hover:border-[#B9FF66] hover:bg-[#B9FF66]/10 transition-all duration-200 group"
            >
                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to Home
            </Link>

            {/* Decorative elements */}
            <motion.div
                className="absolute top-20 left-10 w-16 h-16 bg-[#B9FF66] rounded-full opacity-40"
                animate={{ y: [0, -20, 0], scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute bottom-20 right-10 w-12 h-12 bg-[#B9FF66] rounded-lg rotate-12 opacity-40"
                animate={{ y: [0, 20, 0], rotate: [12, 24, 12] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
            />

            <div className="max-w-6xl w-full relative z-10">
                <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
                    {/* Left side - Branding */}
                    <motion.div
                        className="text-center md:text-left"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center gap-3 mb-6 justify-center md:justify-start">
                            <img
                                src="/logo_transparent.png"
                                alt="WStudy Logo"
                                className="w-12 h-12 object-contain"
                            />
                            <span className="text-3xl font-bold font-geist text-[#191A23]">WStudy</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-geist text-[#191A23] mb-6">
                            Welcome <span className="bg-[#B9FF66] px-3 py-1 rounded-lg">Back</span>
                        </h1>
                        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                            Sign in to continue your learning journey and access thousands of interactive courses.
                        </p>

                        {/* Features list */}
                        <div className="space-y-3 hidden md:block">
                            {['Track your progress', 'Access all courses', 'Join live sessions'].map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-center gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                                >
                                    <div className="w-6 h-6 rounded-full bg-[#B9FF66] flex items-center justify-center">
                                        <svg className="w-4 h-4 text-[#191A23]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-[#191A23] font-medium">{feature}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right side - Login form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="bg-white border-2 border-[#191A23] rounded-[32px] p-8 md:p-10 shadow-[0_8px_0_#191A23]">
                            <h2 className="text-2xl md:text-3xl font-bold font-geist text-[#191A23] mb-2">
                                Sign In
                            </h2>
                            <p className="text-gray-600 mb-8">Choose your role to continue</p>

                            {/* Role selection */}
                            <div className="grid grid-cols-3 gap-3 mb-8">
                                {roles.map((role) => {
                                    const Icon = role.icon;
                                    const isSelected = selectedRole === role.id;
                                    return (
                                        <motion.button
                                            key={role.id}
                                            onClick={() => setSelectedRole(role.id)}
                                            className={`${isSelected ? role.bg : 'bg-[#F3F3F3]'} border-2 ${isSelected ? 'border-[#191A23]' : 'border-transparent'} rounded-2xl p-4 flex flex-col items-center gap-2 transition-all hover:border-[#191A23] ${isSelected ? 'shadow-[0_4px_0_#191A23]' : ''}`}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <Icon className={`w-6 h-6 ${isSelected ? 'text-[#191A23]' : 'text-gray-500'}`} />
                                            <span className={`text-xs font-semibold ${isSelected ? 'text-[#191A23]' : 'text-gray-600'}`}>
                                                {role.title}
                                            </span>
                                        </motion.button>
                                    );
                                })}
                            </div>

                            {/* Login form */}
                            <form onSubmit={handleLogin} className="space-y-5">
                                <div>
                                    <label className="block text-sm font-semibold text-[#191A23] mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="your.email@example.com"
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-[#191A23] rounded-xl bg-white text-[#191A23] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-[#191A23] mb-2">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-4 py-3.5 border-2 border-[#191A23] rounded-xl bg-white text-[#191A23] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-2 border-[#191A23] text-[#B9FF66] focus:ring-[#B9FF66]" />
                                        <span className="text-[#191A23]">Remember me</span>
                                    </label>
                                    <a href="#" className="text-[#191A23] font-semibold hover:text-[#B9FF66] transition-colors">
                                        Forgot password?
                                    </a>
                                </div>

                                <motion.button
                                    type="submit"
                                    disabled={!selectedRole}
                                    className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${selectedRole
                                        ? 'bg-[#191A23] text-[#B9FF66] hover:bg-[#2a2b3a] shadow-[0_4px_0_#B9FF66]'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                        }`}
                                    whileHover={selectedRole ? { y: -2 } : {}}
                                    whileTap={selectedRole ? { y: 0 } : {}}
                                >
                                    Sign In
                                </motion.button>
                            </form>

                            <div className="mt-6 text-center">
                                <p className="text-gray-600">
                                    Don't have an account?{' '}
                                    <a href="/signup" className="text-[#191A23] font-bold hover:text-[#B9FF66] transition-colors">
                                        Sign Up
                                    </a>
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
