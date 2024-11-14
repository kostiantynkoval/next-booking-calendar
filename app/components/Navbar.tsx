import { AuthModal } from '@/app/components/AuthModal';
import { Logo } from '@/app/components/Logo';

export const Navbar = () => {
  return (
    <div className="flex py-5 items-center justify-between ">
      <Logo />
      <AuthModal />
    </div>
  );
};
