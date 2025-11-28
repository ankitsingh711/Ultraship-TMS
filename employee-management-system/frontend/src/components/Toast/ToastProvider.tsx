import React, { createContext, useContext, useState, useCallback } from 'react';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = 'info') => {
        const id = Math.random().toString(36).substring(7);
        const newToast = { id, message, type };

        setToasts(prev => [...prev, newToast]);

        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 4000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const getIcon = (type: ToastType) => {
        switch (type) {
            case 'success':
                return <CheckCircle className="w-5 h-5" />;
            case 'error':
                return <AlertCircle className="w-5 h-5" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5" />;
            default:
                return <Info className="w-5 h-5" />;
        }
    };

    const getColors = (type: ToastType) => {
        switch (type) {
            case 'success':
                return 'from-green-500 to-emerald-500 bg-green-500/10 border-green-500/30 text-green-400';
            case 'error':
                return 'from-red-500 to-pink-500 bg-red-500/10 border-red-500/30 text-red-400';
            case 'warning':
                return 'from-yellow-500 to-amber-500 bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
            default:
                return 'from-blue-500 to-cyan-500 bg-blue-500/10 border-blue-500/30 text-blue-400';
        }
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 space-y-2 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`glass-panel-light border ${getColors(toast.type).split(' ')[2]} ${getColors(toast.type).split(' ')[3]} ${getColors(toast.type).split(' ')[4]} max-w-md animate-slide-in-right pointer-events-auto`}
                        style={{ backdropFilter: 'blur(16px)' }}
                    >
                        <div className="flex items-start gap-3 p-4">
                            <div className={`bg-gradient-to-br ${getColors(toast.type).split(' ')[0]} ${getColors(toast.type).split(' ')[1]} p-2 rounded-lg flex-shrink-0`}>
                                {getIcon(toast.type)}
                            </div>
                            <p className={`flex-1 text-sm font-medium ${getColors(toast.type).split(' ')[4]}`}>
                                {toast.message}
                            </p>
                            <button
                                onClick={() => removeToast(toast.id)}
                                className="btn-icon p-1 flex-shrink-0"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <div
                            className={`h-1 bg-gradient-to-r ${getColors(toast.type).split(' ')[0]} ${getColors(toast.type).split(' ')[1]} animate-shrink`}
                            style={{ animation: 'shrink 4s linear forwards' }}
                        />
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};
