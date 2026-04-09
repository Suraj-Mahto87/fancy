'use client';

import { useState } from 'react';
import { login } from '@/lib/actions';
import { useRouter } from 'next/navigation';


export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const res = await login(formData);
    
    if (res.success) {
      router.push('/overview');
    } else {
      setError(res.error || 'Invalid credentials');
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      
      {/* Brand Header */}
      <div className="login-header">
        <h1 className="login-title">Fancy</h1>
        <p className="login-subtitle">Welcome back</p>
      </div>

      {/* Login Card */}
      <div className="login-card-container">
        <div className="login-card">
          
          <h2 className="login-h2">Sign in</h2>
          
          {/* Email Divider as seen in image (optional since Google is removed) */}
          {/* <div className="login-divider">
              <div className="login-divider-line"></div>
              <span className="login-divider-text">or continue with email</span>
              <div className="login-divider-line"></div>
          </div> */}

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="login-error">
                {error}
              </div>
            )}

            {/* Email Field */}
            <div className="login-field-group" style={{ gap: '6px' }}>
              <label className="login-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="login-input"
                placeholder="you@example.com"
                required
              />
            </div>

            {/* Password Field */}
            <div className="login-field-group" style={{ gap: '6px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <label className="login-label">Password</label>
                    <button type="button" className="login-forgot" style={{ marginBottom: '2px' }}>Forgot password?</button>
                </div>
                <div className="login-pass-input-container">
                    <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input"
                    style={{ paddingRight: '50px' }}
                    placeholder="••••••••"
                    required
                    />
                    <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-pass-toggle"
                    >
                    {showPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg>
                    ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.076m1.803-1.803A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-1.306 0-2.547-.245-3.69-.693m1.868-1.868a3 3 0 004.242-4.242"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3l18 18"/></svg>
                    )}
                    </button>
                </div>
            </div>

            {/* Action Section */}
            <div style={{ marginTop: '8px' }}>
              <button
                type="submit"
                disabled={loading}
                className="login-submit-btn"
              >
                {loading ? 'PROCESSING...' : 'SIGN IN'}
              </button>
            </div>
          </form>

          {/* Privacy/Info Alert - Matches image style */}
          <div className="login-alert-box">
            <span style={{ fontSize: '15px' }}>🔒</span>
            <p className="login-alert-text">
              Your data is private. Fancy never sells or shares your information with third parties.
            </p>
          </div>

        
        </div>
      </div>

      {/* Footer Branding */}
     
    </div>
  );
}
