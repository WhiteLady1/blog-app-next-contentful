import Image from "next/image";
import { Document } from '@contentful/rich-text-types';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

interface BlogPostProps {
  title: string;
  description: Document;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
};

const BlogPost: React.FC<BlogPostProps> = ({
  title,
  description,
  imageUrl,
  imageWidth,
  imageHeight
}) => {
  return (
    <div>
      <h2></h2>
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

export default BlogPost;
