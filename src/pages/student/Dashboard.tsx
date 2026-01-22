import { Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import StudentCourseList from './StudentCourseList';
import QuizTaker from './QuizTaker';
import Certificate from './Certificate';

export default function StudentDashboard() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index element={<Navigate to="dashboard" replace />} />
                <Route path="dashboard" element={<StudentCourseList />} />
                <Route path="courses" element={<StudentCourseList />} />
                <Route path="quiz/:quizId" element={<QuizTaker />} />
                <Route path="certificate/:attemptId" element={<Certificate />} />
            </Routes>
        </DashboardLayout>
    );
}
