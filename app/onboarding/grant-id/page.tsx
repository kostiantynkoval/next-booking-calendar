import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { CalendarCheck2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const OnboardingRouteTwo = () => {
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <span>Welcome to Maiia</span>&nbsp;
            <span className="text-pink-700">Nails</span>
          </CardTitle>
          <CardDescription>We need following information to set up your profile</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-y-2">
          <Button asChild className="w-full">
            <div>
              <CalendarCheck2 className="size-4 mr-2" />
              <Link href="/api/auth">Connect calendar to your account</Link>
            </div>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingRouteTwo;
