'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { twMerge } from 'tailwind-merge';
import Image from 'next/image';
import cross from '../../public/icons/cross.png';
import loading from '../../public/icons/loading.png';
import search from '../../public/icons/search.png';


interface SearchFilterProps {
  onSearch: (query: string, tags: string[]) => void;
  availableTags?: string[];
  initialQuery?: string;
  initialTags?: string[];
  className?: string;
}

export default function SearchFilter({
  onSearch,
  availableTags = [],
  initialQuery = '',
  initialTags = [],
  className = '',
}: SearchFilterProps) {

  const searchParams = useSearchParams();
  
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [selectedTags, setSelectedTags] = useState<string[]>(initialTags);
  const [isSearching, setIsSearching] = useState(false);

    
    const selectedTagClasses = (tag: string) =>  selectedTags.includes(tag)
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200"
    const baseClass = "px-3 py-1 text-sm rounded-full border transition-colors";
     


  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (searchQuery) {
      params.set('q', searchQuery);
    } else {
      params.delete('q');
    }
    
    if (selectedTags.length > 0) {
      params.set('tags', selectedTags.join(','));
    } else {
      params.delete('tags');
    }
    
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [searchQuery, selectedTags, searchParams]);

  const handleSearch = () => {
    setIsSearching(true);
    onSearch(searchQuery, selectedTags);
    setTimeout(() => setIsSearching(false), 500); // Simulate loading state
  };

  useEffect(() => {
    onSearch(searchQuery, selectedTags);
  }, [selectedTags]);

  // Handle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setSelectedTags([]);
    onSearch('', []);
  };

  return (
    <div className={`bg-white rounded-lg shadow-sm p-4 mb-6 ${className}`}>
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search posts..."
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-10 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
<Image src={cross}  alt="Clear" width={16} height={16} />
              </button>
            )}
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-blue-600 hover:text-blue-800"
            >
              {isSearching ? (
              <Image src={loading}  alt="Searching" width={16} height={16} />
              ) : (
                <Image src={search}  alt="Search" width={16} height={16} />
              )}
            </button>
          </div>
        </div>
        
        {(searchQuery || selectedTags.length > 0) && (
          <div className="flex space-x-2">
            <button
              onClick={clearFilters}
              className="px-3 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Clear
            </button>
          </div>
        )}
      </div>
      
      {availableTags.length > 0 && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 mb-2">Filter by tags:</p>
          <div className="flex flex-wrap gap-2">
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={twMerge(
                  baseClass,
                 selectedTagClasses(tag)
                )
              }
              >
                #{tag}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}