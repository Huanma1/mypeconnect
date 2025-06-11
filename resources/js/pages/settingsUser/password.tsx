import { Head, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler } from 'react';

import HeadingSmall from '@/components/heading-small';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import SettingsUserLayout from '@/layouts/settings/layoutUser';
import { type BreadcrumbItem, type SharedData } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Password settings',
    href: '/settingsUser/password',
  },
];

type PasswordForm = {
  current_password: string;
  password: string;
  password_confirmation: string;
};

export default function Password() {
  const { auth } = usePage<SharedData>().props;

  const { data, setData, put, errors, processing, recentlySuccessful } = useForm<PasswordForm>({
    current_password: '',
    password: '',
    password_confirmation: '',
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();

    put(route('user.password.update'), {
      preserveScroll: true,
      onSuccess: () => {
        setData('current_password', '');
        setData('password', '');
        setData('password_confirmation', '');
      },
    });
  };

  return (
    <SettingsUserLayout breadcrumbs={breadcrumbs}>
      <Head title="Password settings" />

      <div className="space-y-6">
        <HeadingSmall
          title="Update your password"
          description="Ensure your account is using a long, random password to stay secure."
        />

        <form onSubmit={submit} className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="current_password">Current Password</Label>
            <Input
              id="current_password"
              type="password"
              value={data.current_password}
              onChange={(e) => setData('current_password', e.target.value)}
              autoComplete="current-password"
              required
            />
            <InputError message={errors.current_password} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password">New Password</Label>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              autoComplete="new-password"
              required
            />
            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="password_confirmation">Confirm New Password</Label>
            <Input
              id="password_confirmation"
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              autoComplete="new-password"
              required
            />
            <InputError message={errors.password_confirmation} className="mt-2" />
          </div>

          <div className="flex items-center gap-4">
            <Button disabled={processing}>Save</Button>

            {recentlySuccessful && (
              <p className="text-sm text-neutral-600">Password updated successfully.</p>
            )}
          </div>
        </form>
      </div>
    </SettingsUserLayout>
  );
}
