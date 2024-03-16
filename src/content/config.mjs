import { z, defineCollection } from 'astro:content';

const calendarCollection = defineCollection({
  type: 'data',
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
  type: 'content',
  schema: z.object({
    date: z.coerce.date(),
    title: z.string()
  })
});

export const collections = {
  calendar: calendarCollection,
  news: newsCollection
};
