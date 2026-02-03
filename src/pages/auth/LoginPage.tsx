import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, GraduationCap, Users, Shield, ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthStore, UserRole } from '../../store/useAuthStore';
import SuccessModal from '../../components/ui/SuccessModal';
import ForgotPasswordModal from '../../components/ui/ForgotPasswordModal';

const LoginPage = () => {
    const navigate = useNavigate();
    const login = useAuthStore((state) => state.login);
    const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);

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
            setShowSuccessModal(true);
        }
    };

    const handleSuccessModalClose = () => {
        setShowSuccessModal(false);
        if (selectedRole) {
            navigate(`/${selectedRole}/dashboard`);
        }
    };

    return (
        <div className="min-h-screen bg-white flex items-center justify-center p-4 pt-24 md:p-4 relative overflow-hidden">
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
                className="absolute top-4 left-4 md:top-6 md:left-6 z-20 flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg text-sm font-medium text-gray-600 hover:text-[#191A23] hover:border-[#B9FF66] hover:bg-[#B9FF66]/10 transition-all duration-200 group"
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
                                            type={showPassword ? "text" : "password"}
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••"
                                            className="w-full pl-12 pr-12 py-3.5 border-2 border-[#191A23] rounded-xl bg-white text-[#191A23] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#B9FF66] transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#191A23] transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="w-4 h-4 rounded border-2 border-[#191A23] text-[#B9FF66] focus:ring-[#B9FF66]" />
                                        <span className="text-[#191A23]">Remember me</span>
                                    </label>
                                    <button
                                        type="button"
                                        onClick={() => setShowForgotPasswordModal(true)}
                                        className="text-[#191A23] font-semibold hover:text-[#B9FF66] transition-colors"
                                    >
                                        Forgot password?
                                    </button>
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

                            {/* Divider */}
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t-2 border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-white text-gray-500 font-semibold">Or continue with</span>
                                </div>
                            </div>

                            {/* Social Login Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#191A23] rounded-xl bg-white hover:bg-gray-50 transition-all font-semibold text-[#191A23]"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                                    </svg>
                                    <span className="text-sm">Gmail</span>
                                </button>
                                <button
                                    type="button"
                                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-[#191A23] rounded-xl bg-white hover:bg-gray-50 transition-all font-semibold text-[#191A23]"
                                >
                                    <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                                    </svg>
                                    <span className="text-sm">Facebook</span>
                                </button>
                            </div>

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

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={handleSuccessModalClose}
                title="Login Berhasil!"
                message={`Selamat datang! Anda berhasil login sebagai ${selectedRole === 'student' ? 'Student' : selectedRole === 'teacher' ? 'Teacher' : 'Admin'}.`}
            />

            {/* Forgot Password Modal */}
            <ForgotPasswordModal
                isOpen={showForgotPasswordModal}
                onClose={() => setShowForgotPasswordModal(false)}
            />
        </div>
    );
};

export default LoginPage;
