import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SuccessModal from '../../components/ui/SuccessModal';
import WarningModal from '../../components/ui/WarningModal';
import { ArrowLeft, Upload, Plus, X, Save } from 'lucide-react';

const CourseCreator = () => {
    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState('');
    const [modules, setModules] = useState([{ id: 1, title: '', lessons: 0 }]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');

    const addModule = () => {
        setModules([...modules, { id: modules.length + 1, title: '', lessons: 0 }]);
    };

    const removeModule = (id: number) => {
        setModules(modules.filter(m => m.id !== id));
    };

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden max-w-5xl mx-auto">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/teacher/dashboard')}
                        className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#191A23]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-2xl md:text-3xl font-bold text-[#191A23] font-geist">Create New Course</h1>
                        <p className="text-sm text-gray-600">Build an engaging course for your students</p>
                    </div>
                    <button
                        onClick={() => {
                            if (!courseTitle || !courseDescription || !category || !duration) {
                                setWarningMessage('Please fill in all required fields before saving.');
                                setShowWarningModal(true);
                                return;
                            }
                            setShowSuccessModal(true);
                        }}
                        className="px-6 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center gap-2"
                    >
                        <Save className="w-5 h-5" />
                        Save Course
                    </button>
                </div>

                {/* Course Basic Info */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-xl font-bold text-[#191A23] font-geist mb-4">Course Information</h2>

                    <div className="space-y-4">
                        {/* Course Title */}
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Course Title</label>
                            <input
                                type="text"
                                value={courseTitle}
                                onChange={(e) => setCourseTitle(e.target.value)}
                                placeholder="e.g., Advanced Calculus"
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Course Description */}
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Description</label>
                            <textarea
                                value={courseDescription}
                                onChange={(e) => setCourseDescription(e.target.value)}
                                placeholder="Describe what students will learn..."
                                rows={4}
                                className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all resize-none placeholder:text-gray-400"
                            />
                        </div>

                        {/* Category & Duration */}
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-[#191A23] mb-2">Category</label>
                                <select
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all"
                                >
                                    <option value="">Select category</option>
                                    <option value="mathematics">Mathematics</option>
                                    <option value="science">Science</option>
                                    <option value="language">Language</option>
                                    <option value="technology">Technology</option>
                                    <option value="arts">Arts</option>
                                    <option value="history">History</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-[#191A23] mb-2">Duration</label>
                                <input
                                    type="text"
                                    value={duration}
                                    onChange={(e) => setDuration(e.target.value)}
                                    placeholder="e.g., 12 weeks"
                                    className="w-full px-4 py-3 bg-[#F3F3F3] text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all placeholder:text-gray-400"
                                />
                            </div>
                        </div>

                        {/* Thumbnail Upload */}
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Course Thumbnail</label>
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#191A23] transition-colors cursor-pointer">
                                <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                                <p className="text-xs text-gray-400">PNG, JPG up to 10MB</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Course Modules */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-[#191A23] font-geist">Course Modules</h2>
                        <button
                            onClick={addModule}
                            className="px-4 py-2 bg-[#B9FF66] text-[#191A23] rounded-lg font-semibold hover:bg-[#a8ee55] transition-colors flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Add Module
                        </button>
                    </div>

                    <div className="space-y-3">
                        {modules.map((module, idx) => (
                            <div key={module.id} className="flex flex-wrap items-center gap-3 p-4 bg-[#F3F3F3] rounded-xl">
                                <div className="w-8 h-8 bg-[#191A23] text-[#B9FF66] rounded-lg flex items-center justify-center font-bold flex-shrink-0">
                                    {idx + 1}
                                </div>
                                <input
                                    type="text"
                                    placeholder="Module title"
                                    className="flex-1 min-w-[150px] px-4 py-2 bg-white text-[#191A23] rounded-lg border-2 border-transparent focus:border-[#191A23] outline-none transition-all placeholder:text-gray-400"
                                />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        placeholder="Lessons"
                                        className="w-20 px-3 py-2 bg-white text-[#191A23] rounded-lg border-2 border-transparent focus:border-[#191A23] outline-none transition-all placeholder:text-gray-400 text-sm"
                                    />
                                    {modules.length > 1 && (
                                        <button
                                            onClick={() => removeModule(module.id)}
                                            className="p-2 hover:bg-red-100 rounded-lg transition-colors flex-shrink-0"
                                        >
                                            <X className="w-5 h-5 text-red-600" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Preview */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-sm"
                >
                    <h2 className="text-xl font-bold text-[#191A23] font-geist mb-4">Preview</h2>
                    <div className="border-2 border-gray-200 rounded-xl p-6">
                        <h3 className="text-2xl font-bold text-[#191A23] mb-2">{courseTitle || 'Course Title'}</h3>
                        <p className="text-gray-600 mb-4">{courseDescription || 'Course description will appear here...'}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                            <span className="px-3 py-1 bg-[#F3F3F3] rounded-full text-[#191A23] font-semibold">
                                {category || 'Category'}
                            </span>
                            <span className="px-3 py-1 bg-[#F3F3F3] rounded-full text-[#191A23] font-semibold">
                                {duration || 'Duration'}
                            </span>
                            <span className="px-3 py-1 bg-[#F3F3F3] rounded-full text-[#191A23] font-semibold">
                                {modules.length} modules
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Success Modal */}
            <SuccessModal
                isOpen={showSuccessModal}
                onClose={() => {
                    setShowSuccessModal(false);
                    navigate('/teacher/dashboard');
                }}
                title="Course Created!"
                message="Your course has been saved successfully. Students can now enroll in your course."
                buttonText="Back to Dashboard"
            />

            {/* Warning Modal */}
            <WarningModal
                isOpen={showWarningModal}
                onClose={() => setShowWarningModal(false)}
                title="Missing Information"
                message={warningMessage}
                buttonText="Got it"
            />
        </DashboardLayout>
    );
};

export default CourseCreator;
