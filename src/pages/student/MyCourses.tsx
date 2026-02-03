import { motion } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Calculator, Dna, Globe2, Laptop, Palette, Hourglass, Search, Filter, BookOpen, Clock, Users, Star, Play, ChevronRight } from 'lucide-react';

const MyCourses = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', 'Mathematics', 'Science', 'Language', 'Technology', 'Arts', 'History'];

    const courses = [
        {
            id: 1,
            title: 'Advanced Calculus',
            category: 'Mathematics',
            icon: Calculator,
            progress: 68,
            instructor: 'Dr. Sarah Johnson',
            students: 234,
            rating: 4.8,
            duration: '12 weeks',
            lessons: 48,
            nextLesson: 'Derivatives and Limits',
            thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400&h=300&fit=crop'
        },
        {
            id: 2,
            title: 'Biology & Life Sciences',
            category: 'Science',
            icon: Dna,
            progress: 82,
            instructor: 'Prof. Michael Chen',
            students: 189,
            rating: 4.9,
            duration: '10 weeks',
            lessons: 36,
            nextLesson: 'Cell Structure',
            thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&h=300&fit=crop'
        },
        {
            id: 3,
            title: 'Spanish for Beginners',
            category: 'Language',
            icon: Globe2,
            progress: 45,
            instructor: 'Ms. Emma Wilson',
            students: 156,
            rating: 4.7,
            duration: '8 weeks',
            lessons: 24,
            nextLesson: 'Basic Conversations',
            thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop'
        },
        {
            id: 4,
            title: 'Web Development Bootcamp',
            category: 'Technology',
            icon: Laptop,
            progress: 34,
            instructor: 'John Smith',
            students: 312,
            rating: 4.9,
            duration: '16 weeks',
            lessons: 64,
            nextLesson: 'React Fundamentals',
            thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
        },
        {
            id: 5,
            title: 'Digital Art Masterclass',
            category: 'Arts',
            icon: Palette,
            progress: 56,
            instructor: 'Lisa Anderson',
            students: 98,
            rating: 4.8,
            duration: '6 weeks',
            lessons: 18,
            nextLesson: 'Color Theory',
            thumbnail: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400&h=300&fit=crop'
        },
        {
            id: 6,
            title: 'World History',
            category: 'History',
            icon: Hourglass,
            progress: 91,
            instructor: 'Dr. Robert Lee',
            students: 145,
            rating: 4.6,
            duration: '14 weeks',
            lessons: 42,
            nextLesson: 'Renaissance Period',
            thumbnail: 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=400&h=300&fit=crop'
        },
    ];

    const filteredCourses = courses.filter(course => {
        const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });

    return (
        <DashboardLayout>
            <div className="space-y-6 overflow-x-hidden">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h1 className="text-3xl font-bold text-[#191A23] font-geist mb-2">My Courses</h1>
                    <p className="text-gray-600">Continue learning and track your progress</p>
                </motion.div>

                {/* Search and Filter */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-xl p-4 md:p-6 shadow-sm"
                >
                    <div className="space-y-3">
                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search courses..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 pr-4 py-2.5 md:py-3 bg-[#F3F3F3] rounded-xl border-2 border-transparent focus:border-[#191A23] focus:bg-white outline-none transition-all text-sm text-[#191A23] placeholder:text-gray-400"
                            />
                        </div>

                        {/* Category Filter */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            <Filter className="text-gray-400 flex-shrink-0" size={18} />
                            <div className="flex gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all ${selectedCategory === category
                                                ? 'bg-[#B9FF66] text-[#191A23]'
                                                : 'bg-[#F3F3F3] text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Stats Overview */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {[
                        { label: 'Total Courses', value: courses.length, icon: BookOpen },
                        { label: 'In Progress', value: courses.filter(c => c.progress < 100).length, icon: Play },
                        { label: 'Completed', value: courses.filter(c => c.progress >= 90).length, icon: Star },
                        { label: 'Total Hours', value: '124', icon: Clock },
                    ].map((stat, idx) => {
                        const Icon = stat.icon;
                        return (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 + idx * 0.05 }}
                                className="bg-white rounded-xl p-4 shadow-sm"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-[#F3F3F3] rounded-lg flex items-center justify-center flex-shrink-0">
                                        <Icon className="w-5 h-5 text-[#191A23]" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-xl font-bold text-[#191A23]">{stat.value}</p>
                                        <p className="text-xs text-gray-600 truncate">{stat.label}</p>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Course Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredCourses.map((course, idx) => {
                        const Icon = course.icon;
                        return (
                            <motion.div
                                key={course.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
                                whileHover={{
                                    y: -4,
                                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                                    transition: { duration: 0.2 }
                                }}
                                onClick={() => navigate(`/student/courses/${course.id}`)}
                                className="bg-white rounded-xl overflow-hidden shadow-sm group cursor-pointer w-full"
                            >
                                {/* Thumbnail */}
                                <div className="relative overflow-hidden bg-gray-100" style={{ aspectRatio: '16/9' }}>
                                    <img 
                                        src={course.thumbnail} 
                                        alt={course.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
                                    <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-bold text-[#191A23]">
                                        {course.progress}%
                                    </div>
                                    <div className="absolute bottom-4 left-4">
                                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-lg">
                                            <Icon className="w-6 h-6 text-[#191A23]" />
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-5 space-y-4">
                                    <div>
                                        <h3 className="font-bold text-lg text-[#191A23] mb-1 group-hover:text-[#B9FF66] transition-colors">
                                            {course.title}
                                        </h3>
                                        <p className="text-sm text-gray-600">{course.instructor}</p>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 text-xs text-gray-600">
                                        <span className="flex items-center gap-1">
                                            <Users size={14} />
                                            {course.students}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Star size={14} className="fill-yellow-400 text-yellow-400" />
                                            {course.rating}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BookOpen size={14} />
                                            {course.lessons} lessons
                                        </span>
                                    </div>

                                    {/* Progress Bar */}
                                    <div>
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-semibold text-gray-600">Progress</span>
                                            <span className="text-xs font-bold text-[#191A23]">{course.progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-[#F3F3F3] rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-[#B9FF66] transition-all duration-500"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    {/* Next Lesson */}
                                    <div className="pt-4 border-t border-gray-100">
                                        <p className="text-xs text-gray-500 mb-1">Next Lesson</p>
                                        <div className="flex items-center justify-between">
                                            <p className="text-sm font-semibold text-[#191A23]">{course.nextLesson}</p>
                                            <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#B9FF66] group-hover:translate-x-1 transition-all" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* Empty State */}
                {filteredCourses.length === 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="bg-white rounded-xl p-12 text-center shadow-sm"
                    >
                        <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-800 mb-2">No courses found</h3>
                        <p className="text-gray-600">Try adjusting your search or filter criteria</p>
                    </motion.div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default MyCourses;
