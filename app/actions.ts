'use server';

import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import prisma from '@/app/lib/db';
import { getSession } from '@/app/utils/getSession';
import { onboardingSchemaValidation, settingsSchema } from '@/app/lib/zodSchemas';
import { auth } from '@/app/lib/auth';

export const OnboardingAction = async (_: unknown, formData: FormData) => {
  const session = await getSession();

  const submission = await parseWithZod(formData, {
    schema: onboardingSchemaValidation({
      async isUsernameUnique() {
        const existingUserName = await prisma.user.findUnique({
          where: {
            userName: formData.get('userName') as string
          }
        });

        return !existingUserName;
      }
    }),
    async: true
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.user.update({
    where: { id: session.user?.id },
    data: { userName: submission.value.userName, name: submission.value.fullName }
  });

  return redirect('/onboarding/grant-id');
};

export const SettingsAction = async (_: unknown, formData: FormData) => {
  const session = await auth();

  const submission = await parseWithZod(formData, {
    schema: settingsSchema
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  const user = await prisma.user.update({
    where: {
      id: session?.user?.id
    },
    data: {
      name: submission.value.name,
      image: submission.value.image
    }
  });

  return redirect('/dashboard');
};
