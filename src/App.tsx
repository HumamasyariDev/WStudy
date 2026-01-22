import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landing-page/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import StudentDashboard from './pages/student/StudentDashboard';
import MyCourses from './pages/student/MyCourses';
import Quizzes from './pages/student/Quizzes';
import Certificates from './pages/student/Certificates';
import CourseDetail from './pages/student/CourseDetail';
import QuizTaking from './pages/student/QuizTaking';
import QuizReview from './pages/student/QuizReview';
import CertificateViewer from './pages/student/CertificateViewer';
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import CourseCreator from './pages/teacher/CourseCreator';
import QuizBuilder from './pages/teacher/QuizBuilder';
import StudentsManagement from './pages/teacher/StudentsManagement';
import AdminOverview from './pages/admin/AdminOverview';
import AdminCourses from './pages/admin/AdminCourses';
import AdminUsers from './pages/admin/AdminUsers';
import AdminSettings from './pages/admin/AdminSettings';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRole }: { children: React.ReactNode, allowedRole: 'student' | 'teacher' | 'admin' }) => {
    const { user, isAuthenticated } = useAuthStore();

    if (!isAuthenticated || !user) {
        return <Navigate to="/login" replace />;
    }

    if (user.role !== allowedRole) {
        // Redirect to their appropriate dashboard if wrong role
        return <Navigate to={`/${user.role}/dashboard`} replace />;
    }

    return <>{children}</>;
};



function App() {
    const { theme } = useThemeStore();

    // Sync theme with document class
    React.useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignUpPage />} />

                {/* Student Routes */}
                <Route path="/student/*" element={
                    <ProtectedRoute allowedRole="student">
                        <Routes>
                            <Route path="dashboard" element={<StudentDashboard />} />
                            <Route path="courses" element={<MyCourses />} />
                            <Route path="courses/:courseId" element={<CourseDetail />} />
                            <Route path="quizzes" element={<Quizzes />} />
                            <Route path="quiz/:quizId" element={<QuizTaking />} />
                            <Route path="quiz/:quizId/review" element={<QuizReview />} />
                            <Route path="certificates" element={<Certificates />} />
                            <Route path="certificate/:certificateId" element={<CertificateViewer />} />
                            <Route path="*" element={<Navigate to="dashboard" replace />} />
                        </Routes>
                    </ProtectedRoute>
                } />

                {/* Teacher Routes */}
                <Route path="/teacher/*" element={
                    <ProtectedRoute allowedRole="teacher">
                        <Routes>
                            <Route path="dashboard" element={<TeacherDashboard />} />
                            <Route path="create-course" element={<CourseCreator />} />
                            <Route path="quiz-builder" element={<QuizBuilder />} />
                            <Route path="students" element={<StudentsManagement />} />
                            <Route path="*" element={<Navigate to="dashboard" replace />} />
                        </Routes>
                    </ProtectedRoute>
                } />

                {/* Admin Routes */}
                <Route path="/admin/*" element={
                    <ProtectedRoute allowedRole="admin">
                        <Routes>
                            <Route path="dashboard" element={<AdminOverview />} />
                            <Route path="courses" element={<AdminCourses />} />
                            <Route path="users" element={<AdminUsers />} />
                            <Route path="settings" element={<AdminSettings />} />
                            <Route path="*" element={<Navigate to="dashboard" replace />} />
                        </Routes>
                    </ProtectedRoute>
                } />

            </Routes>
        </Router>
    );
}

export default App;

