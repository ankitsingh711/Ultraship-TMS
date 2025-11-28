import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, ArrowRight, Building2, Sparkles, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

const SIGNUP_MUTATION = gql`
  mutation Signup($email: String!, $password: String!, $role: String) {
    signup(email: $email, password: $password, role: $role) {
      token
      user {
        id
        email
        role
      }
    }
  }
`;

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('employee');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION);
    const [signupMutation, { loading: signupLoading }] = useMutation(SIGNUP_MUTATION);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            if (isLogin) {
                const { data } = await loginMutation({ variables: { email, password } });
                login(data.login.token, data.login.user);
                navigate('/');
            } else {
                const { data } = await signupMutation({ variables: { email, password, role } });
                login(data.signup.token, data.signup.user);
                navigate('/');
            }
        } catch (err: any) {
            setError(err.message || 'An error occurred');
        }
    };

    const loading = loginLoading || signupLoading;

    const getPasswordStrength = (password: string) => {
        if (!password) return { strength: 0, label: '', color: '', bgColor: '' };
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[A-Z]/.test(password)) strength += 15;
        if (/[a-z]/.test(password)) strength += 10;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;

        if (strength < 40) return {
            strength,
            label: 'Weak',
            color: 'text-red-400',
            bgColor: 'bg-gradient-to-r from-red-500 to-pink-500'
        };
        if (strength < 70) return {
            strength,
            label: 'Medium',
            color: 'text-yellow-400',
            bgColor: 'bg-gradient-to-r from-yellow-500 to-amber-500'
        };
        return {
            strength,
            label: 'Strong',
            color: 'text-green-400',
            bgColor: 'bg-gradient-to-r from-green-500 to-emerald-500'
        };
    };

    const passwordStrength = getPasswordStrength(password);

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setPassword('');
        setEmail('');
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden" style={{
            background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)'
        }}>
            {/* Enhanced Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
                <div className="absolute rounded-full animate-pulse" style={{
                    top: '-20%',
                    left: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)'
                }} />
                <div className="absolute rounded-full animate-pulse" style={{
                    bottom: '-20%',
                    right: '-10%',
                    width: '600px',
                    height: '600px',
                    background: 'radial-gradient(circle, rgba(168, 85, 247, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    animationDelay: '1s'
                }} />
                <div className="absolute rounded-full animate-pulse" style={{
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    animationDelay: '2s'
                }} />
            </div>

            <div className="glass-panel-light w-full max-w-md animate-fade-in relative hover:shadow-2xl transition-all duration-500" style={{ zIndex: 1 }}>
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0" style={{
                    height: '3px',
                    background: 'linear-gradient(90deg, transparent 0%, rgba(99, 102, 241, 0.8) 50%, transparent 100%)'
                }} />

                <div className="p-8 sm:p-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-20 h-20 mb-6 transition-all duration-300 hover:scale-105" style={{
                            borderRadius: '1.5rem',
                            background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                            boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'
                        }}>
                            <Building2 className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold mb-3">
                            <span className="text-gradient-vibrant">
                                {isLogin ? 'Welcome Back' : 'Join Us Today'}
                            </span>
                        </h1>
                        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>
                            {isLogin ? 'Sign in to access your dashboard' : 'Create your account to get started'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-5">
                            {/* Email Input */}
                            <div className="relative group">
                                <label className="block text-sm font-medium mb-2 ml-1" style={{ color: '#cbd5e1' }}>
                                    Email Address
                                </label>
                                <Mail className="absolute w-5 h-5 transition-colors z-10" style={{
                                    left: '1rem',
                                    top: '42px',
                                    color: '#94a3b8'
                                }} />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="input-field pl-12 h-14 text-base"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Password Input */}
                            <div className="relative group">
                                <label className="block text-sm font-medium mb-2 ml-1" style={{ color: '#cbd5e1' }}>
                                    Password
                                </label>
                                <Lock className="absolute w-5 h-5 transition-colors z-10" style={{
                                    left: '1rem',
                                    top: '42px',
                                    color: '#94a3b8'
                                }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="input-field pl-12 pr-12 h-14 text-base"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 transition-colors z-10"
                                    style={{
                                        top: '42px',
                                        color: '#94a3b8'
                                    }}
                                    onMouseEnter={(e) => e.currentTarget.style.color = '#e2e8f0'}
                                    onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>

                            {/* Password Strength Indicator for Signup */}
                            {!isLogin && password && (
                                <div className="animate-slide-in-right space-y-3 px-1">
                                    <div className="h-2 rounded-full overflow-hidden" style={{
                                        backgroundColor: 'rgba(55, 65, 81, 0.5)',
                                        boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                                    }}>
                                        <div
                                            className="h-full transition-all duration-500"
                                            style={{
                                                width: `${passwordStrength.strength}%`,
                                                background: passwordStrength.strength < 40
                                                    ? 'linear-gradient(90deg, #ef4444 0%, #f472b6 100%)'
                                                    : passwordStrength.strength < 70
                                                        ? 'linear-gradient(90deg, #eab308 0%, #f59e0b 100%)'
                                                        : 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
                                                boxShadow: '0 2px 8px rgba(0,0,0,0.3)'
                                            }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span style={{ color: '#94a3b8' }}>Password strength:</span>
                                        <span className="font-bold flex items-center gap-1" style={{
                                            color: passwordStrength.strength < 40 ? '#f87171' : passwordStrength.strength < 70 ? '#fbbf24' : '#4ade80'
                                        }}>
                                            {passwordStrength.strength >= 70 ? (
                                                <CheckCircle2 className="w-3.5 h-3.5" />
                                            ) : (
                                                <AlertCircle className="w-3.5 h-3.5" />
                                            )}
                                            {passwordStrength.label}
                                        </span>
                                    </div>
                                </div>
                            )}

                            {/* Role Selection for Signup */}
                            {!isLogin && (
                                <div className="relative group animate-slide-in-right">
                                    <label className="block text-sm font-medium mb-2 ml-1" style={{ color: '#cbd5e1' }}>
                                        Account Type
                                    </label>
                                    <User className="absolute w-5 h-5 transition-colors z-10" style={{
                                        left: '1rem',
                                        top: '42px',
                                        color: '#94a3b8'
                                    }} />
                                    <select
                                        className="input-field pl-12 h-14 appearance-none cursor-pointer text-base"
                                        value={role}
                                        onChange={(e) => setRole(e.target.value)}
                                    >
                                        <option value="employee">Employee</option>
                                        <option value="admin">Administrator</option>
                                    </select>
                                    <div className="absolute right-4 pointer-events-none" style={{ top: '42px' }}>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" style={{ color: '#94a3b8' }}>
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="p-4 rounded-xl text-sm text-center animate-scale-in" style={{
                                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                backdropFilter: 'blur(10px)',
                                color: '#f87171'
                            }}>
                                <div className="flex items-center justify-center gap-2">
                                    <AlertCircle className="w-5 h-5" />
                                    <span className="font-medium">{error}</span>
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full group text-base h-14 relative overflow-hidden font-semibold"
                            style={{
                                boxShadow: '0 10px 40px rgba(99, 102, 241, 0.3)'
                            }}
                        >
                            {loading ? (
                                <div className="flex items-center gap-3">
                                    <div className="spinner spinner-sm" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                                </div>
                            )}
                        </button>
                    </form>

                    {/* Toggle between Login and Signup */}
                    <div className="mt-8 text-center">
                        <button
                            onClick={toggleMode}
                            className="text-sm transition-colors inline-flex items-center gap-2 group"
                            style={{ color: '#94a3b8' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#ffffff'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#94a3b8'}
                        >
                            <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
                            <span className="font-semibold" style={{
                                color: '#818cf8',
                                textDecoration: 'none'
                            }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.textDecoration = 'underline';
                                    e.currentTarget.style.textUnderlineOffset = '4px';
                                    e.currentTarget.style.textDecorationThickness = '2px';
                                }}
                                onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                            >
                                {isLogin ? 'Sign up now' : 'Sign in here'}
                            </span>
                        </button>
                    </div>

                    {/* Demo Credentials */}
                    <div className="mt-10 pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
                        <div className="text-center space-y-4">
                            <p className="text-xs font-bold uppercase mb-4 flex items-center justify-center gap-2" style={{
                                color: '#94a3b8',
                                letterSpacing: '0.1em'
                            }}>
                                <Sparkles className="w-3.5 h-3.5" />
                                <span>Demo Credentials</span>
                                <Sparkles className="w-3.5 h-3.5" />
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                                <div className="p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer group" style={{
                                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
                                    border: '1px solid rgba(99, 102, 241, 0.2)'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.4)'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(99, 102, 241, 0.2)'}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                                            backgroundColor: 'rgba(99, 102, 241, 0.2)'
                                        }}>
                                            <User className="w-4 h-4" style={{ color: '#818cf8' }} />
                                        </div>
                                        <div className="font-bold text-sm" style={{ color: '#818cf8' }}>Admin</div>
                                    </div>
                                    <div className="space-y-1.5 text-left">
                                        <div className="font-mono text-[11px] px-2 py-1.5 rounded" style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                            color: '#94a3b8'
                                        }}>
                                            admin@example.com
                                        </div>
                                        <div className="font-mono text-[11px] px-2 py-1.5 rounded" style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                            color: '#94a3b8'
                                        }}>
                                            password123
                                        </div>
                                    </div>
                                </div>
                                <div className="p-4 rounded-xl transition-all duration-300 hover:scale-105 cursor-pointer group" style={{
                                    background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.08) 0%, rgba(168, 85, 247, 0.08) 100%)',
                                    border: '1px solid rgba(236, 72, 153, 0.2)'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.4)'}
                                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(236, 72, 153, 0.2)'}
                                >
                                    <div className="flex items-center gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{
                                            backgroundColor: 'rgba(236, 72, 153, 0.2)'
                                        }}>
                                            <User className="w-4 h-4" style={{ color: '#f472b6' }} />
                                        </div>
                                        <div className="font-bold text-sm" style={{ color: '#f472b6' }}>Employee</div>
                                    </div>
                                    <div className="space-y-1.5 text-left">
                                        <div className="font-mono text-[11px] px-2 py-1.5 rounded" style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                            color: '#94a3b8'
                                        }}>
                                            employee@example.com
                                        </div>
                                        <div className="font-mono text-[11px] px-2 py-1.5 rounded" style={{
                                            backgroundColor: 'rgba(0, 0, 0, 0.2)',
                                            color: '#94a3b8'
                                        }}>
                                            password123
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

export default LoginPage;
