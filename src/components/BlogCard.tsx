'use client';

import Link from 'next/link';
import { BlogPost } from '@/types/blog';
import Image from 'next/image';
import { getPostViewRoute } from '@/constants/routes';
import { useState } from 'react';
import { twMerge } from 'tailwind-merge';
import shareImg from '../../public/icons/share-img.svg';
import like from '../../public/icons/like.png';
import likeFilled from '../../public/icons/like-filled.png';
import { handleShare } from '@/util/handleShare';

interface BlogCardProps {
  post: BlogPost;
}
 
 

export default function BlogCard({ post }: BlogCardProps) {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const baseClasses = "flex items-center space-x-1 text-sm transition-colors";
  const likedClasses = isLiked ? 'text-red-500' : 'text-gray-500 hover:text-red-500';
  const isLoadingClass = isLoading ? 'animate-pulse' : '';
  const shareClasses = isShared ? 'text-green-500' : 'text-gray-500 hover:text-blue-500';
  return (
    <article className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow min-h-[320px] flex flex-col duration-200 border border-gray-100">
      <header className="mb-4">
        <h2 className="text-xl font-semibold mb-2 min-h-[3.5rem] leading-tight">
          <Link
            href={getPostViewRoute(post.slug)}
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            
            {post.title}
          </Link>
        </h2>
        
        <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
          <span className="font-medium">By {post.author}</span>
          <time dateTime={post.publishedAt} className="text-gray-400">
            {new Date(post.publishedAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </time>
        </div>
      </header>

      <div className="mb-4 flex-grow">
        <p className="text-gray-600 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
      </div>

      {post.tags && post.tags.length > 0 && (
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => {
              setIsLoading(true);
              setIsLiked(!isLiked);
              setLikes(prev => isLiked ? prev - 1 : prev + 1);
              setTimeout(() => setIsLoading(false), 300);
            }}
            disabled={isLoading}
            className={twMerge(baseClasses, likedClasses)}
          >
            <Image 
              src={isLiked ? likeFilled: like}
                   alt="Like"
                        width={20}
                height={20}
                 className={isLoadingClass}
/>
            <span>{likes}</span>
          </button>
          
          <button 
           onClick={async () => {
    setIsLoading(true);
    const success = await handleShare(post);
    if (success) {
      alert('Link copied to clipboard!');
      setIsShared(true);
      setTimeout(() => setIsShared(false), 2000);
    } else {
      alert('Failed to copy link');
    }
    setIsLoading(false);
  }}
  disabled={isLoading || isShared}
            className={twMerge(baseClasses,shareClasses)}
          >
            <Image src={shareImg} alt="Share Icon" className={twMerge("h-5 w-5",isLoadingClass)} />
            <span>{isShared ? 'Shared!' : 'Share'}</span>
          </button>
        </div>
        
        <Link
          href={getPostViewRoute(post.slug)}
          className="text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
        >
          Read More
        </Link>
      </div>

        </article>
  );
}
