import React from 'react';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
    viewMode: 'grid' | 'tile';
    onViewChange: (mode: 'grid' | 'tile') => void;
}

const ViewToggle: React.FC<ViewToggleProps> = ({ viewMode, onViewChange }) => {
    return (
        <div className="flex bg-white/5 p-1 rounded-lg border border-white/10 backdrop-blur-sm">
            <button
                onClick={() => onViewChange('grid')}
                className={`relative p-2.5 rounded-md transition-all group ${viewMode === 'grid'
                        ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                title="Grid View"
            >
                <List className={`w-4 h-4 transition-transform ${viewMode === 'grid' ? 'scale-110' : 'group-hover:scale-105'}`} />
            </button>
            <button
                onClick={() => onViewChange('tile')}
                className={`relative p-2.5 rounded-md transition-all group ${viewMode === 'tile'
                        ? 'bg-gradient-to-br from-primary to-accent text-white shadow-lg shadow-primary/30'
                        : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                title="Tile View"
            >
                <LayoutGrid className={`w-4 h-4 transition-transform ${viewMode === 'tile' ? 'scale-110' : 'group-hover:scale-105'}`} />
            </button>
        </div>
    );
};

export default ViewToggle;
