import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../api/client';
import { useAuth } from '../context/AuthContext';
import '../App.css';

export default function LoginPage() {
	const [formData, setFormData] = useState({ email: '', password: '' });
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [unverified, setUnverified] = useState(false);
	const [showPassword, setShowPassword] = useState(false);
	const navigate = useNavigate();
	const { login } = useAuth();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setUnverified(false);

		try {
			const result = await login(formData.email, formData.password);
			
			if (result.success) {
				navigate('/admin'); // Redirect to admin dashboard for owners/admins
			} else {
				setError(result.message);
			}
		} catch (err) {
			const msg = err.message || 'Login failed. Please check your credentials.';
			setError(msg);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="auth-page">
			<div className="auth-container">
				<div className="auth-illustration">
					<div className="auth-overlay" />
					<div className="auth-hero-text">
						<h1>Abeni Perfumes</h1>
						<p>Timeless Ethiopian-inspired fragrances.</p>
					</div>
				</div>

				<div className="auth-card">
					<div className="auth-header">
						<h2 className="auth-title">Sign in to your account</h2>
						<p className="auth-subtitle">Welcome back — we missed you!</p>
					</div>

					{error && <div className="auth-alert auth-alert-error">{error}</div>}

					{unverified && (
						<div className="auth-hint">
							Didn't get the email?{' '}
							<a
								href="/resend-verification"
								className="link"
								onClick={(e) => {
									e.preventDefault();
									navigate('/resend-verification', { state: { email: formData.email } });
								}}
							>
								Resend verification
							</a>
						</div>
					)}

					<form className="auth-form" onSubmit={handleSubmit}>
						<div className="form-group">
							<label htmlFor="email" className="label">Email address</label>
							<input
								id="email"
								name="email"
								type="email"
								autoComplete="email"
								required
								className="input"
								value={formData.email}
								onChange={(e) => setFormData({...formData, email: e.target.value})}
							/>
						</div>

						<div className="form-group">
							<label htmlFor="password" className="label">Password</label>
							<div className="password-input-container">
								<input
									id="password"
									name="password"
									type={showPassword ? 'text' : 'password'}
									autoComplete="current-password"
									required
									className="input"
									value={formData.password}
									onChange={(e) => setFormData({...formData, password: e.target.value})}
								/>
								<button
									type="button"
									className="password-toggle"
									onClick={() => setShowPassword(!showPassword)}
								>
									{showPassword ? '👁️' : '👁️‍🗨️'}
								</button>
							</div>
						</div>

						<div className="form-row">
							<label className="checkbox">
								<input type="checkbox" /> <span>Remember me</span>
							</label>

							<button
								type="button"
								className="link link-small"
								onClick={() => navigate('/forgot-password')}
							>
								Forgot your password?
							</button>
						</div>

						<button type="submit" disabled={loading} className="btn btn-primary">
							{loading ? 'Signing in…' : 'Sign in'}
						</button>
					</form>

					<div className="divider"><span>or</span></div>

					<div className="alt-actions">
						<button className="btn btn-ghost" type="button" onClick={() => navigate('/register')}>
							Create a new account
						</button>
					</div>

					<p className="auth-footer">
						Don't have an account?{' '}
						<a 
							href="/register" 
							className="link"
							onClick={(e) => {
								e.preventDefault();
								navigate('/register');
							}}
						>
							Register
						</a>
					</p>
				</div>
			</div>
		</div>
	);
}