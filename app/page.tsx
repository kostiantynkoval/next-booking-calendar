import { signIn } from '@/app/lib/auth';

export default function Home() {
  return (
    <>
      <h1>Hello World!!!!!</h1>
      <form
        action={async () => {
          'use server';
          await signIn('facebook');
        }}
      >
        <button type="submit">Signin with Facebook</button>
      </form>
    </>
  );
}
