import { Outlet, Route, Routes } from 'react-router-dom';
import { Sidebar } from '../../components/dashboard/Sidebar';
import CourseList from './CourseList';
import QuizBuilder from './QuizBuilder';

// This component acts as the Layout for /teacher/* routes and also handles sub-routing if preferred,
// or we can delegate sub-routing to the main router.
// Given the router definition `element: <TeacherDashboard />`, this component should render the layout and sub-routes.
// However, `react-router` usually prefers defining routes in the main config.
// Let's adjust: I'll make this the Layout wrapper and use Route inside or just render content if path matches.

// Actually, in router.tsx I did: `path: '/teacher/*', element: <TeacherDashboard />`
// So this component receives all /teacher/* traffic. It should define Routes.

export default function TeacherDashboard() {
    return (
        <div className="min-h-screen bg-background pl-64 transition-all">
            <Sidebar />
            <div className="p-8 max-w-7xl mx-auto">
                <Routes>
                    <Route index element={<CourseList />} />
                    <Route path="courses" element={<CourseList />} />
                    <Route path="quizzes" element={<QuizBuilder />} />
                </Routes>
            </div>
        </div>
    );
}
