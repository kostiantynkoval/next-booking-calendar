import prisma from '@/app/lib/db';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { getSession } from '@/app/utils/getSession';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { TIMES } from '@/lib/times';
import { SubmitButton } from '@/app/components/submit-buttons/SubmitButton';
import { updateAvailabilityAction } from '@/app/actions';

const getData = async (userId: string) => {
  const data = await prisma.availability.findMany({
    where: {
      userId
    }
  });

  if (!data) {
    return notFound();
  }

  return data;
};

const AvailabilityPage = async () => {
  const session = await getSession();
  const data = await getData(session?.user?.id as string);
  return (
    <Card>
      <CardHeader>
        <CardTitle>Availability</CardTitle>
        <CardDescription>In this section you can manage your availability</CardDescription>
      </CardHeader>
      <form action={updateAvailabilityAction}>
        <CardContent className="flex flex-col gap-y-4">
          {data.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 items-center gap-4"
            >
              <input type="hidden" name={`id-${item.id}`} value={item.id} />
              <div className="flex items-center gap-3">
                <Switch name={`isActive-${item.id}`} defaultChecked={item.isActive} />
                <p>{item.day}</p>
              </div>
              <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="From Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {TIMES.map(({ time, id }) => (
                      <SelectItem key={id} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Till Time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {TIMES.map(({ time, id }) => (
                      <SelectItem key={id} value={time}>
                        {time}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          ))}
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};

export default AvailabilityPage;
