import { createBrowserRouter } from 'react-router-dom';
import LandingPage from './pages/landing-page/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignUpPage from './pages/auth/SignUpPage';
import TeacherDashboard from './pages/teacher/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import App from './App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <LandingPage />
            },
            {
                path: '/login',
                element: <LoginPage />
            },
            {
                path: '/signup',
                element: <SignUpPage />
            },
            {
                path: '/teacher/*',
                element: <TeacherDashboard />
            },
            {
                path: '/student/*',
                element: <StudentDashboard />
            },
            {
                path: '/admin/*',
                element: <AdminDashboard />
            }
        ]
    }
]);
