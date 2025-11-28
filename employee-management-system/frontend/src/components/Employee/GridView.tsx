import React from 'react';
import type { Employee } from '../../types';
import ActionMenu from './ActionMenu';

interface GridViewProps {
    employees: Employee[];
    onEmployeeClick: (employee: Employee) => void;
    onEdit: (employee: Employee) => void;
    onDelete: (id: string) => void;
    onFlag: (id: string) => void;
}

const GridView: React.FC<GridViewProps> = ({ employees, onEmployeeClick, onEdit, onDelete, onFlag }) => {
    return (
        <div className="glass-panel-light overflow-hidden shadow-lg border border-white/10 rounded-xl">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="border-b border-white/10 bg-gradient-to-r from-primary/10 to-transparent">
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">Employee</th>
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">ID</th>
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">Age</th>
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">Department</th>
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">Position</th>
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">Class</th>
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">Subjects</th>
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">Attendance</th>
                            <th className="p-5 font-semibold text-white text-sm tracking-wide">Email</th>
                            <th className="p-5 font-semibold text-white text-sm text-right tracking-wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr
                                key={employee.id}
                                className="border-b border-white/5 hover:bg-white/5 transition-all cursor-pointer group relative"
                                onClick={() => onEmployeeClick(employee)}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <td className="p-5">
                                    <div className="flex items-center gap-3">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-secondary/30 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                                            <img
                                                src={employee.photoUrl || `https://ui-avatars.com/api/?name=${employee.name}&background=random`}
                                                alt=""
                                                className="w-10 h-10 rounded-full bg-gray-700 border-2 border-white/10 relative z-10 object-cover"
                                            />
                                        </div>
                                        <span className="font-semibold text-white group-hover:text-primary-light transition-colors">{employee.name}</span>
                                    </div>
                                </td>
                                <td className="p-5">
                                    <span className="text-xs font-mono text-gray-400 bg-white/5 px-2 py-1 rounded-md border border-white/10">
                                        #{employee.id.slice(-6)}
                                    </span>
                                </td>
                                <td className="p-5 text-gray-300 font-medium">{employee.age}</td>
                                <td className="p-5">
                                    <span className="badge badge-primary">
                                        {employee.department}
                                    </span>
                                </td>
                                <td className="p-5 text-gray-300 font-medium">{employee.position}</td>
                                <td className="p-5 text-gray-400">{employee.class}</td>
                                <td className="p-5">
                                    <div className="max-w-[200px] truncate text-gray-400 text-sm" title={employee.subjects.join(', ')}>
                                        {employee.subjects.join(', ')}
                                    </div>
                                </td>
                                <td className="p-5">
                                    <div className="flex items-center gap-2">
                                        <div className="w-20 bg-gray-700/50 rounded-full h-2 overflow-hidden border border-white/10">
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
                                        <span className={`text-xs font-bold ${employee.attendance >= 90
                                            ? 'text-green-400'
                                            : employee.attendance >= 75
                                                ? 'text-yellow-400'
                                                : 'text-red-400'
                                            }`}>
                                            {employee.attendance}%
                                        </span>
                                    </div>
                                </td>
                                <td className="p-5 text-gray-400 text-sm">{employee.email}</td>
                                <td className="p-5 text-right">
                                    <ActionMenu
                                        onEdit={() => onEdit(employee)}
                                        onDelete={() => onDelete(employee.id)}
                                        onFlag={() => onFlag(employee.id)}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default GridView;
