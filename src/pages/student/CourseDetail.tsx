import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { ArrowLeft, Play, CheckCircle, Clock, Lock, BookOpen, Download, Share2, ChevronRight, ChevronDown } from 'lucide-react';

const CourseDetail = () => {
    const navigate = useNavigate();
    const { courseId } = useParams();
    const [activeLesson, setActiveLesson] = useState(0);
    const [expandedModule, setExpandedModule] = useState(0);

    // Mock course data
    const course = {
        id: courseId,
        title: 'Advanced Calculus',
        instructor: 'Dr. Sarah Johnson',
        progress: 68,
        totalLessons: 48,
        completedLessons: 33,
        duration: '12 weeks',
        modules: [
            {
                id: 1,
                title: 'Introduction to Calculus',
                lessons: [
                    { id: 1, title: 'What is Calculus?', duration: '12:30', completed: true, locked: false },
                    { id: 2, title: 'Basic Concepts', duration: '15:45', completed: true, locked: false },
                    { id: 3, title: 'Practice Problems', duration: '20:00', completed: true, locked: false },
                ]
            },
            {
                id: 2,
                title: 'Derivatives and Limits',
                lessons: [
                    { id: 4, title: 'Understanding Derivatives', duration: '18:20', completed: true, locked: false },
                    { id: 5, title: 'Limit Theorems', duration: '22:15', completed: false, locked: false },
                    { id: 6, title: 'Advanced Applications', duration: '25:30', completed: false, locked: false },
                ]
            },
            {
                id: 3,
                title: 'Integration Techniques',
                lessons: [
                    { id: 7, title: 'Basic Integration', duration: '16:40', completed: false, locked: false },
                    { id: 8, title: 'Integration by Parts', duration: '19:50', completed: false, locked: false },
                    { id: 9, title: 'Substitution Method', duration: '21:00', completed: false, locked: true },
                ]
            },
        ]
    };

    const currentLesson = course.modules
        .flatMap(m => m.lessons)
        .find((_, idx) => idx === activeLesson) || course.modules[0].lessons[0];

    const allLessons = course.modules.flatMap(m => m.lessons);

    return (
        <DashboardLayout>
            <div className="space-y-4 overflow-x-hidden">
                {/* Header */}
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/student/courses')}
                        className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5 text-[#191A23]" />
                    </button>
                    <div className="flex-1">
                        <h1 className="text-xl md:text-2xl font-bold text-[#191A23] font-geist">{course.title}</h1>
                        <p className="text-sm text-gray-600">{course.instructor}</p>
                    </div>
                    <div className="hidden md:flex items-center gap-2">
                        <button className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors">
                            <Share2 className="w-5 h-5 text-[#191A23]" />
                        </button>
                        <button className="p-2 hover:bg-[#F3F3F3] rounded-lg transition-colors">
                            <Download className="w-5 h-5 text-[#191A23]" />
                        </button>
                    </div>
                </div>

                {/* Progress Bar */}
                <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-semibold text-[#191A23]">Course Progress</span>
                        <span className="text-sm font-bold text-[#191A23]">{course.progress}%</span>
                    </div>
                    <div className="w-full h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                        <div 
                            className="h-full bg-[#B9FF66] transition-all duration-500"
                            style={{ width: `${course.progress}%` }}
                        />
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-600">
                        <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                        <span>•</span>
                        <span>{course.duration}</span>
                    </div>
                </div>

                {/* Main Content Grid */}
                <div className="grid lg:grid-cols-3 gap-4">
                    {/* Video Player - 2 columns */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Video Container */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            className="bg-[#191A23] rounded-xl overflow-hidden shadow-sm aspect-video relative"
                        >
                            {/* Video Placeholder */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="w-20 h-20 bg-[#B9FF66] rounded-full flex items-center justify-center mx-auto mb-4 cursor-pointer hover:scale-110 transition-transform">
                                        <Play className="w-10 h-10 text-[#191A23] ml-1" />
                                    </div>
                                    <p className="text-white font-semibold mb-1">{currentLesson.title}</p>
                                    <p className="text-gray-400 text-sm">{currentLesson.duration}</p>
                                </div>
                            </div>

                            {/* Video Controls Overlay */}
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                                <div className="flex items-center gap-2 text-white text-sm">
                                    <span className="text-[#B9FF66]">00:00</span>
                                    <div className="flex-1 h-1 bg-white/20 rounded-full">
                                        <div className="h-full w-1/3 bg-[#B9FF66] rounded-full"></div>
                                    </div>
                                    <span>{currentLesson.duration}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Lesson Info */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="bg-white rounded-xl p-6 shadow-sm"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-bold text-[#191A23] mb-2">{currentLesson.title}</h2>
                                    <div className="flex items-center gap-4 text-sm text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Clock size={16} />
                                            {currentLesson.duration}
                                        </span>
                                        {currentLesson.completed && (
                                            <span className="flex items-center gap-1 text-green-600">
                                                <CheckCircle size={16} />
                                                Completed
                                            </span>
                                        )}
                                    </div>
                                </div>
                                <button className="px-4 py-2 bg-[#B9FF66] text-[#191A23] rounded-lg font-semibold hover:bg-[#a8ee55] transition-colors">
                                    Mark Complete
                                </button>
                            </div>

                            {/* Navigation Buttons */}
                            <div className="flex gap-3 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => setActiveLesson(Math.max(0, activeLesson - 1))}
                                    disabled={activeLesson === 0}
                                    className="flex-1 px-4 py-2 bg-[#F3F3F3] text-[#191A23] rounded-lg font-semibold hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Previous Lesson
                                </button>
                                <button
                                    onClick={() => setActiveLesson(Math.min(allLessons.length - 1, activeLesson + 1))}
                                    disabled={activeLesson === allLessons.length - 1}
                                    className="flex-1 px-4 py-2 bg-[#191A23] text-[#B9FF66] rounded-lg font-semibold hover:bg-[#2a2b3a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Next Lesson
                                </button>
                            </div>
                        </motion.div>
                    </div>

                    {/* Curriculum Sidebar - 1 column */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-4"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100">
                                <div className="flex items-center gap-2 mb-1">
                                    <BookOpen className="w-5 h-5 text-[#191A23]" />
                                    <h3 className="font-bold text-[#191A23]">Course Curriculum</h3>
                                </div>
                                <p className="text-xs text-gray-600">{course.totalLessons} lessons</p>
                            </div>

                            {/* Modules List */}
                            <div className="max-h-[600px] overflow-y-auto">
                                {course.modules.map((module, moduleIdx) => (
                                    <div key={module.id} className="border-b border-gray-100 last:border-0">
                                        {/* Module Header */}
                                        <button
                                            onClick={() => setExpandedModule(expandedModule === moduleIdx ? -1 : moduleIdx)}
                                            className="w-full p-4 flex items-center justify-between hover:bg-[#F3F3F3] transition-colors"
                                        >
                                            <div className="flex items-center gap-3 flex-1 text-left">
                                                <div className="w-8 h-8 bg-[#F3F3F3] rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <span className="text-sm font-bold text-[#191A23]">{moduleIdx + 1}</span>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-semibold text-sm text-[#191A23] truncate">{module.title}</p>
                                                    <p className="text-xs text-gray-600">{module.lessons.length} lessons</p>
                                                </div>
                                            </div>
                                            {expandedModule === moduleIdx ? (
                                                <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            ) : (
                                                <ChevronRight className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                            )}
                                        </button>

                                        {/* Lessons List */}
                                        {expandedModule === moduleIdx && (
                                            <div className="bg-[#F3F3F3]/50">
                                                {module.lessons.map((lesson, lessonIdx) => {
                                                    const globalIdx = course.modules
                                                        .slice(0, moduleIdx)
                                                        .reduce((acc, m) => acc + m.lessons.length, 0) + lessonIdx;
                                                    
                                                    return (
                                                        <button
                                                            key={lesson.id}
                                                            onClick={() => !lesson.locked && setActiveLesson(globalIdx)}
                                                            disabled={lesson.locked}
                                                            className={`w-full p-3 pl-16 flex items-center gap-3 text-left transition-colors ${
                                                                activeLesson === globalIdx
                                                                    ? 'bg-[#B9FF66] text-[#191A23]'
                                                                    : lesson.locked
                                                                    ? 'opacity-50 cursor-not-allowed'
                                                                    : 'hover:bg-white'
                                                            }`}
                                                        >
                                                            <div className="flex-shrink-0">
                                                                {lesson.locked ? (
                                                                    <Lock className="w-4 h-4 text-gray-400" />
                                                                ) : lesson.completed ? (
                                                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                                                ) : (
                                                                    <Play className="w-4 h-4 text-gray-400" />
                                                                )}
                                                            </div>
                                                            <div className="flex-1 min-w-0">
                                                                <p className="text-sm font-medium truncate">{lesson.title}</p>
                                                                <p className="text-xs text-gray-600">{lesson.duration}</p>
                                                            </div>
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CourseDetail;
