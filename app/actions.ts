'use server';

import { redirect } from 'next/navigation';
import { parseWithZod } from '@conform-to/zod';
import prisma from '@/app/lib/db';
import { getSession } from '@/app/utils/getSession';
import { onboardingSchemaValidation, settingsSchema } from '@/app/lib/zodSchemas';
import { auth } from '@/app/lib/auth';
import { revalidatePath } from 'next/cache';

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
    data: {
      userName: submission.value.userName,
      name: submission.value.fullName,
      availability: {
        createMany: {
          data: [
            {
              day: 'Monday',
              fromTime: '08:00',
              tillTime: '18:00'
            },
            {
              day: 'Tuesday',
              fromTime: '08:00',
              tillTime: '18:00'
            },
            {
              day: 'Wednesday',
              fromTime: '08:00',
              tillTime: '18:00'
            },
            {
              day: 'Thursday',
              fromTime: '08:00',
              tillTime: '18:00'
            },
            {
              day: 'Friday',
              fromTime: '08:00',
              tillTime: '18:00'
            },
            {
              day: 'Saturday',
              fromTime: '08:00',
              tillTime: '18:00'
            },
            {
              day: 'Sunday',
              fromTime: '08:00',
              tillTime: '18:00'
            }
          ]
        }
      }
    }
  });

  return redirect('/onboarding/grant-id');
};

export const SettingsAction = async (_: unknown, formData: FormData) => {
  const session = await auth();

  const submission = parseWithZod(formData, {
    schema: settingsSchema
  });

  if (submission.status !== 'success') {
    return submission.reply();
  }

  await prisma.user.update({
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

export const updateAvailabilityAction = async (formData: FormData) => {
  const session = await getSession();
  const rawData = Object.fromEntries(formData.entries());
  const availabiltyData = Object.keys(rawData)
    .filter((key) => key.startsWith('id-'))
    .map((key) => {
      const id = key.replace('id-', '');
      return {
        id,
        isActive: rawData[`isActive-${id}`] === 'on',
        fromTime: rawData[`fromTime-${id}`] as string,
        tillTime: rawData[`tillTime-${id}`] as string
      };
    });

  try {
    await prisma.$transaction(
      availabiltyData.map(({ id, isActive, fromTime, tillTime }) =>
        prisma.availability.update({
          where: { id },
          data: {
            isActive,
            fromTime,
            tillTime
          }
        })
      )
    );
    revalidatePath('/dashboard/availability/');
  } catch (error) {
    console.error(error);
  }
};
