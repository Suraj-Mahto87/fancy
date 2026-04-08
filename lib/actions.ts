'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function login(formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  const expectedEmail = process.env.LOGIN_EMAIL || 'admin@fancy.global';
  const expectedPassword = process.env.LOGIN_PASSWORD || 'fancyadmin123';

  if (email === expectedEmail && password === expectedPassword) {
    const cookieStore = await cookies();
    cookieStore.set('auth_session', 'logged_in', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: '/',
    });
    return { success: true };
  }

  return { success: false, error: 'Invalid credentials' };
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete('auth_session');
  redirect('/login');
}
