'use client'

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import React from "react";

interface LanguageSwitcherProps {
  currentLanguage: string;
};

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  currentLanguage,
}) => {
  const router = useRouter();
  const pathName = usePathname();
  const newLanguage = currentLanguage === 'en-US' ? 'cs' : 'en-US';

  const setCookie = (name: string, value: string, expirationDays:number) => {
    const d = new Date();
    d.setTime(d.getTime() + (expirationDays * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`
  };

  const redirectedPathName = (locale: string) => {
    if (!pathName) return '/'
    const segments = pathName.split('/')
    segments[1] = locale
    return segments.join('/')
  }

  const switchLanguage = (language: string) => {
    setCookie('NEXT_LOCALE', language, 1);
    console.log(redirectedPathName(language));
    router.replace(redirectedPathName(language));
  };

  return (
    <button onClick={() => switchLanguage(newLanguage)}>{newLanguage}</button>
  );
};

export default LanguageSwitcher;
