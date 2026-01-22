import { useState, useEffect } from 'react';
import { useCourseStore } from '../../store/useCourseStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Plus, FileText, Users } from 'lucide-react';
import { Course } from '../../types';

export default function CourseList() {
    const { courses, fetchCourses, addCourse } = useCourseStore();
    const [isCreating, setIsCreating] = useState(false);
    const [newTitle, setNewTitle] = useState('');
    const [newDesc, setNewDesc] = useState('');

    useEffect(() => {
        fetchCourses();
    }, [fetchCourses]);

    const handleCreate = () => {
        if (!newTitle) return;
        const newCourse: Course = {
            id: crypto.randomUUID(),
            title: newTitle,
            description: newDesc,
            teacherId: 'u2', // Mocked currently logged in teacher
            studentsEnrolled: [],
            modules: [],
            thumbnail: 'https://images.unsplash.com/photo-1541462608143-df3376251b6a?auto=format&fit=crop&q=80&w=1000'
        };
        addCourse(newCourse);
        setIsCreating(false);
        setNewTitle('');
        setNewDesc('');
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold mb-2">My Courses</h1>
                    <p className="text-gray-500">Manage your curriculum and materials.</p>
                </div>
                <Button onClick={() => setIsCreating(true)}>
                    <Plus size={20} className="mr-2" />
                    Create Course
                </Button>
            </div>

            {isCreating && (
                <Card className="p-6 space-y-4 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-xl font-bold">New Course Details</h3>
                    <div className="space-y-2">
                        <input
                            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="Course Title"
                            value={newTitle}
                            onChange={e => setNewTitle(e.target.value)}
                        />
                        <textarea
                            className="w-full p-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="Description"
                            rows={3}
                            value={newDesc}
                            onChange={e => setNewDesc(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="ghost" onClick={() => setIsCreating(false)}>Cancel</Button>
                        <Button onClick={handleCreate}>Save Course</Button>
                    </div>
                </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => (
                    <Card key={course.id} className="overflow-hidden flex flex-col group cursor-pointer hover:shadow-xl hover:border-brand/50">
                        <div className="h-40 bg-gray-200 relative overflow-hidden">
                            <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                <span className="text-white font-bold text-lg">{course.title}</span>
                            </div>
                        </div>
                        <div className="p-4 flex-1 flex flex-col">
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2">{course.description}</p>
                            <div className="mt-auto flex items-center justify-between text-sm text-gray-400">
                                <span className="flex items-center gap-1"><FileText size={16} /> {course.modules.length} Modules</span>
                                <span className="flex items-center gap-1"><Users size={16} /> {course.studentsEnrolled.length} Students</span>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
                            <Button variant="ghost" size="sm" className="text-brand">Edit</Button>
                            <Button variant="primary" size="sm" className="bg-brand/10 text-brand hover:bg-brand/20 shadow-none">View</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
