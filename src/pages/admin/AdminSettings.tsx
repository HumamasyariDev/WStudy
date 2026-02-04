import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SuccessModal from '../../components/ui/SuccessModal';
import { ArrowLeft, Settings, Bell, Shield, Globe, Save, ToggleLeft, ToggleRight } from 'lucide-react';

const AdminSettings = () => {
    const navigate = useNavigate();
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Settings state
    const [settings, setSettings] = useState({
        siteName: 'WStudy',
        siteDescription: 'Modern Learning Management System',
        allowRegistration: true,
        requireEmailVerification: true,
        allowTeacherRegistration: false,
        maintenanceMode: false,
        emailNotifications: true,
        pushNotifications: true,
        defaultLanguage: 'en',
        timezone: 'Asia/Jakarta',
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleSave = () => {
        setShowSuccessModal(true);
    };

    const ToggleSwitch = ({ enabled, onToggle }: { enabled: boolean; onToggle: () => void }) => (
        <button onClick={onToggle} className="relative">
            {enabled ? (
                <ToggleRight className="w-10 h-10 text-[#B9FF66]" />
            ) : (
                <ToggleLeft className="w-10 h-10 text-gray-300" />
            )}
        </button>
    );

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/admin/dashboard')}
                        className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#191A23]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#191A23] font-geist">Settings</h1>
                        <p className="text-sm text-gray-600">Configure platform settings and preferences</p>
                    </div>
                    <button
                        onClick={handleSave}
                        className="px-6 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Save Changes
                    </button>
                </div>

                {/* General Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-[#B9FF66] rounded-xl flex items-center justify-center">
                            <Settings className="w-5 h-5 text-[#191A23]" />
                        </div>
                        <h2 className="text-xl font-bold text-[#191A23] font-geist">General Settings</h2>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Site Name</label>
                            <input
                                type="text"
                                value={settings.siteName}
                                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Site Description</label>
                            <textarea
                                value={settings.siteDescription}
                                onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                                rows={3}
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all resize-none"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Registration Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                            <Shield className="w-5 h-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold text-[#191A23] font-geist">Registration & Security</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl">
                            <div>
                                <p className="font-semibold text-[#191A23]">Allow New Registrations</p>
                                <p className="text-sm text-gray-600">Allow new users to create accounts</p>
                            </div>
                            <ToggleSwitch enabled={settings.allowRegistration} onToggle={() => handleToggle('allowRegistration')} />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl">
                            <div>
                                <p className="font-semibold text-[#191A23]">Require Email Verification</p>
                                <p className="text-sm text-gray-600">Users must verify email before accessing platform</p>
                            </div>
                            <ToggleSwitch enabled={settings.requireEmailVerification} onToggle={() => handleToggle('requireEmailVerification')} />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl">
                            <div>
                                <p className="font-semibold text-[#191A23]">Allow Teacher Self-Registration</p>
                                <p className="text-sm text-gray-600">Allow users to register as teachers directly</p>
                            </div>
                            <ToggleSwitch enabled={settings.allowTeacherRegistration} onToggle={() => handleToggle('allowTeacherRegistration')} />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl">
                            <div>
                                <p className="font-semibold text-[#191A23]">Maintenance Mode</p>
                                <p className="text-sm text-gray-600">Put site in maintenance mode (admins only)</p>
                            </div>
                            <ToggleSwitch enabled={settings.maintenanceMode} onToggle={() => handleToggle('maintenanceMode')} />
                        </div>
                    </div>
                </motion.div>

                {/* Notification Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                            <Bell className="w-5 h-5 text-purple-600" />
                        </div>
                        <h2 className="text-xl font-bold text-[#191A23] font-geist">Notifications</h2>
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl">
                            <div>
                                <p className="font-semibold text-[#191A23]">Email Notifications</p>
                                <p className="text-sm text-gray-600">Send notifications via email</p>
                            </div>
                            <ToggleSwitch enabled={settings.emailNotifications} onToggle={() => handleToggle('emailNotifications')} />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-[#F3F3F3] rounded-xl">
                            <div>
                                <p className="font-semibold text-[#191A23]">Push Notifications</p>
                                <p className="text-sm text-gray-600">Send browser push notifications</p>
                            </div>
                            <ToggleSwitch enabled={settings.pushNotifications} onToggle={() => handleToggle('pushNotifications')} />
                        </div>
                    </div>
                </motion.div>

                {/* Localization Settings */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                            <Globe className="w-5 h-5 text-green-600" />
                        </div>
                        <h2 className="text-xl font-bold text-[#191A23] font-geist">Localization</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Default Language</label>
                            <select
                                value={settings.defaultLanguage}
                                onChange={(e) => setSettings(prev => ({ ...prev, defaultLanguage: e.target.value }))}
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                            >
                                <option value="en">English</option>
                                <option value="id">Indonesian</option>
                                <option value="es">Spanish</option>
                                <option value="fr">French</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Timezone</label>
                            <select
                                value={settings.timezone}
                                onChange={(e) => setSettings(prev => ({ ...prev, timezone: e.target.value }))}
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                            >
                                <option value="Asia/Jakarta">Asia/Jakarta (WIB)</option>
                                <option value="Asia/Singapore">Asia/Singapore</option>
                                <option value="America/New_York">America/New York</option>
                                <option value="Europe/London">Europe/London</option>
                            </select>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                title="Settings Saved!"
                message="Your platform settings have been updated successfully."
                buttonText="Continue"
            />
        </DashboardLayout>
    );
};

export default AdminSettings;
