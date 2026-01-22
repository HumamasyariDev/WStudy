import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseStore } from '../../store/useCourseStore';
import { CommentSection } from '../../components/course/CommentSection';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { PlayCircle, FileText, ArrowLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function CourseViewer() {
    const { courseId } = useParams();
    const navigate = useNavigate();
    const { courses } = useCourseStore();
    const course = courses.find(c => c.id === courseId);

    const [activeModuleIndex, setActiveModuleIndex] = useState(0);

    if (!course) return <div className="p-8">Course not found</div>;

    const activeModule = course.modules[activeModuleIndex];

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)]">
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" onClick={() => navigate('/student/courses')}>
                    <ArrowLeft size={20} className="mr-2" /> Back
                </Button>
                <h1 className="text-2xl font-bold">{course.title}</h1>
            </div>

            <div className="flex flex-1 gap-6 overflow-hidden">
                {/* Main Content Area */}
                <Card className="flex-1 flex flex-col p-6 overflow-y-auto">
                    <div className="mb-6">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            {activeModule?.materials?.[0]?.type === 'video' ? <PlayCircle /> : <FileText />}
                            {activeModule?.title}
                        </h2>

                        <div className="bg-gray-100 rounded-2xl min-h-[300px] flex items-center justify-center mb-6">
                            {activeModule?.materials?.[0] ? (
                                <div className="text-center p-8">
                                    <p className="text-lg text-gray-600 mb-4">{activeModule.materials[0].content}</p>
                                    <p className="text-sm text-gray-400 italic">(In a real app, this would render video player or PDF viewer)</p>
                                </div>
                            ) : (
                                <p>No material in this module</p>
                            )}
                        </div>
                    </div>

                    {activeModule?.materials?.[0] && (
                        <CommentSection
                            courseId={course.id}
                            moduleId={activeModule.id}
                            comments={activeModule.materials[0].comments}
                        />
                    )}
                </Card>

                {/* Sidebar Modules List */}
                <Card className="w-80 flex flex-col p-0 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 bg-gray-50">
                        <h3 className="font-bold">Course Modules</h3>
                        <p className="text-xs text-gray-500">{course.modules.length} lessons</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-2 space-y-2">
                        {course.modules.length === 0 && <p className="p-4 text-center text-sm text-gray-400">No modules yet.</p>}
                        {course.modules.map((m, idx) => (
                            <button
                                key={m.id}
                                onClick={() => setActiveModuleIndex(idx)}
                                className={cn(
                                    "w-full text-left p-3 rounded-lg flex items-center gap-3 transition-colors text-sm",
                                    activeModuleIndex === idx ? "bg-brand text-white shadow-md" : "hover:bg-gray-50 text-gray-600"
                                )}
                            >
                                <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs font-mono">
                                    {idx + 1}
                                </span>
                                <span className="truncate flex-1">{m.title}</span>
                                {activeModuleIndex === idx && <ChevronRight size={16} />}
                            </button>
                        ))}
                    </div>
                </Card>
            </div>
        </div>
    );
}
