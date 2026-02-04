import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    const [isSidebarOpen, setSidebarOpen] = React.useState(false);

    return (
        <div className="min-h-screen bg-white flex transition-colors duration-300 overflow-x-hidden">
            <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 md:ml-64 flex flex-col min-h-screen overflow-x-hidden">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 p-4 md:p-6 lg:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
