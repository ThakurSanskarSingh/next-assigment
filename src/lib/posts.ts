import { BlogPost } from '@/types/blog';
import { CreatePostData, UpdatePostData } from '@/lib/validation';
import postsData from '@/data/posts.json';

// In-memory storage for development (replace with database in production)
let posts: BlogPost[] = [...postsData];

export async function getAllPosts(): Promise<BlogPost[]> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 100));
  return [...posts];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  return posts.find(post => post.slug === slug) || null;
}

export async function createPost(data: CreatePostData): Promise<BlogPost> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const newPost: BlogPost = {
    id: Date.now().toString(),
    slug: generateSlug(data.title),
    publishedAt: new Date().toISOString(),
    ...data,
    tags: data.tags || []
  };

  posts.push(newPost);
  return newPost;
}

export async function updatePost(slug: string, data: UpdatePostData): Promise<BlogPost | null> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const postIndex = posts.findIndex(post => post.slug === slug);
  if (postIndex === -1) return null;

  const existingPost = posts[postIndex];
  if (!existingPost) return null;

  const updatedPost: BlogPost = {
    id: existingPost.id,
    slug: existingPost.slug,
    publishedAt: existingPost.publishedAt,
    title: data.title || existingPost.title,
    content: data.content || existingPost.content,
    excerpt: data.excerpt || existingPost.excerpt,
    author: data.author || existingPost.author,
    tags: data.tags || existingPost.tags || []
  };

  posts[postIndex] = updatedPost;
  return updatedPost;
}

export async function deletePost(slug: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const postIndex = posts.findIndex(post => post.slug === slug);
  if (postIndex === -1) return false;

  posts.splice(postIndex, 1);
  return true;
}

export async function searchPosts(query: string): Promise<BlogPost[]> {
  await new Promise(resolve => setTimeout(resolve, 100));
  
  const searchTerm = query.toLowerCase();
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) ||
    post.content.toLowerCase().includes(searchTerm) ||
    post.excerpt.toLowerCase().includes(searchTerm) ||
    post.author.toLowerCase().includes(searchTerm) ||
    post.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
  );
}

// Helper function to generate URL-friendly slugs
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
