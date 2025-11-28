import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, ArrowRight, Building2, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

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
            bgColor: 'bg-gradient-to-r from-red-500 to-red-600'
        };
        if (strength < 70) return {
            strength,
            label: 'Medium',
            color: 'text-yellow-400',
            bgColor: 'bg-gradient-to-r from-yellow-500 to-yellow-600'
        };
        return {
            strength,
            label: 'Strong',
            color: 'text-green-400',
            bgColor: 'bg-gradient-to-r from-emerald-500 to-emerald-600'
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
        <div className="min-h-screen flex items-center justify-center p-8 sm:p-16 relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            <div className="absolute inset-0 overflow-hidden opacity-30">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500 rounded-full blur-3xl"></div>
            </div>

            <div className="glass-panel-light w-full max-w-lg animate-fade-in relative z-10 border border-white/10 shadow-2xl">
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

                <div className="p-12 sm:p-16">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center justify-center w-20 h-20 mb-8 rounded-2xl bg-blue-500 shadow-lg shadow-blue-500/50">
                            <Building2 className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-4xl font-bold mb-4 text-white">
                            {isLogin ? 'Welcome Back' : 'Create Account'}
                        </h1>
                        <p className="text-gray-400 text-xl">
                            {isLogin ? 'Sign in to access your dashboard' : 'Join us to get started'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="space-y-4">
                            <div className="relative">
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                                    <input
                                        type="email"
                                        placeholder="you@example.com"
                                        className="input-field pl-11 h-12"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="relative">
                                <label className="block text-sm font-medium mb-2 text-gray-300">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className="input-field pl-11 pr-11 h-12"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors z-10"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {!isLogin && password && (
                                <div className="animate-slide-in-right space-y-2">
                                    <div className="h-2 rounded-full overflow-hidden bg-gray-700/50">
                                        <div
                                            className={`h-full transition-all duration-500 ${passwordStrength.strength < 40
                                                ? 'bg-red-500'
                                                : passwordStrength.strength < 70
                                                    ? 'bg-yellow-500'
                                                    : 'bg-emerald-500'
                                                }`}
                                            style={{ width: `${passwordStrength.strength}%` }}
                                        />
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <span className="text-gray-400">Password strength:</span>
                                        <span className={`font-semibold flex items-center gap-1 ${passwordStrength.color}`}>
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

                            {!isLogin && (
                                <div className="relative animate-slide-in-right">
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Account Type
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                                        <select
                                            className="input-field pl-11 h-12 appearance-none cursor-pointer"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                        >
                                            <option value="employee">Employee</option>
                                            <option value="admin">Administrator</option>
                                        </select>
                                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                            <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {error && (
                            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm animate-scale-in">
                                <div className="flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    <span className="font-medium">{error}</span>
                                </div>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full h-12 text-base font-semibold"
                        >
                            {loading ? (
                                <div className="flex items-center gap-2">
                                    <div className="spinner spinner-sm" />
                                    <span>Processing...</span>
                                </div>
                            ) : (
                                <div className="flex items-center gap-2">
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 text-center">
                        <button
                            onClick={toggleMode}
                            className="text-sm text-gray-400 hover:text-white transition-colors"
                        >
                            {isLogin ? "Don't have an account? " : 'Already have an account? '}
                            <span className="text-blue-400 hover:text-blue-300 font-semibold">
                                {isLogin ? 'Sign up' : 'Sign in'}
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
