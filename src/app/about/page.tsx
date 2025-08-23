export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          About This Blog
        </h1>
        
        <div className=" prose  max-w-none">
          <p className="text-lg text-gray-700 mb-6">
            Welcome to our personal blog platform built with Next.js 14! This project
            demonstrates modern web development practices using the latest React and
            Next.js featur
            es.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4">What You'll Find Here</h2>
          <ul className="list-disc ml-6 mb-6 text-gray-700">
            <li>In-depth tutorials on modern web development</li>
            <li>Insights into React and Next.js best practices</li>
            <li>Tips for building scalable applications</li>
            <li>Personal experiences from the development journey</li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4">Technical Stack</h2>
          <p className="text-gray-700 mb-4">This blog is built using:</p>
          <ul className="list-disc ml-6 mb-6 text-gray-700">
            <li><strong>Next.js 14</strong> - React framework with App Router</li>
            <li><strong>TypeScript</strong> - Type-safe JavaScript</li>
            <li><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
            <li><strong>Server Components</strong> - Enhanced performance</li>
            <li><strong>Static Site Generation</strong> - Optimized  </li>
          </ul>
          
          <h2 className="text-2xl font-semibold mb-4">Contact</h2>
          <p className="text-gray-700">
            Have questions or suggestions? Feel free to reach out through our
            contact form or connect with us on social media.
          </p>
        </div>
      </div>
    </div>
  );
}
