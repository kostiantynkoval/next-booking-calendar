import React from 'react';
import { FormSettings } from '@/app/components/FormSettings';
import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { auth } from '@/app/lib/auth';

const getData = async (id: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id
    },
    select: { name: true, email: true, image: true }
  });

  if (!data) {
    return notFound();
  }

  return data;
};

const SettingsPage = async () => {
  const session = await auth();
  const data = await getData(session?.user?.id as string);
  const { name, email, image } = data;
  return <FormSettings name={name} email={email} image={image} />;
};

export default SettingsPage;
