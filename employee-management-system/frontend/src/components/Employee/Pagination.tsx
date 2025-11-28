import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalCount: number;
    itemsPerPage: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, totalCount, itemsPerPage }) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1;
    const endItem = Math.min(currentPage * itemsPerPage, totalCount);

    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 p-4 glass-panel-light border border-white/10 shadow-lg animate-fade-in">
            <div className="text-sm">
                <span className="text-gray-400">Showing</span>{' '}
                <span className="text-white font-bold">{startItem}</span> -
                <span className="text-white font-bold">{endItem}</span>{' '}
                <span className="text-gray-400">of</span>{' '}
                <span className="text-primary font-bold">{totalCount}</span>{' '}
                <span className="text-gray-400">results</span>
            </div>

            <div className="flex items-center gap-2">
                <button
                    onClick={() => onPageChange(1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all group"
                    title="First page"
                >
                    <ChevronsLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all group"
                    title="Previous page"
                >
                    <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>

                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum = i + 1;
                    if (totalPages > 5) {
                        if (currentPage > 3) {
                            pageNum = currentPage - 2 + i;
                        }
                        if (pageNum > totalPages) {
                            pageNum = totalPages - 4 + i;
                        }
                    }

                    if (pageNum <= totalPages && pageNum > 0) {
                        const isActive = currentPage === pageNum;
                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`min-w-[2.5rem] h-10 rounded-lg flex items-center justify-center text-sm font-semibold transition-all relative overflow-hidden group ${isActive
                                        ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/40 scale-110'
                                        : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary/30 hover:text-white'
                                    }`}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                                )}
                                <span className="relative z-10">{pageNum}</span>
                            </button>
                        );
                    }
                    return null;
                })}

                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all group"
                    title="Next page"
                >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>

                <button
                    onClick={() => onPageChange(totalPages)}
                    disabled={currentPage === totalPages}
                    className="p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10 hover:border-primary/30 disabled:opacity-30 disabled:cursor-not-allowed transition-all group"
                    title="Last page"
                >
                    <ChevronsRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
            </div>
        </div>
    );
};

export default Pagination;
