import { NextResponse } from 'next/server';
import { auth, currentUser } from '@clerk/nextjs/server';

/**
 * Get the current session (null if not authenticated).
 * Acts as a drop-in replacement for next-auth's getServerSession.
 */
export async function getServerSession() {
  const { userId } = await auth();
  if (!userId) return null;
  const user = await currentUser();

  return {
    user: {
      id: userId,
      email: user?.emailAddresses?.[0]?.emailAddress ?? '',
      name: user?.fullName ?? '',
      image: user?.imageUrl ?? ''
    }
  };
}

/**
 * Require auth: returns session or a 401 NextResponse.
 */
export async function requireAuth() {
  const session = await getServerSession();
  if (!session?.user?.id) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  return session;
}

/**
 * Get user id from session; returns null if not authenticated.
 */
export function getUserId(session: any): string | null {
  if (session instanceof NextResponse || !session) return null;
  return session?.user?.id ?? null;
}
