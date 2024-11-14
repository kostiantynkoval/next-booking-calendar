import { auth } from '@/app/lib/auth';
import { redirect } from 'next/navigation';

export async function getSession() {
  const session = await auth();

  if (!session?.user) {
    return redirect('/');
  }

  return session;
}
