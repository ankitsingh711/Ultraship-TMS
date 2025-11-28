import React from 'react';
import { X, Mail, Briefcase, MapPin, Calendar, BookOpen, Clock, Edit, Trash2, Flag, Award } from 'lucide-react';
import type { Employee } from '../../types';
import { useAuth } from '../../context/AuthContext';

interface EmployeeDetailProps {
    employee: Employee;
    onClose: () => void;
    onEdit?: (employee: Employee) => void;
    onDelete?: (id: string) => void;
    onFlag?: (id: string) => void;
}

const EmployeeDetail: React.FC<EmployeeDetailProps> = ({ employee, onClose, onEdit, onDelete, onFlag }) => {
    const { isAdmin } = useAuth();

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            <div
                className="absolute inset-0 bg-black/70 backdrop-blur-md"
                onClick={onClose}
            />

            <div className="relative w-full max-w-3xl glass-panel-light animate-scale-in overflow-hidden border border-white/20 shadow-2xl">
                {/* Header with gradient cover */}
                <div className="h-36 bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-background/50" />
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2.5 bg-black/30 hover:bg-black/50 rounded-xl text-white transition-all hover:rotate-90 backdrop-blur-sm border border-white/10"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-8 pb-8">
                    <div className="relative flex flex-col sm:flex-row justify-between items-start sm:items-end -mt-16 mb-6 gap-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
                            <div className="relative group/avatar">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl blur-2xl opacity-40 group-hover/avatar:opacity-60 transition-opacity" />
                                <img
                                    src={employee.photoUrl || `https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                                    alt={employee.name}
                                    className="w-28 h-28 rounded-2xl border-4 border-background shadow-2xl object-cover bg-gray-700 relative z-10"
                                />
                                <div className="absolute -bottom-2 -right-2 z-20">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shadow-lg ${employee.attendance >= 90
                                        ? 'bg-emerald-500'
                                        : employee.attendance >= 75
                                            ? 'bg-yellow-500'
                                            : 'bg-red-500'
                                        }`}>
                                        <Award className="w-4 h-4 text-white" />
                                    </div>
                                </div>
                            </div>
                            <div className="mb-1">
                                <h2 className="text-3xl font-bold text-white mb-1">{employee.name}</h2>
                                <p className="text-primary text-lg font-semibold">{employee.position}</p>
                                <div className="flex items-center gap-2 mt-2">
                                    <span className="badge badge-primary">{employee.department}</span>
                                    <span className="text-xs text-gray-500 font-mono">#{employee.id.slice(-8)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-2">
                            <button
                                onClick={() => onFlag?.(employee.id)}
                                className="btn-icon bg-yellow-500/10 text-yellow-400 hover:bg-yellow-500/20 border border-yellow-500/20"
                                title="Flag Employee"
                            >
                                <Flag className="w-4 h-4" />
                            </button>
                            {isAdmin && (
                                <>
                                    <button
                                        onClick={() => onEdit?.(employee)}
                                        className="btn-icon bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20"
                                        title="Edit Employee"
                                    >
                                        <Edit className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => onDelete?.(employee.id)}
                                        className="btn-icon bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
                                        title="Delete Employee"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 space-y-6 backdrop-blur-sm hover:border-primary/30 transition-colors">
                                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-3 border-b border-white/10 pb-4">
                                    <Mail className="w-5 h-5 text-primary" />
                                    Contact Information
                                </h3>
                                <div className="space-y-5">
                                    <div className="flex items-center gap-3 text-gray-200 group">
                                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Mail className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="text-sm font-medium">{employee.email}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-200 group">
                                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                                            <Briefcase className="w-4 h-4 text-secondary" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Department</p>
                                            <p className="text-sm font-medium">{employee.department}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-200 group">
                                        <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center group-hover:bg-cyan-500/20 transition-colors">
                                            <MapPin className="w-4 h-4 text-cyan-400" />
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500">Class</p>
                                            <p className="text-sm font-medium">{employee.class}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 space-y-6 backdrop-blur-sm hover:border-success/30 transition-colors">
                                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-3 border-b border-white/10 pb-4">
                                    <Clock className="w-5 h-5 text-success" />
                                    Performance Metrics
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-400 text-sm">Attendance Rate</span>
                                        <span className={`font-bold text-lg ${employee.attendance >= 90
                                            ? 'text-green-400'
                                            : employee.attendance >= 75
                                                ? 'text-yellow-400'
                                                : 'text-red-400'
                                            }`}>
                                            {employee.attendance}%
                                        </span>
                                    </div>
                                    <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden border border-white/10">
                                        <div
                                            className={`h-3 rounded-full transition-all duration-500 ${employee.attendance >= 90
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

                        <div className="space-y-6">
                            <div className="p-6 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 space-y-6 h-full backdrop-blur-sm hover:border-cyan-500/30 transition-colors">
                                <h3 className="text-base font-bold text-white uppercase tracking-wider flex items-center gap-3 border-b border-white/10 pb-4">
                                    <BookOpen className="w-5 h-5 text-warning" />
                                    Academic Details
                                </h3>
                                <div className="space-y-6">
                                    <div className="flex items-center gap-3 text-gray-200">
                                        <Calendar className="w-4 h-4 text-blue-400" />
                                        <span className="text-sm">
                                            <span className="text-gray-500">Age:</span>{' '}
                                            <span className="font-medium">{employee.age} years</span>
                                        </span>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <BookOpen className="w-4 h-4 text-blue-400" />
                                            <span className="text-sm text-gray-400">Subjects</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {employee.subjects.map((subject, idx) => (
                                                <span
                                                    key={idx}
                                                    className="px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20 hover:bg-primary/20 transition-colors"
                                                >
                                                    {subject}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetail;
