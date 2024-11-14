import Image from 'next/image';
import Link from 'next/link';
import ImageLogo from '@/public/logo.png';
import { DialogTitle } from '@/components/ui/dialog';

export const Logo = ({ isDialogTitle }: { isDialogTitle?: boolean }) => {
  return (
    <Link href="/public" className="flex items-center gap-2">
      <Image src={ImageLogo} alt="Logo - letters M and K" className="size-10" />
      {isDialogTitle ? (
        <DialogTitle className="text-3xl font-semibold text-gray-600">Maiia Nails</DialogTitle>
      ) : (
        <h4 className="text-3xl font-semibold text-gray-600">Maiia Nails</h4>
      )}
    </Link>
  );
};
