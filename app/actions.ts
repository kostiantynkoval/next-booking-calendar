'use server';

import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import prisma from '@/app/lib/db';
import { getSession } from '@/app/utils/getSession';
import { onboardingSchemaValidation } from '@/app/lib/zodSchemas';

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

  return redirect('/dashboard');
};
