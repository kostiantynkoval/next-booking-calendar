import { ReactNode } from 'react';
import Image from 'next/image';
import { Menu } from 'lucide-react';
import { signOut } from '@/app/lib/auth';
import { Logo } from '@/app/components/Logo';
import { DashboardLinks } from '@/app/components/DashboardLinks';
import { ThemeToggler } from '@/app/components/ThemeToggler';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { getSession } from '@/app/utils/getSession';
import prisma from '@/app/lib/db';
import { redirect } from 'next/navigation';
import { Toaster } from '@/components/ui/sonner';

interface DashboardLayoutProps {
  children: ReactNode;
}

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: { id: userId },
    select: { userName: true, grantId: true }
  });

  if (!data?.userName) {
    redirect('/onboarding');
  }
  if (!data?.grantId) {
    redirect('/onboarding/grant-id');
  }

  return data;
};

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const session = await getSession();
  void getData(session.user?.id as string);
  const logOut = async () => {
    'use server';
    await signOut();
  };

  return (
    <>
      <div className="min-h-screen w-full grid md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr] ">
        <div className="hidden md:block border-r border-pink-200 dark:border-pink-700/40 bg-muted">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center border-b border-pink-200 dark:border-pink-700/40 px-4 lg:h-[60px] lg:px-6">
              <Logo />
            </div>
            <div className="flex-1">
              <nav className="grid items-start px-2 lg:px-4">
                <DashboardLinks />
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b border-pink-200 dark:border-pink-700/40 bg-muted px-4 lg:h-[60px]">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="md:hidden shrink-0" size="icon" variant="outline">
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2 mt-10">
                  <DashboardLinks />
                </nav>
              </SheetContent>
            </Sheet>

            <div className="ml-auto flex items-center gap-x-4">
              <ThemeToggler />

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <Image
                      src={session?.user?.image as string}
                      alt="Profile Image"
                      className="w-full h-full rounded-full object-cover"
                      width={24}
                      height={24}
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard/settings">Settings</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <form className="w-full" action={logOut}>
                      <button className="w-full text-left">Log out</button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">{children}</main>
        </div>
      </div>
      <Toaster richColors closeButton />
    </>
  );
};

export default DashboardLayout;
