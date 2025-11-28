import { useState } from 'react';
import { Menu, X, ChevronRight, Home, Users, Settings, LogOut, Sparkles } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { logout, user } = useAuth();

    const menuItems = [
        { icon: Home, label: 'Dashboard', path: '/', subItems: ['All Employees', 'Departments', 'Attendance'] },
        { icon: Users, label: 'Employees', path: '/' },
        { icon: Settings, label: 'Settings', path: '/settings' },
    ];

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className="btn-icon lg:hidden hover:rotate-180 transition-transform duration-300"
            >
                <Menu className="w-6 h-6" />
            </button>

            {/* Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden animate-fade-in"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Drawer */}
            <div className={`fixed top-0 left-0 h-full w-72 glass-panel-light border-r border-white/10 transform transition-all duration-300 ease-out z-50 lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'} shadow-2xl`}>
                {/* Header */}
                <div className="p-4 flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                            <Sparkles className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-bold text-xl bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">EMS Portal</span>
                    </div>
                    <button onClick={() => setIsOpen(false)} className="btn-icon hover:rotate-90 transition-transform">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* User Profile */}
                <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-white/5 to-transparent border border-white/10">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg">
                            {user?.email[0].toUpperCase()}
                        </div>
                        <div className="overflow-hidden flex-1">
                            <p className="text-sm font-semibold text-white truncate">{user?.email}</p>
                            <p className="text-xs text-gray-400 capitalize flex items-center gap-1">
                                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse"></span>
                                {user?.role}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Menu Items */}
                <div className="p-4 space-y-1 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
                    {menuItems.map((item, index) => (
                        <div key={index} className="space-y-1">
                            <Link
                                to={item.path}
                                className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all group border border-transparent hover:border-white/10"
                                onClick={() => !item.subItems && setIsOpen(false)}
                            >
                                <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                <span className="font-medium">{item.label}</span>
                                {item.subItems && (
                                    <ChevronRight className="w-4 h-4 ml-auto group-hover:translate-x-1 transition-transform" />
                                )}
                            </Link>

                            {item.subItems && (
                                <div className="pl-11 space-y-1">
                                    {item.subItems.map((sub, idx) => (
                                        <div key={idx} className="flex items-center gap-2 py-2 px-3 text-sm text-gray-500 hover:text-gray-300 cursor-pointer rounded-md hover:bg-white/5 transition-all group">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all" />
                                            {sub}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="absolute bottom-0 left-0 w-full p-4 border-t border-white/10 bg-gradient-to-t from-background/50 to-transparent backdrop-blur-sm">
                    <button
                        onClick={logout}
                        className="flex items-center gap-3 text-red-400 hover:text-red-300 text-sm w-full p-3 rounded-lg hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/20 group"
                    >
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </div>
        </>
    );
};

export default HamburgerMenu;
