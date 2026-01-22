import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import TeacherDashboard from './pages/teacher/Dashboard';
import StudentDashboard from './pages/student/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import App from './App';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />, // Acts as layout if needed, or just redirect
        children: [
            {
                path: '/',
                element: <Login />
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
