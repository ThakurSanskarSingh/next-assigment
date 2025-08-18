import { BlogPost } from '@/types/blog';
import postsData from '@/data/posts.json';

export async function getAllPosts(): Promise<BlogPost[]> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return postsData as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  const post = postsData.find(post => post.slug === slug);
  return post as BlogPost || null;
}

export async function getPostById(id: string): Promise<BlogPost | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  const post = postsData.find(post => post.id === id);
  return post as BlogPost || null;
}