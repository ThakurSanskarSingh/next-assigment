'use server';

import { revalidatePath } from 'next/cache';
import { createPost, updatePost, deletePost } from '@/lib/posts';
import { validateCreatePost, validateUpdatePost } from '@/lib/validation';
import { ROUTES } from '@/constants/routes';

export async function createPostAction(formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const author = formData.get('author') as string;
  const tagsString = formData.get('tags') as string;
  
  const tags = tagsString
    ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  const postData = { title, content, excerpt, author, tags };
  
  const validation = validateCreatePost(postData);
  
  if (!validation.isValid) {
    return { success: false, message: validation.errors.join(', ') };
  }

  try {
    await createPost(postData);
    revalidatePath(ROUTES.ADMIN);
    revalidatePath(ROUTES.POSTS);
    return { success: true };
  } catch (error) {
    console.error('Error creating post:', error);
    return { success: false, message: 'Failed to create post. Please try again.' };
  }
}

export async function updatePostAction(slug: string, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  const excerpt = formData.get('excerpt') as string;
  const author = formData.get('author') as string;
  const tagsString = formData.get('tags') as string;
  
  const tags = tagsString
    ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean)
    : [];

  const postData = { title, content, excerpt, author, tags };
  
  const validation = validateUpdatePost(postData);
  
  if (!validation.isValid) {
    return { success: false, message: validation.errors.join(', ') };
  }

  try {
    const updatedPost = await updatePost(slug, postData);
    
    if (!updatedPost) {
      return { success: false, message: 'Post not found' };
    }
    
    revalidatePath(ROUTES.ADMIN);
    revalidatePath(`${ROUTES.POSTS}/${slug}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating post:', error);
    return { success: false, message: 'Failed to update post. Please try again.' };
  }
}

export async function deletePostAction(slug: string) {
  try {
    const success = await deletePost(slug);
    
    if (!success) {
      return { success: false, message: 'Post not found' };
    }
    
    revalidatePath(ROUTES.ADMIN);
    revalidatePath(ROUTES.POSTS);
    return { success: true };
  } catch (error) {
    console.error('Error deleting post:', error);
    return { success: false, message: 'Failed to delete post. Please try again.' };
  }
}