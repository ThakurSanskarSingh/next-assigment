'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BlogPost } from '@/types/blog';
import { ROUTES } from '@/constants/routes';
import { CreatePostSchema } from '@/lib/validation';
import Image from 'next/image';
import error from '../../public/icons/search-dot.png';
import { useForm } from 'react-hook-form';
import z from 'zod';

 type PostFormData = z.infer<typeof CreatePostSchema>;
interface PostFormProps {
  post?: BlogPost;
  onSubmit: (formData: FormData) => Promise<{ success: boolean; message?: string }>;
  isSubmitting?: boolean;
}

export default function PostForm({ post, onSubmit, isSubmitting = false }: PostFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState('');

  const errorClass = "text-red-500 text-sm mt-1"


   const {register, handleSubmit, formState: { errors }} = useForm<PostFormData>({
    defaultValues: {
      title: post?.title || '',
      excerpt: post?.excerpt || '',
      content: post?.content || '',
      author: post?.author || '',
      tags: post?.tags ?? []
    }
   })
  const onFormSubmit = async (data: PostFormData) => {
    setSubmitError('');
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('excerpt', data.excerpt);
    formData.append('content', data.content);
    formData.append('author', data.author);
    formData.append('tags', Array.isArray(data.tags) ? data.tags.join(',') : (data.tags || '')); 

    try {
      const result = await onSubmit(formData);
      if (result.success) {
        router.push(ROUTES.ADMIN);
        router.refresh();
      } else if (result.message) {
        setSubmitError(result.message);
      } 
    } catch (error) {
      setSubmitError('An unexpected error occurred. Please try again.');
      console.error('Form submission error:', error);
    }
  };

  const allErrors = [...submitError ? [submitError] : [], ...Object.values(errors).map(err => err?.message || '').filter(Boolean)];
   
  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      {allErrors.length > 0 && (
        <div className="bg-red-50 p-4 rounded-md">
          <div className="flex">
            <div className="flex-shrink-0">
             <Image src={error} height={5} width={5} alt='dot'/>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">There were errors with your submission:</h3>
              <div className="mt-2 text-sm text-red-700">
                <ul className="list-disc pl-5 space-y-1">
                  {allErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.title && (
          <p className={errorClass}>{errors.title.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700">Excerpt</label>
        <textarea
          id="excerpt"
          required
          rows={3}
          {...register('excerpt')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.excerpt && (
          <p className= {errorClass}>{errors.excerpt.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea
          id="content"
          required
          rows={8}
         {...register('content')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.content && (
          <p className={errorClass}>{errors.content.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="author" className="block text-sm font-medium text-gray-700">Author</label>
        <input
          type="text"
          id="author"
          required
         {...register('author')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
        {errors.author && (
          <p className={errorClass}>{errors.author.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
        <input
          type="text"
          id="tags"
        {...register('tags')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="technology, news, tutorial"
        />
        {errors.tags && (
          <p className={errorClass}>{errors.tags.message}</p>
        )}
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          onClick={() => router.push(ROUTES.ADMIN)}
          className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Saving...' : post ? 'Update Post' : 'Create Post'}
        </button>
      </div>
    </form>
  );
}