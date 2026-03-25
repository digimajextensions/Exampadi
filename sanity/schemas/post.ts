export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string', validation: (Rule: any) => Rule.required() },
    { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title', maxLength: 96 } },
    { name: 'excerpt', title: 'Excerpt', type: 'text', rows: 3 },
    { name: 'mainImage', title: 'Main Image', type: 'image', options: { hotspot: true } },
    { name: 'categories', title: 'Categories', type: 'array', of: [{ type: 'reference', to: { type: 'category' } }] },
    { name: 'body', title: 'Body', type: 'blockContent' },
    { name: 'seoTitle', title: 'SEO Title', type: 'string' },
    { name: 'seoDescription', title: 'SEO Description', type: 'text', rows: 2 },
    { name: 'publishedAt', title: 'Published At', type: 'datetime' },
    { name: 'author', title: 'Author', type: 'reference', to: { type: 'author' } },
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'mainImage' },
    prepare(selection: any) {
      const { author } = selection;
      return { ...selection, subtitle: author && `by ${author}` };
    },
  },
};
