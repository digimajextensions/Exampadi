import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-hero-gradient p-4">
      <SignIn
        appearance={{
          elements: {
            rootBox: 'mx-auto',
            card: 'shadow-lg border border-border rounded-2xl',
            headerTitle: 'font-display font-bold',
            formButtonPrimary: 'bg-green-500 hover:bg-green-600',
          },
        }}
      />
    </div>
  );
}
