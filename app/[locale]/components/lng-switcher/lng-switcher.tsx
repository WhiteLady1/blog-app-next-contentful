'use client'

import { useRouter, usePathname } from "@/navigation";

interface LngSwitcherProps {
  locale: string;
};

export const LngSwitcher: React.FC<LngSwitcherProps> = ({
  locale,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const newLng = locale === 'en-US' ? 'cs' : 'en-US';
  
  const handleSwitchLng = (locale: string) => {
    router.replace(pathname, {locale: locale === 'en-US' ? 'cs' : 'en-US'});
  };
  return (
    <button onClick={() => handleSwitchLng(locale)}>Switch to {newLng}</button>
  );
};
