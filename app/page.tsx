import { Asset, EntryFieldTypes, createClient } from 'contentful';
import Image from 'next/image';
import Link from 'next/link';

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

const getBlogPosts = async () => {
  const res = await client.getEntries<BlogPostSkeleton>({ content_type: 'blogPost' });
  return res.items;
}

export default async function Home() {
  const blogPosts = await getBlogPosts();

  return (
    <main>
      {blogPosts.map(post => {
        const image = post.fields.image as Asset<undefined, string>
        return (
          <div key={post.sys.id}>
            <h2>{post.fields.title}</h2>
            <Image
              src={`https:${image.fields.file?.url}`}
              alt={`${post.fields.title} image`}
              width={image.fields.file?.details.image?.width}
              height={image.fields.file?.details.image?.height}
            />
            <Link href={`/posts/${post.fields.slug}`}>Detail</Link>
          </div>
        )
      })}
    </main>
  )
}
