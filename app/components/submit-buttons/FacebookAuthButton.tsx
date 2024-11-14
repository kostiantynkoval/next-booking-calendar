'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import FacebookIcon from '@/public/facebook.svg';

export const FacebookAuthButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} variant="outline" className="w-full">
      {pending ? (
        <>
          <Loader2 className="size-4 mr-2 animate-spin" />
          <span>&nbsp;Please wait ...</span>
        </>
      ) : (
        <>
          <Image src={FacebookIcon} alt="Facebook Icon" className="size-4 mr-2" />
          <span>&nbsp;Sign in with Facebook</span>
        </>
      )}
    </Button>
  );
};
