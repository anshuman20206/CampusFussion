import { z } from 'zod';

export const blogFormSchema = z.object({
  title: z.string().min(5, { message: 'Title must be at least 5 characters long.' }),
  slug: z.string().min(3, { message: 'Slug must be at least 3 characters long.' }).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { message: 'Slug must be lowercase with words separated by dashes (e.g., my-new-post).' }),
  excerpt: z.string().min(10, { message: 'Excerpt must be at least 10 characters long.' }).max(200, { message: 'Excerpt cannot be longer than 200 characters.' }),
  content: z.string().min(50, { message: 'Content must be at least 50 characters long.' }),
  authorName: z.string().min(2, { message: 'Author name is required.' }),
});

export type BlogFormValues = z.infer<typeof blogFormSchema>;
