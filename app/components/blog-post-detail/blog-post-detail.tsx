import Image from "next/image";
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export interface BlogPostDetailProps {
  title: string;
  description: Document;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
};

const BlogPostDetail: React.FC<BlogPostDetailProps> = ({
  title,
  description,
  imageUrl,
  imageWidth,
  imageHeight
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <Image
        src={imageUrl}
        alt={`${title} image`}
        width={imageWidth}
        height={imageHeight}
        priority
      />
      <div>{documentToReactComponents(description)}</div>
    </div>
  );
};

export default BlogPostDetail;
