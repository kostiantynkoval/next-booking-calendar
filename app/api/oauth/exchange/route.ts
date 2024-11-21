import { NextRequest } from 'next/server';
import { redirect } from 'next/navigation';
import { nylas, nylasConfig } from '@/app/lib/nylas';
import prisma from '@/app/lib/db';
import { auth } from '@/app/lib/auth';

export const GET = async (req: NextRequest) => {
  const session = await auth();
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return Response.json('We did not receive the code', { status: 401 });
  }

  try {
    const response = await nylas.auth.exchangeCodeForToken({
      clientId: nylasConfig.clientId,
      redirectUri: nylasConfig.redirectUri,
      clientSecret: nylasConfig.apiKey,
      code
    });

    const { grantId, email: grantEmail } = response;

    await prisma.user.update({
      where: {
        id: session?.user?.id
      },
      data: {
        grantId,
        grantEmail
      }
    });
  } catch (error) {
    console.error('Error: ', error);
  }

  redirect('/dashboard');
};
