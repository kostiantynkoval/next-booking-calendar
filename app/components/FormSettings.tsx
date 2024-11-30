'use client';

import { useActionState, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { SubmitButton } from '@/app/components/submit-buttons/SubmitButton';
import { SettingsAction } from '@/app/actions';
import { useForm } from '@conform-to/react';
import { parseWithZod } from '@conform-to/zod';
import Image from 'next/image';
import { settingsSchema } from '@/app/lib/zodSchemas';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import { UploadDropzone } from '@/lib/uploadthing';
import { ClientUploadedFileData } from 'uploadthing/types';
import { toast } from 'sonner';

interface FormSettingsProps {
  name: string | null;
  email: string;
  image: string | null;
}
export const FormSettings = ({ name, email, image }: FormSettingsProps) => {
  const [lastResult, action] = useActionState(SettingsAction, undefined);
  const [currentProfileImage, setCurrentProfileImage] = useState(image);
  const [form, fields] = useForm({
    lastResult,
    onValidate: ({ formData }) => parseWithZod(formData, { schema: settingsSchema }),
    shouldValidate: 'onBlur',
    shouldRevalidate: 'onInput'
  });

  const handleDeleteImage = () => {
    setCurrentProfileImage(null);
  };

  const handleCompleteUpload = (res: ClientUploadedFileData<{ uploadedBy: string }>[]) => {
    setCurrentProfileImage(res[0].url);
    toast.success('Profile Image is uploaded successfully.');
  };

  const handleErrorUpload = (error: unknown) => {
    console.log('Something went wrong', error);
    toast.error('Error! Could not upload image.');
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>Manage your account settings!</CardDescription>
      </CardHeader>
      <form id={form.id} onSubmit={form.onSubmit} action={action} noValidate>
        <CardContent className="flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-2">
            <Label>Full Name</Label>
            <div>
              <Input
                key={fields.name.key}
                name={fields.name.name}
                defaultValue={name || ''}
                placeholder="John Doe"
              />
              <p className="text-red-600 text-xs">{fields.name.errors}</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
            <Label>Email</Label>
            <div>
              <Input
                key={fields.email.key}
                name={fields.email.name}
                defaultValue={email}
                placeholder="jonh.doe@test.com"
              />
              <p className="text-red-600 text-xs">{fields.email.errors}</p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <Label>Profile Image</Label>
            <input
              type="hidden"
              name={fields.image.name}
              key={fields.image.key}
              value={currentProfileImage || undefined}
            />
            <div>
              {currentProfileImage ? (
                <div className="relative size-16">
                  <Image
                    src={currentProfileImage}
                    className="object-cover"
                    width={64}
                    height={64}
                    alt="Profile Image"
                  />
                  <Button
                    onClick={handleDeleteImage}
                    size="icon"
                    type="button"
                    variant="destructive"
                    className="absolute -top-3 -right-3"
                  >
                    <X className="size-4" />
                  </Button>
                </div>
              ) : (
                <UploadDropzone
                  onClientUploadComplete={handleCompleteUpload}
                  endpoint="imageUploader"
                  onUploadError={handleErrorUpload}
                />
              )}
            </div>
            <p className="text-red-600 text-xs">{fields.image.errors}</p>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton text="Save Changes" />
        </CardFooter>
      </form>
    </Card>
  );
};
