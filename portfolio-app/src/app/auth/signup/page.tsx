import { SignUp } from "@clerk/nextjs";

export default function SignupPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'var(--color-bg-secondary)',
      padding: 'var(--spacing-xl)',
    }}>
      <SignUp routing="hash" signInUrl="/auth/login" />
    </div>
  );
}
