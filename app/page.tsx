import { auth } from '@/app/lib/auth';
import { Navbar } from '@/app/components/Navbar';
import { redirect } from 'next/navigation';

export default async function Home() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }
  return (
    <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
      <Navbar />
    </div>
  );
}
