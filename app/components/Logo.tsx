import Image from 'next/image';
import Link from 'next/link';
import ImageLogo from '@/public/logo.png';
import { DialogTitle } from '@/components/ui/dialog';

export const Logo = ({ isDialogTitle }: { isDialogTitle?: boolean }) => {
  return (
    <Link href="/" className="flex items-center gap-2">
      <Image src={ImageLogo} alt="Logo - letters M and K" className="size-10 rounded-3xl" />
      {isDialogTitle ? (
        <DialogTitle className="text-3xl font-semibold text-gray-600">
          <span>Maiia</span>&nbsp;
          <span className="text-pink-700">Nails</span>
        </DialogTitle>
      ) : (
        <h4 className="text-2xl lg:text-3xl font-semibold text-gray-600">
          <span>Maiia</span>&nbsp;
          <span className="text-pink-700">Nails</span>
        </h4>
      )}
    </Link>
  );
};
