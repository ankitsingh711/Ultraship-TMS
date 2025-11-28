import React from 'react';
import type { Employee } from '../../types';
import ActionMenu from './ActionMenu';
import { Mail, Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

interface TileViewProps {
    employees: Employee[];
    onEmployeeClick: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    onDelete: (id: string) => void;
    onFlag: (id: string) => void;
}

const TileView: React.FC<TileViewProps> = ({ employees, onEmployeeClick, onEdit, onDelete, onFlag }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {employees.map((employee, index) => (
                <div
                    key={employee.id}
                    className="card card-interactive group relative overflow-hidden animate-fade-in"
                    onClick={() => onEmployeeClick(employee)}
                    style={{ animationDelay: `${index * 50}ms` }}
                >
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ActionMenu
                            onEdit={() => onEdit(employee)}
                            onDelete={() => onDelete(employee.id)}
                            onFlag={() => onFlag(employee.id)}
                        />
                    </div>

                    <div className="flex flex-col items-center text-center pt-4 pb-2 relative z-10">
                        <div className="relative mb-4 group/avatar">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-xl opacity-20 group-hover/avatar:opacity-40 transition-opacity" />
                            <div className="relative">
                                <img
                                    src={employee.photoUrl || `https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                                    alt={employee.name}
                                    className="w-24 h-24 rounded-2xl border-2 border-white/20 relative z-10 bg-gray-700 object-cover shadow-xl group-hover:scale-105 transition-transform duration-300"
                                />
                                <div className="absolute -bottom-2 -right-2 z-20">
                                    <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold shadow-lg ${employee.attendance >= 90
                                            ? 'bg-emerald-500 text-white'
                                            : employee.attendance >= 75
                                                ? 'bg-yellow-500 text-white'
                                                : 'bg-red-500 text-white'
                                        }`}>
                                        <TrendingUp className="w-3 h-3" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-primary-light transition-colors">{employee.name}</h3>
                        <p className="text-primary text-sm font-semibold mb-1">{employee.position}</p>
                        <span className="badge badge-primary text-xs mb-4">{employee.department}</span>

                        <div className="w-full space-y-3 border-t border-white/5 pt-4">
                            <div className="flex items-center justify-between text-sm px-2">
                                <span className="text-gray-500 flex items-center gap-2">
                                    <Briefcase className="w-3.5 h-3.5" /> Age
                                </span>
                                <span className="text-gray-300 font-medium">{employee.age} years</span>
                            </div>

                            <div className="flex items-center justify-between text-sm px-2">
                                <span className="text-gray-500 flex items-center gap-2">
                                    <GraduationCap className="w-3.5 h-3.5" /> Class
                                </span>
                                <span className="text-gray-300 font-medium">{employee.class}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm px-2">
                                <span className="text-gray-500 flex items-center gap-2">
                                    <Mail className="w-3.5 h-3.5" /> Email
                                </span>
                                <span className="text-gray-300 truncate max-w-[140px] text-xs font-mono" title={employee.email}>
                                    {employee.email}
                                </span>
                            </div>

                            <div className="border-t border-white/5 pt-3 px-2">
                                <div className="flex items-center justify-between text-sm mb-2">
                                    <span className="text-gray-500">Attendance</span>
                                    <span className={`font-bold text-sm ${employee.attendance >= 90
                                            ? 'text-green-400'
                                            : employee.attendance >= 75
                                                ? 'text-yellow-400'
                                                : 'text-red-400'
                                        }`}>
                                        {employee.attendance}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden border border-white/10">
                                    <div
                                        className={`h-2 rounded-full transition-all duration-500 ${employee.attendance >= 90
                                                ? 'bg-emerald-500'
                                                : employee.attendance >= 75
                                                    ? 'bg-yellow-500'
                                                    : 'bg-red-500'
                                            }`}
                                        style={{ width: `${employee.attendance}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TileView;
