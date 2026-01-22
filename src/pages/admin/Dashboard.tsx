import { useCourseStore } from '../../store/useCourseStore';
import { useQuizStore } from '../../store/useQuizStore';
import { db } from '../../lib/db'; // Direct access for user count if needed
import { Card } from '../../components/ui/Card';
import DashboardLayout from '../../components/layout/DashboardLayout';
import { Users, BookOpen, CheckSquare, TrendingUp } from 'lucide-react';

export default function AdminDashboard() {
    const { courses } = useCourseStore();
    const { attempts } = useQuizStore();
    // Assume we load these on mount normally, but stores might be empty if we just refreshed. 
    // For demo, we rely on persistence or triggers.

    const users = db.getUsers();

    const totalStudents = users.filter(u => u.role === 'student').length;
    const totalCourses = courses.length;
    const totalAttempts = attempts.length;
    const avgScore = totalAttempts > 0
        ? Math.round(attempts.reduce((acc, a) => acc + a.score, 0) / totalAttempts)
        : 0;

    return (
        <DashboardLayout>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold mb-2">Admin Dashboard</h1>
                    <p className="text-gray-500">System overview and performance metrics.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard icon={Users} label="Total Students" value={totalStudents.toString()} color="text-brand" bg="bg-brand/10" />
                    <StatsCard icon={BookOpen} label="Active Courses" value={totalCourses.toString()} color="text-accent" bg="bg-accent/10" />
                    <StatsCard icon={CheckSquare} label="Quizzes Taken" value={totalAttempts.toString()} color="text-success" bg="bg-success/10" />
                    <StatsCard icon={TrendingUp} label="Global Avg Score" value={`${avgScore}%`} color="text-orange-500" bg="bg-orange-500/10" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="p-6">
                        <h3 className="font-bold mb-4">Recent Activity</h3>
                        <div className="space-y-4">
                            {attempts.slice(-5).reverse().map(a => (
                                <div key={a.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${a.passed ? 'bg-success' : 'bg-red-500'}`}></div>
                                        <div>
                                            <p className="text-sm font-bold">Quiz Attempt</p>
                                            <p className="text-xs text-gray-500">{new Date(a.timestamp).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <span className="font-bold">{a.score}%</span>
                                </div>
                            ))}
                            {attempts.length === 0 && <p className="text-gray-400 italic text-sm">No recent activity.</p>}
                        </div>
                    </Card>

                    <Card className="p-6">
                        <h3 className="font-bold mb-4">System Status</h3>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between p-2 border-b border-gray-100">
                                <span>Server Status</span>
                                <span className="text-success font-bold">Operational</span>
                            </div>
                            <div className="flex justify-between p-2 border-b border-gray-100">
                                <span>Database</span>
                                <span className="text-success font-bold">LocalStorage (Synced)</span>
                            </div>
                            <div className="flex justify-between p-2 border-b border-gray-100">
                                <span>Version</span>
                                <span className="text-gray-500">v1.0.0 (Beta)</span>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatsCard({ icon: Icon, label, value, color, bg }: any) {
    return (
        <Card className="p-6 flex items-center gap-4 hover:scale-105 cursor-default">
            <div className={`p-4 rounded-full ${bg} ${color}`}>
                <Icon size={24} />
            </div>
            <div>
                <p className="text-sm text-gray-500 font-bold uppercase">{label}</p>
                <h3 className="text-3xl font-black text-accent">{value}</h3>
            </div>
        </Card>
    );
}
