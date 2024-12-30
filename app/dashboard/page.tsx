import { getSession } from '@/app/utils/getSession';
import prisma from '@/app/lib/db';
import { notFound } from 'next/navigation';
import EmptyState from '@/app/components/EmptyState';

const getData = async (userId: string) => {
  const data = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      userName: true,
      eventType: {
        select: {
          id: true,
          active: true,
          title: true,
          url: true,
          duration: true
        }
      }
    }
  });

  if (!data) {
    return notFound();
  }

  return data;
};

const DashboardPage = async () => {
  const session = await getSession();
  const data = await getData(session?.user?.id as string);

  return data.eventType.length === 0 ? (
    <EmptyState
      title="You have no Event Types"
      href="/dashboard/new"
      buttonText="Add Event Type"
      description="You can create your first event type by clicking the button below"
    />
  ) : (
    <p>we have something</p>
  );
};

export default DashboardPage;
