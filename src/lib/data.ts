import { BlogPost } from '@/types/blog';
import postsData from '@/data/posts.json';

export async function getAllPosts(): Promise<BlogPost[]> {
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

export async function getAdjacentPosts(slug: string): Promise<{ previous: BlogPost | null; next: BlogPost | null }> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const posts = postsData as BlogPost[];
  const currentIndex = posts.findIndex(post => post.slug === slug);
  
  if (currentIndex === -1) {
    return { previous: null, next: null };
  }
  
  const previous = currentIndex > 0 ? posts[currentIndex - 1] || null : null;
  const next = currentIndex < posts.length - 1 ? posts[currentIndex + 1] || null : null;
  
  return { previous, next };
}
