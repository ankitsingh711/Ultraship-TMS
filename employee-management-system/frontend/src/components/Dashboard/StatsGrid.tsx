import React from 'react';
import { TrendingUp, Users, Award, Clock } from 'lucide-react';

interface StatsCardProps {
    title: string;
    value: string | number;
    change?: string;
    icon: React.ReactNode;
    gradient: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, gradient }) => {
    return (
        <div className="glass-panel p-6 hover:scale-105 transition-all duration-300 hover:shadow-2xl group relative overflow-hidden">
            {/* Background gradient glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500`} />

            <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-xl bg-gradient-to-br ${gradient} shadow-lg`}>
                        {icon}
                    </div>
                    {change && (
                        <div className={`flex items-center gap-1 text-sm font-semibold ${change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                            }`}>
                            <TrendingUp className={`w-4 h-4 ${change.startsWith('+') ? '' : 'rotate-180'}`} />
                            {change}
                        </div>
                    )}
                </div>

                <div className="space-y-1">
                    <h3 className="text-2xl font-bold text-white">{value}</h3>
                    <p className="text-sm text-gray-400">{title}</p>
                </div>
            </div>
        </div>
    );
};

interface StatsGridProps {
    totalEmployees: number;
    averageAttendance: number;
}

const StatsGrid: React.FC<StatsGridProps> = ({ totalEmployees, averageAttendance }) => {
    const stats = [
        {
            title: 'Total Employees',
            value: totalEmployees,
            change: '+12%',
            icon: <Users className="w-5 h-5 text-white" />,
            gradient: 'from-indigo-500 to-purple-600'
        },
        {
            title: 'Average Attendance',
            value: `${averageAttendance}%`,
            change: '+5%',
            icon: <Clock className="w-5 h-5 text-white" />,
            gradient: 'from-green-500 to-emerald-600'
        },
        {
            title: 'Departments',
            value: '8',
            change: '+2',
            icon: <Award className="w-5 h-5 text-white" />,
            gradient: 'from-pink-500 to-rose-600'
        },
        {
            title: 'Performance',
            value: '94%',
            change: '+8%',
            icon: <TrendingUp className="w-5 h-5 text-white" />,
            gradient: 'from-cyan-500 to-blue-600'
        }
    ];

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8 animate-fade-in">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    style={{ animationDelay: `${index * 100}ms` }}
                    className="animate-slide-in-right"
                >
                    <StatsCard {...stat} />
                </div>
            ))}
        </div>
    );
};

export default StatsGrid;
