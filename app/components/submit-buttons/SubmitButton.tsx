'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubmitButtonProps {
  text: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | null;
  className?: string;
}

export const SubmitButton = ({ text, variant, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      variant={pending ? 'outline' : variant}
      type="submit"
      className={cn('w-fit', className)}
    >
      {pending ? (
        <>
          <Loader2 className="size-4 mr-2 animate-spin" />
          <span>&nbsp;Please wait ...</span>
        </>
      ) : (
        text
      )}
    </Button>
  );
};
