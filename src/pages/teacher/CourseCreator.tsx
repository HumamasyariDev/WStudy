import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import SuccessModal from '../../components/ui/SuccessModal';
import WarningModal from '../../components/ui/WarningModal';
import AiPromptModal from '../../components/ui/AiPromptModal';
import { ArrowLeft, Upload, Plus, X, Save, BookOpen, Wand2, Loader2 } from 'lucide-react';
import { generateCourseWithAI as generateWithAI } from '../../services/aiService';

const CourseCreator = () => {
    const navigate = useNavigate();
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [category, setCategory] = useState('');
    const [duration, setDuration] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [modules, setModules] = useState([{ id: 1, title: '', lessons: 0 }]);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showWarningModal, setShowWarningModal] = useState(false);
    const [warningMessage, setWarningMessage] = useState('');
    const [aiPrompt, setAiPrompt] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showAiSection, setShowAiSection] = useState(false);
    const [showAiPromptModal, setShowAiPromptModal] = useState(false);
    const [showAiPage, setShowAiPage] = useState(false);

    useEffect(() => {
        // Show AI prompt modal on page load
        setShowAiPromptModal(true);
    }, []);

    const addModule = () => {
        setModules([...modules, { id: modules.length + 1, title: '', lessons: 0 }]);
    };

    const removeModule = (id: number) => {
        setModules(modules.filter(m => m.id !== id));
    };

    const generateCourseWithAI = async () => {
        if (!aiPrompt.trim()) {
            setWarningMessage('Please enter a course description for AI to generate.');
            setShowWarningModal(true);
            return;
        }

        setIsGenerating(true);

        try {
            // Call real AI service
            const result = await generateWithAI(aiPrompt);
            
            // Set generated data
            setCourseTitle(result.title);
            setCourseDescription(result.description);
            setCategory(result.category);
            setDuration(result.duration);
            setThumbnail(result.thumbnail);
            setModules(result.modules);
            
            setIsGenerating(false);
            setShowAiPage(false);
            setShowAiSection(false);
        } catch (error) {
            setIsGenerating(false);
            setWarningMessage(error instanceof Error ? error.message : 'Failed to generate course. Please try again.');
            setShowWarningModal(true);
        }
    };

    return (
        <DashboardLayout>
            {/* AI Prompt Modal */}
            <AiPromptModal
                isOpen={showAiPromptModal}
                onClose={() => setShowAiPromptModal(false)}
                onUseAI={() => {
                    setShowAiPromptModal(false);
                    setShowAiPage(true);
                }}
                onCreateManually={() => {
                    setShowAiPromptModal(false);
                    setShowAiPage(false);
                }}
                title="Create Course with AI"
                description="Let AI help you create a complete course structure in seconds"
            />

            {/* AI Generation Page */}
            {showAiPage ? (
                <div className="min-h-screen bg-white p-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <button
                                onClick={() => setShowAiPage(false)}
                                className="flex items-center gap-2 text-gray-600 hover:text-[#191A23] mb-6 transition-colors"
                            >
                                <ArrowLeft className="w-5 h-5" />
                                <span>Back</span>
                            </button>
                            <h1 className="text-3xl font-bold text-[#191A23] mb-2">Quick Course Builder</h1>
                            <p className="text-gray-600">Tell us about your course and we'll create the structure for you</p>
                        </div>

                        {/* Form */}
                        <div className="bg-white rounded-xl border border-gray-200 p-8">
                            <div className="space-y-6">
                                {/* Prompt Input */}
                                <div>
                                    <label className="block text-sm font-semibold text-[#191A23] mb-2">
                                        Course Description
                                    </label>
                                    <textarea
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        placeholder="Example: A comprehensive web development course covering HTML, CSS, JavaScript, React, and building real-world projects. Include modules on responsive design, API integration, and deployment..."
                                        rows={6}
                                        disabled={isGenerating}
                                        className="w-full px-4 py-3 bg-white text-[#191A23] rounded-lg border border-gray-300 focus:border-[#191A23] focus:ring-2 focus:ring-[#191A23]/10 outline-none transition-all resize-none placeholder:text-gray-400 disabled:opacity-50 text-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-2">Include topics, target audience, and learning objectives for best results</p>
                                </div>

                                {/* Action Button */}
                                <div className="flex justify-end">
                                    <button
                                        onClick={generateCourseWithAI}
                                        disabled={isGenerating || !aiPrompt.trim()}
                                        className="px-6 py-3 bg-[#191A23] text-white rounded-lg font-semibold hover:bg-[#2a2b3a] transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                <span>Creating...</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>Create Course Structure</span>
                                            </>
                                        )}
                                    </button>
                                </div>

                                {/* Loading State */}
                                {isGenerating && (
                                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="w-5 h-5 text-[#191A23] animate-spin" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#191A23]">Creating course structure...</p>
                                                <p className="text-xs text-gray-600">This may take a few moments</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
            <div className="space-y-6 max-w-5xl mx-auto">
                {/* AI Generation Section */}
                {showAiSection && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-br from-[#B9FF66] via-[#a8ee55] to-[#B9FF66] rounded-2xl p-8 shadow-xl relative overflow-hidden"
                    >
                        {/* Animated Background */}
                        <div className="absolute inset-0 opacity-20">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute bottom-0 left-0 w-48 h-48 bg-[#191A23] rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                        </div>

                        <div className="relative z-10">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-3 bg-[#191A23] rounded-xl">
                                    <BookOpen className="w-6 h-6 text-[#B9FF66]" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-[#191A23] font-geist">AI Course Generator</h2>
                                    <p className="text-sm text-[#191A23]/80">Let AI create your course structure instantly</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-[#191A23] mb-2">Describe your course idea</label>
                                    <textarea
                                        value={aiPrompt}
                                        onChange={(e) => setAiPrompt(e.target.value)}
                                        placeholder="e.g., A comprehensive course on web development covering HTML, CSS, JavaScript, React, and modern frameworks..."
                                        rows={3}
                                        disabled={isGenerating}
                                        className="w-full px-4 py-3 bg-white text-[#191A23] rounded-xl border-2 border-transparent focus:border-[#191A23] outline-none transition-all resize-none placeholder:text-gray-400 disabled:opacity-50"
                                    />
                                </div>

                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={generateCourseWithAI}
                                        disabled={isGenerating}
                                        className="px-8 py-3 bg-[#191A23] text-[#B9FF66] rounded-xl font-bold hover:bg-[#2a2b3a] transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                                    >
                                        {isGenerating ? (
                                            <>
                                                <Loader2 className="w-5 h-5 animate-spin" />
                                                Generating...
                                            </>
                                        ) : (
                                            <>
                                                <Wand2 className="w-5 h-5" />
                                                Generate with AI
                                            </>
                                        )}
                                    </button>
                                    <button
                                        onClick={() => setShowAiSection(false)}
                                        disabled={isGenerating}
                                        className="px-6 py-3 bg-white text-[#191A23] rounded-xl font-semibold hover:bg-gray-50 transition-colors disabled:opacity-50"
                                    >
                                        Create Manually
                                    </button>
                                </div>

                                {isGenerating && (
                                    <div className="bg-white/50 backdrop-blur-sm rounded-xl p-4">
                                        <div className="flex items-center gap-3">
                                            <Loader2 className="w-5 h-5 text-[#191A23] animate-spin" />
                                            <div>
                                                <p className="text-sm font-semibold text-[#191A23]">AI is working its magic...</p>
                                                <p className="text-xs text-[#191A23]/70">Generating course structure, modules, and content</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}

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
                        <p className="text-sm text-gray-600">
                            {showAiSection ? 'Use AI or build manually' : 'Build an engaging course for your students'}
                        </p>
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

                        {/* Thumbnail Display */}
                        <div>
                            <label className="block text-sm font-semibold text-[#191A23] mb-2">Course Thumbnail</label>
                            {thumbnail ? (
                                <div className="relative rounded-xl overflow-hidden border-2 border-gray-200" style={{ aspectRatio: '16/9' }}>
                                    <img 
                                        src={thumbnail} 
                                        alt="Course thumbnail" 
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-2 right-2 bg-[#B9FF66] text-[#191A23] px-3 py-1 rounded-lg text-xs font-semibold">
                                        AI Generated
                                    </div>
                                </div>
                            ) : (
                                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center" style={{ aspectRatio: '16/9' }}>
                                    <div className="flex flex-col items-center justify-center h-full">
                                        <Upload className="w-12 h-12 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-600 mb-1">Thumbnail will be auto-generated by AI</p>
                                        <p className="text-xs text-gray-400">16:9 YouTube-style format</p>
                                    </div>
                                </div>
                            )}
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
                                    value={module.title}
                                    onChange={(e) => {
                                        const newModules = [...modules];
                                        newModules[idx].title = e.target.value;
                                        setModules(newModules);
                                    }}
                                    placeholder="Module title"
                                    className="flex-1 min-w-[150px] px-4 py-2 bg-white text-[#191A23] rounded-lg border-2 border-transparent focus:border-[#191A23] outline-none transition-all placeholder:text-gray-400"
                                />
                                <div className="flex items-center gap-2">
                                    <input
                                        type="number"
                                        value={module.lessons || ''}
                                        onChange={(e) => {
                                            const newModules = [...modules];
                                            newModules[idx].lessons = parseInt(e.target.value) || 0;
                                            setModules(newModules);
                                        }}
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
            )}

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
