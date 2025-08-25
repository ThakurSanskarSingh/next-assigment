export interface CreatePostData {
  title: string;
  content: string;
  excerpt: string;
  author: string;
  tags?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {
  id?: string;
}

export function validateCreatePost(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!data.title || typeof data.title !== 'string' || data.title.trim().length < 3) {
    errors.push('Title must be at least 3 characters long');
  }

  if (!data.content || typeof data.content !== 'string' || data.content.trim().length < 10) {
    errors.push('Content must be at least 10 characters long');
  }

  if (!data.excerpt || typeof data.excerpt !== 'string' || data.excerpt.trim().length < 10) {
    errors.push('Excerpt must be at least 10 characters long');
  }

  if (!data.author || typeof data.author !== 'string' || data.author.trim().length < 2) {
    errors.push('Author must be at least 2 characters long');
  }

  if (data.tags && (!Array.isArray(data.tags) || data.tags.some((tag: any) => typeof tag !== 'string'))) {
    errors.push('Tags must be an array of strings');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateUpdatePost(data: any): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (data.title !== undefined && (typeof data.title !== 'string' || data.title.trim().length < 3)) {
    errors.push('Title must be at least 3 characters long');
  }

  if (data.content !== undefined && (typeof data.content !== 'string' || data.content.trim().length < 10)) {
    errors.push('Content must be at least 10 characters long');
  }

  if (data.excerpt !== undefined && (typeof data.excerpt !== 'string' || data.excerpt.trim().length < 10)) {
    errors.push('Excerpt must be at least 10 characters long');
  }

  if (data.author !== undefined && (typeof data.author !== 'string' || data.author.trim().length < 2)) {
    errors.push('Author must be at least 2 characters long');
  }

  if (data.tags !== undefined && (!Array.isArray(data.tags) || data.tags.some((tag: any) => typeof tag !== 'string'))) {
    errors.push('Tags must be an array of strings');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
