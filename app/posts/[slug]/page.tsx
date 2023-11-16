import { Asset, createClient } from 'contentful';
import { BlogPostSkeleton } from '@/app/page';
import BlogPost from "@/app/components/blog-post/blog-post";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
});

const getBlogPost = async (postSlug: string) => {
  const res = await client.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    'fields.slug': postSlug,
  });
  return res.items[0];
};

// export async function generateStaticParams() {
//   const posts = await client.getEntries<BlogPostSkeleton>({ content_type: 'blogPost' });

//   return posts.items.map((post) => (
//     {
//       slug: post.fields.slug,
//     }
//   ))
// };

export default async function PostPage({params}:{params: {slug: string}}) {
  const blogPost = await getBlogPost(params.slug);
  const postImage = blogPost.fields.image as Asset<undefined, string>;

  return (
    <>
      <p>{params.slug}</p>
      <p>{blogPost.fields.title}</p>
      <BlogPost
        title={blogPost.fields.title}
        description={blogPost.fields.description}
        imageUrl={`https:${postImage.fields.file?.url}`}
        imageWidth={postImage.fields.file?.details.image?.width || 200}
        imageHeight={postImage.fields.file?.details.image?.height || 100}
      />
    </>
  );
};
