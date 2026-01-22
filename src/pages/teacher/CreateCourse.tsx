import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useCourseStore } from '../../store/useCourseStore';
import { useQuizStore } from '../../store/useQuizStore';
import { Course, Module, Material } from '../../types';
import { Plus, Trash, Save, Video, FileText, Upload, BookOpen, ChevronRight, ChevronDown, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CreateCourse = () => {
    const navigate = useNavigate();
    const { addCourse } = useCourseStore();
    const { quizzes } = useQuizStore(); // Fetch available quizzes

    // Form State
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [thumbnail, setThumbnail] = useState('');
    const [modules, setModules] = useState<Module[]>([]);

    // UI State
    const [expandedModule, setExpandedModule] = useState<string | null>(null);

    const handleAddModule = () => {
        const newModule: Module = {
            id: crypto.randomUUID(),
            title: `Chapter ${modules.length + 1}`,
            materials: []
        };
        setModules([...modules, newModule]);
        setExpandedModule(newModule.id);
    };

    const handleUpdateModuleTitle = (id: string, newTitle: string) => {
        setModules(modules.map(m => m.id === id ? { ...m, title: newTitle } : m));
    };

    const handleDeleteModule = (id: string) => {
        setModules(modules.filter(m => m.id !== id));
    };

    const handleAddMaterial = (moduleId: string, type: Material['type']) => {
        const newMaterial: Material = {
            id: crypto.randomUUID(),
            title: `New ${type.charAt(0).toUpperCase() + type.slice(1)}`,
            type,
            content: '',
            comments: []
        };

        setModules(modules.map(m => {
            if (m.id === moduleId) {
                return { ...m, materials: [...m.materials, newMaterial] };
            }
            return m;
        }));
    };

    const handleUpdateMaterial = (moduleId: string, materialId: string, field: keyof Material, value: any) => {
        setModules(modules.map(m => {
            if (m.id === moduleId) {
                return {
                    ...m,
                    materials: m.materials.map(mat => mat.id === materialId ? { ...mat, [field]: value } : mat)
                };
            }
            return m;
        }));
    };

    const handleDeleteMaterial = (moduleId: string, materialId: string) => {
        setModules(modules.map(m => {
            if (m.id === moduleId) {
                return { ...m, materials: m.materials.filter(mat => mat.id !== materialId) };
            }
            return m;
        }));
    };

    const handleSaveCourse = () => {
        if (!title || !description) return alert("Please fill in Basic Info");
        if (modules.length === 0) return alert("Please add at least one module");

        const newCourse: Course = {
            id: crypto.randomUUID(),
            title,
            description,
            thumbnail: thumbnail || 'https://source.unsplash.com/random/800x600/?education',
            modules,
            teacherId: 'u2', // Mock Teacher ID
            studentsEnrolled: []
        };

        addCourse(newCourse);
        alert("Course Created Successfully!");
        navigate('/teacher/dashboard');
    };

    return (
        <DashboardLayout>
            <div className="max-w-5xl mx-auto pb-20">
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-3xl font-bold text-[#19456B] dark:text-white font-lexend">Create New Course</h1>
                        <p className="text-gray-500 dark:text-gray-400">Design your curriculum and add content.</p>
                    </div>
                    <Button onClick={handleSaveCourse} className="bg-[#16C79A] text-white shadow-lg shadow-green-900/20">
                        <Save size={18} className="mr-2" /> Publish Course
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Col: Basic Info */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card className="p-6 bg-white dark:bg-slate-900 border dark:border-slate-800">
                            <h3 className="font-bold text-[#19456B] dark:text-white mb-4 flex items-center gap-2">
                                <BookOpen size={20} className="text-[#11698E]" /> Basic Info
                            </h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Course Title</label>
                                    <input
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-[#11698E] outline-none text-[#19456B] dark:text-white"
                                        placeholder="e.g. Advanced React Patterns"
                                        value={title}
                                        onChange={e => setTitle(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Description</label>
                                    <textarea
                                        className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-[#11698E] outline-none text-[#19456B] dark:text-white min-h-[120px]"
                                        placeholder="What will students learn?"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold uppercase text-gray-400 block mb-1">Thumbnail URL</label>
                                    <div className="flex gap-2">
                                        <input
                                            className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none focus:ring-2 focus:ring-[#11698E] outline-none text-[#19456B] dark:text-white text-sm"
                                            placeholder="https://..."
                                            value={thumbnail}
                                            onChange={e => setThumbnail(e.target.value)}
                                        />
                                        <Button variant="secondary" className="px-3"><Upload size={18} /></Button>
                                    </div>
                                    {thumbnail && (
                                        <img src={thumbnail} alt="Preview" className="w-full h-32 object-cover rounded-xl mt-3" />
                                    )}
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Right Col: Curriculum Builder */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="flex justify-between items-center">
                            <h3 className="font-bold text-[#19456B] dark:text-white text-xl">Curriculum</h3>
                            <Button onClick={handleAddModule} variant="outline" size="sm">
                                <Plus size={16} className="mr-1" /> Add Chapter
                            </Button>
                        </div>

                        {modules.length === 0 && (
                            <div className="text-center py-12 border-2 border-dashed border-gray-200 dark:border-slate-700 rounded-2xl">
                                <p className="text-gray-400">No chapters yet. Click "Add Chapter" to begin.</p>
                            </div>
                        )}

                        <div className="space-y-4">
                            <AnimatePresence>
                                {modules.map((module) => (
                                    <motion.div
                                        key={module.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
                                    >
                                        {/* Module Header */}
                                        <div className="p-4 bg-gray-50 dark:bg-slate-800/50 flex items-center gap-4">
                                            <button
                                                onClick={() => setExpandedModule(expandedModule === module.id ? null : module.id)}
                                                className="p-1 hover:bg-white dark:hover:bg-slate-700 rounded-lg transition-colors"
                                            >
                                                {expandedModule === module.id ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                                            </button>
                                            <input
                                                className="bg-transparent font-bold text-[#19456B] dark:text-white text-lg outline-none flex-1"
                                                value={module.title}
                                                onChange={e => handleUpdateModuleTitle(module.id, e.target.value)}
                                            />
                                            <button onClick={() => handleDeleteModule(module.id)} className="text-red-400 hover:text-red-500">
                                                <Trash size={18} />
                                            </button>
                                        </div>

                                        {/* Module Content */}
                                        {expandedModule === module.id && (
                                            <div className="p-4 bg-white dark:bg-slate-900 border-t border-gray-100 dark:border-slate-800">
                                                <div className="space-y-3 mb-4">
                                                    {module.materials.map((mat) => (
                                                        <div key={mat.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 dark:border-slate-700 bg-gray-50/50 dark:bg-slate-800/50">
                                                            <div className={`p-2 rounded-lg ${mat.type === 'video' ? 'bg-blue-100 text-blue-600' :
                                                                mat.type === 'quiz' ? 'bg-orange-100 text-orange-600' :
                                                                    'bg-gray-200 text-gray-600'
                                                                }`}>
                                                                {mat.type === 'video' ? <Video size={16} /> :
                                                                    mat.type === 'quiz' ? <Trophy size={16} /> :
                                                                        <FileText size={16} />}
                                                            </div>
                                                            <div className="flex-1 space-y-1">
                                                                <input
                                                                    className="w-full bg-transparent text-sm font-bold text-[#19456B] dark:text-white outline-none"
                                                                    value={mat.title}
                                                                    onChange={e => handleUpdateMaterial(module.id, mat.id, 'title', e.target.value)}
                                                                />
                                                                {/* Content Input based on Type */}
                                                                {mat.type === 'quiz' ? (
                                                                    <select
                                                                        className="w-full text-xs p-1 bg-white dark:bg-slate-800 border rounded outline-none"
                                                                        value={mat.content}
                                                                        onChange={e => handleUpdateMaterial(module.id, mat.id, 'content', e.target.value)}
                                                                    >
                                                                        <option value="">Select a Quiz...</option>
                                                                        {quizzes.map(q => (
                                                                            <option key={q.id} value={q.id}>{q.title}</option>
                                                                        ))}
                                                                    </select>
                                                                ) : (
                                                                    <input
                                                                        className="w-full text-xs text-gray-500 bg-transparent outline-none"
                                                                        placeholder={mat.type === 'video' ? "Video URL..." : "Content..."}
                                                                        value={mat.content}
                                                                        onChange={e => handleUpdateMaterial(module.id, mat.id, 'content', e.target.value)}
                                                                    />
                                                                )}
                                                            </div>
                                                            <button onClick={() => handleDeleteMaterial(module.id, mat.id)} className="text-gray-400 hover:text-red-500">
                                                                <Trash size={16} />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>

                                                <div className="flex gap-2">
                                                    <Button size="sm" variant="ghost" className="text-sm bg-blue-50 hover:bg-blue-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#11698E] dark:text-blue-400" onClick={() => handleAddMaterial(module.id, 'video')}>
                                                        <Video size={14} className="mr-1" /> Video
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="text-sm bg-gray-50 hover:bg-gray-100 dark:bg-slate-800 dark:hover:bg-slate-700" onClick={() => handleAddMaterial(module.id, 'text')}>
                                                        <FileText size={14} className="mr-1" /> Reading
                                                    </Button>
                                                    <Button size="sm" variant="ghost" className="text-sm bg-orange-50 hover:bg-orange-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-orange-600" onClick={() => handleAddMaterial(module.id, 'quiz')}>
                                                        <Trophy size={14} className="mr-1" /> Quiz
                                                    </Button>
                                                </div>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default CreateCourse;
