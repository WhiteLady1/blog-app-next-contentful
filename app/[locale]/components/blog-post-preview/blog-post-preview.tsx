import Image from "next/image";
import Link from "next/link";

import {useTranslations} from 'next-intl';

interface BlogPostPreviewProprs {
  title: string;
  href: string
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
};

const BlogPostPreview: React.FC<BlogPostPreviewProprs> = ({
  title,
  href,
  imageUrl,
  imageWidth,
  imageHeight
}) => {
  const t = useTranslations('Index');

  return (
    <Link
      href={href}
    >
      <Image
        src={imageUrl}
        alt={`${title} image`}
        width={imageWidth}
        height={imageHeight}
      />
      <h2>{title}</h2>
      <p>{t('title')}</p>
    </Link>
  );
};

export default BlogPostPreview;
