import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Logo } from '@/app/components/Logo';
import { signIn } from '@/app/lib/auth';
import { GoogleAuthButton } from '@/app/components/submit-buttons/GoogleAuthButton';
import { FacebookAuthButton } from '@/app/components/submit-buttons/FacebookAuthButton';

export const AuthModal = () => {
  const signInWithGoogle = async () => {
    'use server';
    await signIn('google');
  };

  const signInWithFacebook = async () => {
    'use server';
    await signIn('facebook');
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Try for Free</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[360px]">
        <DialogHeader>
          <Logo isDialogTitle />
        </DialogHeader>
        <DialogDescription className="flex flex-col mt-5 gap-2">
          Please choose method to sign in
        </DialogDescription>
        <form className="w-full" action={signInWithGoogle}>
          <GoogleAuthButton />
        </form>
        <form className="w-full" action={signInWithFacebook}>
          <FacebookAuthButton />
        </form>
      </DialogContent>
    </Dialog>
  );
};
