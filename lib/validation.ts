import { z } from "zod";

export const startupSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(20).max(5000),
  category: z.string().min(3).max(100),
  link: z.string().url(),
  pitch: z.string().min(10),
});

export type TStartupSchema = z.infer<typeof startupSchema>;
