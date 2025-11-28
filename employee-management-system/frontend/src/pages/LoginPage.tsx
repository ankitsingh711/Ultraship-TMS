import React, { useState } from 'react';
import { gql } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Lock, Mail, ArrowRight, Building2, Sparkles } from 'lucide-react';

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
        if (!password) return { strength: 0, label: '', color: '' };
        let strength = 0;
        if (password.length >= 8) strength += 25;
        if (password.length >= 12) strength += 25;
        if (/[A-Z]/.test(password)) strength += 15;
        if (/[a-z]/.test(password)) strength += 10;
        if (/[0-9]/.test(password)) strength += 15;
        if (/[^A-Za-z0-9]/.test(password)) strength += 10;

        if (strength < 40) return { strength, label: 'Weak', color: 'from-red-500 to-pink-500' };
        if (strength < 70) return { strength, label: 'Medium', color: 'from-yellow-500 to-amber-500' };
        return { strength, label: 'Strong', color: 'from-green-500 to-emerald-500' };
    };

    const passwordStrength = getPasswordStrength(password);

    return (
        <div className="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
            {/* Enhanced Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden -z-10">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-indigo-500/20 to-purple-500/20 blur-[120px] animate-pulse" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-pink-500/20 to-purple-500/20 blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
                <div className="absolute top-[50%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[40%] h-[40%] rounded-full bg-gradient-to-br from-purple-500/15 to-indigo-500/15 blur-[100px] animate-pulse" style={{ animationDelay: '2s' }} />

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${10 + Math.random() * 10}s`
                        }}
                    />
                ))}
            </div>

            <div className="glass-panel-light w-full max-w-md p-8 sm:p-10 animate-fade-in relative hover:shadow-2xl transition-shadow duration-500">
                {/* Decorative top border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 mb-4 shadow-lg shadow-indigo-500/30">
                        <Building2 className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                        <span className="text-gradient-vibrant">
                            {isLogin ? 'Welcome Back' : 'Join Us'}
                        </span>
                    </h1>
                    <p className="text-gray-400 text-sm sm:text-base">
                        {isLogin ? 'Sign in to access your portal' : 'Create your account to get started'}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="space-y-4">
                        <div className="relative group">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-primary" />
                            <input
                                type="email"
                                placeholder="Email Address"
                                className="input-field pl-11"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="relative group">
                            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-primary" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input-field pl-11"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        {/* Password Strength Indicator for Signup */}
                        {!isLogin && password && (
                            <div className="animate-slide-in-right space-y-2">
                                <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-gradient-to-r ${passwordStrength.color} transition-all duration-500`}
                                        style={{ width: `${passwordStrength.strength}%` }}
                                    />
                                </div>
                                {passwordStrength.label && (
                                    <p className="text-xs text-gray-400">
                                        Password strength: <span className={`font-semibold ${passwordStrength.strength < 40 ? 'text-red-400' :
                                                passwordStrength.strength < 70 ? 'text-yellow-400' : 'text-green-400'
                                            }`}>{passwordStrength.label}</span>
                                    </p>
                                )}
                            </div>
                        )}

                        {!isLogin && (
                            <div className="relative group animate-slide-in-right">
                                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 transition-colors group-focus-within:text-primary" />
                                <select
                                    className="input-field pl-11 appearance-none cursor-pointer"
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="employee">Employee</option>
                                    <option value="admin">Admin</option>
                                </select>
                                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </div>

                    {error && (
                        <div className="p-3.5 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center animate-scale-in backdrop-blur-sm">
                            <div className="flex items-center justify-center gap-2">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {error}
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-primary w-full group text-base relative"
                    >
                        {loading ? (
                            <>
                                <div className="spinner spinner-sm" />
                                <span>Processing...</span>
                            </>
                        ) : (
                            <>
                                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                                {isLogin ? 'Sign In' : 'Create Account'}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <button
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                        }}
                        className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1.5 group"
                    >
                        {isLogin ? "Don't have an account?" : 'Already have an account?'}
                        <span className="text-primary group-hover:underline underline-offset-2">
                            {isLogin ? 'Sign up' : 'Sign in'}
                        </span>
                    </button>
                </div>

                {/* Demo Credentials */}
                <div className="mt-8 pt-6 border-t border-white/10">
                    <div className="text-center space-y-2">
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Demo Credentials</p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                                <div className="font-semibold text-primary mb-1.5">Admin Account</div>
                                <div className="text-gray-400 font-mono text-[10px]">admin@example.com</div>
                                <div className="text-gray-500 font-mono text-[10px]">password123</div>
                            </div>
                            <div className="p-3 rounded-lg bg-white/5 border border-white/10 hover:border-secondary/30 transition-colors">
                                <div className="font-semibold text-secondary mb-1.5">Employee Account</div>
                                <div className="text-gray-400 font-mono text-[10px]">employee@example.com</div>
                                <div className="text-gray-500 font-mono text-[10px]">password123</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
