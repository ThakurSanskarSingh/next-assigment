// import { Suspense } from 'react';
// import { BlogPost } from '@/types/blog';
// import ClientHomePage from '@/containers/ClientHomePage';
// import { getAllPosts } from '@/lib/posts';



// function BlogListingSkeleton() {
//   return (
//     <section className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//       {Array.from({ length: 6 }).map((_, i) => (
//         <div key={i} className="bg-white rounded-lg shadow-md p-6 animate-pulse">
//           <div className="h-6 bg-gray-200 rounded mb-3"></div>
//           <div className="h-4 bg-gray-200 rounded mb-2"></div>
//           <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
//           <div className="flex gap-2 mb-4">
//             <div className="h-5 w-16 bg-gray-200 rounded-full"></div>
//             <div className="h-5 w-20 bg-gray-200 rounded-full"></div>
//           </div>
//           <div className="h-4 bg-gray-200 rounded w-24"></div>
//         </div>
//       ))}
//     </section>
//   );
// }

// async function BlogListing() {
  
//   return null; // Placeholder to avoid errors, actual fetching is done in HomePage
// }


// export default async function HomePage() {
//   let posts: BlogPost[] = [];
//   try {
//     posts = await getAllPosts();
//   } catch (error) {
//     console.error('Error fetching posts in HomePage:', error);
//   }
//   return (
//     <main className="container mx-auto px-4 py-8">
//       <div className="mb-8">
//         <div className="flex items-center justify-between mb-6">
//           <h2 className="text-2xl font-semibold text-gray-900">
//             Latest Posts
//           </h2>
//         </div>
        
//         <Suspense fallback={<BlogListingSkeleton />}>
//           {/* Fetch posts directly in HomePage to pass to ClientHomePage and BlogListing */}
//           {/* This ensures posts are available for both server and client components */}
//           {/* The actual fetching logic is still within BlogListing for error handling and empty state */}
//           <ClientHomePage initialPosts={posts}>
//             <BlogListing />
//           </ClientHomePage>
//         </Suspense>
//       </div>
//     </main>
//   );
// }



export default function HomePage() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Hello from HomePage ✅
      </h1>
      <p className="text-gray-600">
        If you can see this in Vercel, the `/` route is working.
      </p>
    </main>
  );
}
