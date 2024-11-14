import { getSession } from '@/app/utils/getSession';

const DashboardPage = async () => {
  const session = await getSession();
  console.log(session);
  return (
    <div>
      <h1>Hello from Dashboard</h1>
    </div>
  );
};

export default DashboardPage;
