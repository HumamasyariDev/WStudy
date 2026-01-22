import { Routes, Route } from 'react-router-dom';
import { Sidebar } from '../../components/dashboard/Sidebar';
import StudentCourseList from './StudentCourseList';
import CourseViewer from './CourseViewer';
import QuizTaker from './QuizTaker';
import Certificate from './Certificate';

export default function StudentDashboard() {
    return (
        <div className="min-h-screen bg-background pl-64 transition-all">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                <Routes>
                    <Route index element={<StudentCourseList />} />
                    <Route path="courses" element={<StudentCourseList />} />
                    <Route path="quiz/:quizId" element={<QuizTaker />} />
                    <Route path="certificate/:attemptId" element={<Certificate />} />
                </Routes>
            </div>
        </div>
    );
}
