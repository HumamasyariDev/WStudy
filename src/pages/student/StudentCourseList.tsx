import { useEffect } from 'react';
import { useCourseStore } from '../../store/useCourseStore';
import { useQuizStore } from '../../store/useQuizStore';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { useNavigate } from 'react-router-dom';

export default function StudentCourseList() {
    const { courses, fetchCourses } = useCourseStore();
    const { quizzes, fetchQuizzes } = useQuizStore();
    const navigate = useNavigate();

    useEffect(() => {
        fetchCourses();
        fetchQuizzes();
    }, [fetchCourses, fetchQuizzes]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold mb-2">My Learning</h1>
                <p className="text-gray-500">Access your enrolled courses and take quizzes.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map(course => {
                    const courseQuizzes = quizzes.filter(q => q.courseId === course.id);

                    return (
                        <Card key={course.id} className="overflow-hidden flex flex-col hover:shadow-xl transition-all">
                            <div className="h-40 bg-gray-200 relative">
                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                            </div>
                            <div className="p-5 flex-1 space-y-4">
                                <div>
                                    <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                                    <p className="text-sm text-gray-500 line-clamp-2">{course.description}</p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-xs font-bold uppercase text-gray-400">Available Quizzes</p>
                                    {courseQuizzes.length > 0 ? (
                                        courseQuizzes.map(q => (
                                            <div key={q.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg text-sm">
                                                <span className="truncate flex-1">{q.title}</span>
                                                <Button size="sm" onClick={() => navigate(`/student/quiz/${q.id}`)}>
                                                    Start
                                                </Button>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400 italic">No quizzes available yet.</p>
                                    )}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}
