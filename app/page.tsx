import { Asset, Entry, EntryFieldTypes, createClient } from 'contentful';
import { BlogPostSkeleton } from './posts/[slug]/page';
import BlogPostPreview from './components/blog-post-preview/blog-post-preview';

import './homepage.css';

interface ContactSkeleton {
  contentTypeId: 'contact';
  fields: {
    name: EntryFieldTypes.Text;
    email: EntryFieldTypes.Text;
    lindedin: EntryFieldTypes.Text;
  }
};

interface HomepageDataSkeleton {
  contentTypeId: 'homapage';
  fields: {
    title: EntryFieldTypes.Text;
    selectedPost: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<BlogPostSkeleton>>;
    contact: EntryFieldTypes.EntryLink<ContactSkeleton>
  }
};

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID || '',
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN || ''
});

const getHomepageData = async () => {
  const res = await client.getEntries<HomepageDataSkeleton>({
    content_type: 'homapage',
    locale: 'cs',
  });
  return res.items[0];
};

export default async function Home() {
  const homepageData = await getHomepageData();

  console.log(homepageData)

  const selectedPosts = homepageData.fields.selectedPost as Entry<BlogPostSkeleton , undefined, string>[];
  const contact = homepageData.fields.contact as Entry<ContactSkeleton, undefined, string>;

  return (
    <div className='homepage'>
      <h1 className='homepage__title'>{homepageData.fields.title}</h1>
      <div className='homepage__selected-posts'>
        {selectedPosts.map(post => {
          const image = post.fields.image as Asset<undefined, string>;
          return (
            <BlogPostPreview
              key={post.sys.id}
              title={post.fields.title}
              href={`/posts/${post.fields.slug}`}
              imageUrl={`https:${image.fields.file?.url}`}
              imageWidth={image.fields.file?.details.image?.width || 200}
              imageHeight={image.fields.file?.details.image?.height || 100}
            />
          )
        })}
      </div>
      <div className='homepage__contacts'>
        <p>{contact.fields.name}</p>
        <p>{contact.fields.email}</p>
        <a href={contact.fields.lindedin} target='_blank'>LinkedIn</a>
      </div>
    </div>
  );
};
