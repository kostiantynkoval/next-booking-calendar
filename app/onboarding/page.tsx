'use client';

import React, { useActionState } from 'react';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import { OnboardingAction } from '@/app/actions';
import { onboardingSchema } from '@/app/lib/zodSchemas';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/app/components/submit-buttons/SubmitButton';

const OnboardingRoute = () => {
  const [lastResult, action] = useActionState(OnboardingAction, undefined);

  const [form, fields] = useForm({
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema: onboardingSchema });
    },
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  });
  return (
    <div className="min-h-screen w-screen flex items-center justify-center">
      <Card>
        <CardHeader>
          <CardTitle>
            <span>Welcome to Maiia</span>&nbsp;
            <span className="text-pink-700">Nails</span>
          </CardTitle>
          <CardDescription>We need following information to set up your profile</CardDescription>
        </CardHeader>
        <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
          <CardContent className="flex flex-col gap-y-2">
            <div className="flex flex-col gap-y-2">
              <Label>Full Name</Label>
              <div>
                <Input
                  name={fields.fullName.name}
                  defaultValue={fields.fullName.initialValue}
                  key={fields.fullName.key}
                  placeholder="Your name"
                />
                <p className="text-red-600 text-xs">{fields.fullName.errors}</p>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label>Username</Label>
              <div>
                <div className="flex rounded-md">
                  <span className="flex shrink-0 items-center px-3 rounded-l-md border border-r-0 border-muted bg-muted text-sm text-muted-foreground">
                    https://maiia-nails.com/
                  </span>
                  <Input
                    placeholder="naillover"
                    className="rounded-l-none"
                    name={fields.userName.name}
                    defaultValue={fields.userName.initialValue}
                    key={fields.userName.key}
                  />
                </div>
                <p className="text-red-600 text-xs">{fields.userName.errors}</p>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <SubmitButton className="w-full" text="Submit" />
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default OnboardingRoute;
