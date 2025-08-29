import { getPostViewRoute } from '@/constants/routes';
import { BlogPost } from '@/types/blog';

export async function handleShare(post: BlogPost): Promise<boolean> {
  try {
    const shareUrl = window.location.origin + getPostViewRoute(post.slug);
    await navigator.clipboard.writeText(shareUrl);
    return true;
  } catch (err) {
    console.error('Failed to copy link:', err);
    return false;
  }
}
