import React from 'react';
import { Search, Filter, X, SlidersHorizontal } from 'lucide-react';
import type { EmployeeFilter } from '../../types';

interface FiltersProps {
    filter: EmployeeFilter;
    onFilterChange: (filter: EmployeeFilter) => void;
}

const Filters: React.FC<FiltersProps> = ({ filter, onFilterChange }) => {
    const handleChange = (key: keyof EmployeeFilter, value: any) => {
        onFilterChange({ ...filter, [key]: value || undefined });
    };

    const clearFilters = () => {
        onFilterChange({});
    };

    const hasFilters = Object.values(filter).some(v => v !== undefined);

    return (
        <div className="glass-panel-light p-6 mb-8 shadow-lg border border-white/10 animate-slide-in-right">
            <div className="flex items-center gap-2 mb-5">
                <SlidersHorizontal className="w-5 h-5 text-primary" />
                <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Filters</h3>
                {hasFilters && (
                    <span className="ml-auto text-xs bg-primary/20 text-primary px-2 py-1 rounded-full border border-primary/30">
                        Active
                    </span>
                )}
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative group">
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4 transition-colors group-focus-within:text-primary" />
                    <input
                        type="text"
                        placeholder="Search employees..."
                        className="input-field pl-11"
                        value={filter.search || ''}
                        onChange={(e) => handleChange('search', e.target.value)}
                    />
                </div>

                <div className="flex gap-4 overflow-x-auto pb-2 md:pb-0">
                    <div className="relative">
                        <select
                            className="input-field min-w-[160px] appearance-none cursor-pointer pr-10"
                            value={filter.department || ''}
                            onChange={(e) => handleChange('department', e.target.value)}
                        >
                            <option value="">All Departments</option>
                            <option value="Engineering">Engineering</option>
                            <option value="HR">HR</option>
                            <option value="Sales">Sales</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Finance">Finance</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    <div className="relative">
                        <select
                            className="input-field min-w-[160px] appearance-none cursor-pointer pr-10"
                            value={filter.position || ''}
                            onChange={(e) => handleChange('position', e.target.value)}
                        >
                            <option value="">All Positions</option>
                            <option value="Junior">Junior</option>
                            <option value="Senior">Senior</option>
                            <option value="Lead">Lead</option>
                            <option value="Manager">Manager</option>
                            <option value="Director">Director</option>
                        </select>
                        <Filter className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {hasFilters && (
                        <button
                            onClick={clearFilters}
                            className="btn-secondary flex items-center gap-2 whitespace-nowrap group animate-scale-in"
                        >
                            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
                            Clear
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Filters;
