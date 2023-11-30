import React from "react";
import { Link } from '@/navigation';

import {useTranslations} from 'next-intl';

interface BackButtonProps {
  locale: string;
};

export const BackButton: React.FC<BackButtonProps> = ({
  locale
}) => {
  const t = useTranslations('Index');
  const lng = locale === 'en-US'? 'en-US' : 'cs';

  return (
    <Link href="/" locale={lng}>{t('backLink')}</Link>

  );
};