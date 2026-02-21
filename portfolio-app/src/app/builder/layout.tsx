import { redirect } from 'next/navigation';
import { getServerSession } from '@/lib/auth';

export default async function BuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession();
  if (!session?.user?.email) {
    redirect('/auth/login?callbackUrl=' + encodeURIComponent('/builder'));
  }
  return <>{children}</>;
}
