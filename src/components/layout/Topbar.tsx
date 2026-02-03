import { Bell, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

interface TopbarProps {
    onMenuClick: () => void;
}

const Topbar = ({ onMenuClick }: TopbarProps) => {
    const location = useLocation();

    // Get page title based on path (simple mapping)
    const getPageTitle = () => {
        const path = location.pathname.split('/').pop();
        if (!path) return 'Dashboard';
        return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ');
    }

    return (
        <header className="h-20 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 sticky top-0 z-40 shadow-sm">
            <div className="flex items-center gap-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 md:hidden text-gray-600 hover:text-indigo-600 transition-colors"
                >
                    <Menu size={24} />
                </button>
                <div>
                    <h1 className="text-xl md:text-2xl font-bold text-gray-800 font-geist">{getPageTitle()}</h1>
                    <p className="text-xs text-gray-500 hidden sm:block">Welcome back to your learning journey</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <button className="relative p-2.5 rounded-xl hover:bg-gray-50 transition-colors text-gray-600">
                    <Bell size={20} />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
};

export default Topbar;
