import React, { useState, useRef, useEffect } from 'react';
import { MoreVertical, Edit, Trash2, Flag } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface ActionMenuProps {
    onEdit?: () => void;
    onDelete?: () => void;
    onFlag?: () => void;
}

const ActionMenu: React.FC<ActionMenuProps> = ({ onEdit, onDelete, onFlag }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const { isAdmin } = useAuth();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={menuRef}>
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                className="p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
                <MoreVertical className="w-4 h-4" />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-2 w-36 bg-[#1e293b] border border-white/10 rounded-lg shadow-xl z-20 overflow-hidden animate-fade-in">
                    <div className="py-1">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onFlag?.();
                                setIsOpen(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                        >
                            <Flag className="w-3 h-3" />
                            Flag
                        </button>

                        {isAdmin && (
                            <>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onEdit?.();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-white/5 hover:text-white flex items-center gap-2"
                                >
                                    <Edit className="w-3 h-3" />
                                    Edit
                                </button>
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onDelete?.();
                                        setIsOpen(false);
                                    }}
                                    className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 flex items-center gap-2"
                                >
                                    <Trash2 className="w-3 h-3" />
                                    Delete
                                </button>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActionMenu;
