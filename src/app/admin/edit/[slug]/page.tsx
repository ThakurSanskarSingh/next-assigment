interface EditPostPageProps {
  params: {
    slug: string;
  };
}

export default function EditPostPage({ params }: EditPostPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Edit Post: {params.slug}</h1>
      <p>Post editing form will be implemented in the next section.</p>
    </div>
  );
}
