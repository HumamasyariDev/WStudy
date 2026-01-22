import { Route, Routes } from 'react-router-dom';
import DashboardLayout from '../../components/layout/DashboardLayout';
import CourseList from './CourseList';
import QuizBuilder from './QuizBuilder';
import StudentManagement from './StudentsManagement';

// This component acts as the Layout and Router for /teacher/* routes
export default function TeacherDashboard() {
    return (
        <DashboardLayout>
            <Routes>
                <Route index element={<CourseList />} />
                <Route path="courses" element={<CourseList />} />
                <Route path="students" element={<StudentManagement />} />
                <Route path="quiz-builder" element={<QuizBuilder />} />
            </Routes>
        </DashboardLayout>
    );
}
