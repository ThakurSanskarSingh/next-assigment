import { z, ZodIssue } from "zod";


export const CreatePostSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters long"),
  content: z.string().min(10, "Content must be at least 10 characters long"),
  excerpt: z.string().min(10, "Excerpt must be at least 10 characters long"),
  author: z.string().min(2, "Author must be at least 2 characters long"),
  tags: z.array(z.string()).optional(),
});

export const UpdatePostSchema = CreatePostSchema.partial().extend({
  id: z.string().optional(),
});

export type CreatePostData = z.infer<typeof CreatePostSchema>;
export type UpdatePostData = z.infer<typeof UpdatePostSchema>;


export function validateCreatePost(data: unknown) {
  const result = CreatePostSchema.safeParse(data);
  return {
    isValid: result.success,
   errors: result.success ? [] : result.error.issues.map((err: ZodIssue) => `${err.path.join(".")}: ${err.message}`),

  };
}

export function validateUpdatePost(data: unknown) {
  const result = UpdatePostSchema.safeParse(data);
  return {
    isValid: result.success,
  errors: result.success
    ? []
    : result.error.issues.map((err: ZodIssue) => `${err.path.join(".")}: ${err.message}`),
};
}


