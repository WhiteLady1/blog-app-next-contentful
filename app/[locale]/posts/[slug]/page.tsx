import { Asset, EntryFieldTypes, createClient } from 'contentful';
import BlogPostDetail from '@/app/[locale]/components/blog-post-detail/blog-post-detail';
import { notFound } from 'next/navigation';
import {unstable_setRequestLocale} from 'next-intl/server';

import '../../globals.css';
import { BackButton } from '../../components/back-button/back-button';

const locales = ['en-US', 'cs'];

 export interface BlogPostSkeleton {
  contentTypeId: 'blogPost';
  fields: {
    title: EntryFieldTypes.Text;
    slug: EntryFieldTypes.Text;
    description: EntryFieldTypes.RichText;
    image: EntryFieldTypes.AssetLink;
  }
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
});

const getBlogPost = async (postSlug: string, locale: string) => {
  const res = await client.getEntries<BlogPostSkeleton>({
    content_type: 'blogPost',
    'sys.id': postSlug,
    locale: locale
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

export default async function PostPage({params}:{params: {slug: string, locale: string}}) {
  if (!locales.includes(params.locale as any)) notFound();

  unstable_setRequestLocale(params.locale);

  const blogPost = await getBlogPost(params.slug, params.locale);
  const postImage = blogPost.fields.image as Asset<undefined, string>;

  console.log(blogPost);

  return (
    <>
      <BackButton locale={params.locale} />
      <BlogPostDetail
        title={blogPost.fields.title}
        description={blogPost.fields.description}
        imageUrl={`https:${postImage.fields.file?.url}`}
        imageWidth={postImage.fields.file?.details.image?.width || 200}
        imageHeight={postImage.fields.file?.details.image?.height || 100}
      />
    </>
  );
};
