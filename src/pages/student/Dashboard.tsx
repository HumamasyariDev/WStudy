import { Routes, Route } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StudentCourseList from './StudentCourseList';
import QuizTaker from './QuizTaker';
import Certificate from './Certificate';

export default function StudentDashboard() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index element={<StudentCourseList />} />
                <Route path="courses" element={<StudentCourseList />} />
                <Route path="quiz/:quizId" element={<QuizTaker />} />
                <Route path="certificate/:attemptId" element={<Certificate />} />
            </Routes>
        </DashboardLayout>
    );
}
