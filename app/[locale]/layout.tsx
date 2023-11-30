import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {unstable_setRequestLocale} from 'next-intl/server';

import './globals.css';
import './homepage.css';
import { LngSwitcher } from './components/lng-switcher/lng-switcher';

const locales = ['en-US', 'cs'];

export function generateStaticParams() {
  return locales.map((locale) => ({locale}));
}

export const metadata: Metadata = {
  title: 'Blog app',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
  params
}: {
  children: React.ReactNode,
  params: { locale: string }
}) {
  if (!locales.includes(params.locale as any)) notFound();

  unstable_setRequestLocale(params.locale);

  return (
    <html lang={params.locale}>
      <body>
        <LngSwitcher locale={params.locale} />
        {children}
      </body>
    </html>
  );
};
