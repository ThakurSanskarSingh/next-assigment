interface EditPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { slug } = await params;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post: {slug}</h1>
      <p>Post editing form will be implemented in the next section.</p>
    </div>
  );
}
