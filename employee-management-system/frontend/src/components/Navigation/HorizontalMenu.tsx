import { useState, useRef, useEffect } from 'react';
import { Home, Users, Settings, Bell, Search, LogOut, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import HamburgerMenu from './HamburgerMenu';

const HorizontalMenu = () => {
    const { user, logout } = useAuth();
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="sticky top-0 z-30 w-full glass-panel-light rounded-none border-x-0 border-t-0 mb-6 shadow-lg">
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6">
                <div className="flex items-center justify-between h-14 sm:h-16">
                    <div className="flex items-center gap-2 sm:gap-4">
                        <HamburgerMenu />
                        <div className="flex-shrink-0">
                            <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">EMS Portal</span>
                        </div>
                        <nav className="hidden lg:flex items-center space-x-2 ml-8">
                            <a href="#" className="text-white px-3 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 bg-primary/10 border border-primary/20 shadow-sm shadow-primary/20 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <Home className="w-4 h-4 relative z-10" />
                                <span className="relative z-10">Dashboard</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-all relative group">
                                <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                <span>Employees</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-white px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 hover:bg-white/5 transition-all relative group">
                                <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                                <span>Settings</span>
                            </a>
                        </nav>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-3">
                        <div className="hidden md:flex relative group">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-primary" />
                            <input
                                type="text"
                                placeholder="Quick search..."
                                className="bg-black/30 border border-white/10 rounded-lg py-1.5 pl-9 pr-3 text-sm text-gray-300 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 w-40 lg:w-56 transition-all"
                            />
                        </div>

                        <button className="btn-icon relative group">
                            <Bell className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full animate-pulse"></span>
                        </button>

                        {/* Profile Dropdown */}
                        <div className="relative" ref={dropdownRef}>
                            <button
                                onClick={() => setIsProfileOpen(!isProfileOpen)}
                                className="hidden lg:flex items-center gap-2 py-1.5 px-2 rounded-lg hover:bg-white/5 transition-all group"
                            >
                                <div className="text-right">
                                    <p className="text-xs font-semibold text-white">{user?.email.split('@')[0]}</p>
                                    <p className="text-[10px] text-gray-400 capitalize">{user?.role}</p>
                                </div>
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center font-bold text-white shadow-lg group-hover:scale-105 transition-transform">
                                    {user?.email[0].toUpperCase()}
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform ${isProfileOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {/* Dropdown Menu */}
                            {isProfileOpen && (
                                <div className="absolute right-0 mt-2 w-56 glass-panel-light border border-white/10 rounded-xl shadow-xl overflow-hidden animate-scale-in">
                                    <div className="p-3 border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
                                        <p className="text-sm font-semibold text-white">{user?.email}</p>
                                        <p className="text-xs text-gray-400 capitalize mt-0.5">{user?.role}</p>
                                    </div>
                                    <div className="p-2">
                                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all group">
                                            <User className="w-4 h-4 group-hover:scale-110 transition-transform" />
                                            <span className="text-sm">My Profile</span>
                                        </button>
                                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/5 text-gray-300 hover:text-white transition-all group">
                                            <Settings className="w-4 h-4 group-hover:rotate-45 transition-transform" />
                                            <span className="text-sm">Settings</span>
                                        </button>
                                    </div>
                                    <div className="p-2 border-t border-white/10 bg-gradient-to-t from-background/50 to-transparent">
                                        <button
                                            onClick={() => {
                                                setIsProfileOpen(false);
                                                logout();
                                            }}
                                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 hover:text-red-300 transition-all group border border-transparent hover:border-red-500/20"
                                        >
                                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                            <span className="text-sm font-medium">Sign Out</span>
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HorizontalMenu;
