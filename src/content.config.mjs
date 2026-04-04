import { z, defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';

const calendarCollection = defineCollection({
  loader: glob({ pattern: '**/*.yml', base: './src/content/calendar' }),
  schema: z.object({
    date: z.coerce.date(),
    dateEnd: z.coerce.date().optional(),
    title: z.string(),
    description: z.string().optional(),
    time: z.string().optional(),
    location: z.string().optional()
  })
});

const newsCollection = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/news' }),
  schema: z.object({
    date: z.coerce.date(),
    title: z.string(),
    blurb: z.string().optional()
  })
});

export const collections = {
  calendar: calendarCollection,
  news: newsCollection
};
