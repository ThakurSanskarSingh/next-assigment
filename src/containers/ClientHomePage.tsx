'use client';
import BlogCard from '@/components/BlogCard';
import { useState, useEffect, ReactNode } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchFilter from '@/components/SearchFilter';
import { searchPosts } from '@/lib/posts';
import { BlogPost } from '@/types/blog';

interface ClientHomePageProps {
  children: ReactNode;
}

export default function ClientHomePage({ children }: ClientHomePageProps) {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialTags = searchParams.get('tags') ? searchParams.get('tags')!.split(',') : [];
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isClientSide, setIsClientSide] = useState(false);

  useEffect(() => {
    setIsClientSide(true);
    
    const extractPostsFromDOM = () => {
      
      searchPosts('').then(posts => {
        setAllPosts(posts);
        setFilteredPosts(posts);
        
               const tags = new Set<string>();
        posts.forEach(post => {
          post.tags?.forEach(tag => tags.add(tag));
        });
        setAvailableTags(Array.from(tags));
      });
    };
    
    extractPostsFromDOM();
  }, []);

 
  const handleSearch = async (query: string, tags: string[]) => {
    setIsLoading(true);
    setSearchQuery(query);
    setSelectedTags(tags);
    
    try {
      if (query || tags.length > 0) {
        const searchResults = await searchPosts(query);
        
        const filtered = tags.length > 0 
          ? searchResults.filter(post => 
              post.tags?.some(tag => tags.includes(tag))
            )
          : searchResults;
          
        setFilteredPosts(filtered);
      } else {
        setFilteredPosts(allPosts);
      }
    } catch (error) {
      console.error('Error searching posts:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClientSide) {
    return <>{children}</>;
  }

  return (
    <div>
      <SearchFilter
        onSearch={handleSearch}
        availableTags={availableTags}
        initialQuery={searchQuery}
        initialTags={selectedTags}
      />
      
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="relative">
         
          {children}
          
         
          {(searchQuery || selectedTags.length > 0) && (
            <div className="absolute inset-0 bg-white">
              {filteredPosts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No posts found matching your search criteria.</p>
                  <button 
                    onClick={() => handleSearch('', [])}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Clear Search
                  </button>
                </div>
              ) : (
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPosts.map((post) => (
                    <div key={post.id}>
                     
                      <BlogCard post={post} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}