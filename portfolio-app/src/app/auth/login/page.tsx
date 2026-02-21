import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-bg-secondary)',
      padding: 'var(--spacing-xl)',
    }}>
      <SignIn routing="hash" signUpUrl="/auth/signup" />
    </div>
  );
}
