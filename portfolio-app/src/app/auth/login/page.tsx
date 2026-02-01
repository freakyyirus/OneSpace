import Link from 'next/link';

export default function LoginPage() {
    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-bg-secondary)',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '450px',
                padding: 'var(--spacing-xl)',
            }}>
                <div className="card">
                    <div className="text-center mb-2xl">
                        <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-sm)' }}>
                            Welcome back
                        </h1>
                        <p style={{ color: 'var(--color-text-secondary)' }}>
                            Log in to your portfolio
                        </p>
                    </div>

                    <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-lg)' }}>
                        <div>
                            <label htmlFor="email" style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-sm)',
                                fontWeight: 500,
                            }}>
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--font-size-base)',
                                }}
                                placeholder="alex@example.com"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" style={{
                                display: 'block',
                                marginBottom: 'var(--spacing-sm)',
                                fontWeight: 500,
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                required
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    border: '1px solid var(--color-border)',
                                    borderRadius: 'var(--radius-md)',
                                    fontSize: 'var(--font-size-base)',
                                }}
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" className="btn btn-primary btn-large" style={{ width: '100%' }}>
                            Log In
                        </button>
                    </form>

                    <div style={{
                        marginTop: 'var(--spacing-xl)',
                        paddingTop: 'var(--spacing-xl)',
                        borderTop: '1px solid var(--color-border)',
                        textAlign: 'center',
                    }}>
                        <p style={{ color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-md)' }}>
                            Or continue with
                        </p>
                        <button className="btn btn-secondary" style={{ width: '100%' }}>
                            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4" />
                                <path d="M9.003 18c2.43 0 4.467-.806 5.956-2.18L12.05 13.56c-.806.54-1.836.86-3.047.86-2.344 0-4.328-1.584-5.036-3.711H.96v2.332C2.44 15.983 5.485 18 9.003 18z" fill="#34A853" />
                                <path d="M3.964 10.71c-.18-.54-.282-1.117-.282-1.71 0-.593.102-1.17.282-1.71V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05" />
                                <path d="M9.003 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.464.891 11.426 0 9.003 0 5.485 0 2.44 2.017.96 4.958L3.967 7.29c.708-2.127 2.692-3.71 5.036-3.71z" fill="#EA4335" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    <p className="text-center mt-xl" style={{ color: 'var(--color-text-secondary)' }}>
                        Don't have an account?{' '}
                        <Link href="/auth/signup" style={{ fontWeight: 500 }}>
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
