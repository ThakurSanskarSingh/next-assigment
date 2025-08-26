import Credentials from 'next-auth/providers/credentials';

export const authConfig = {
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        // Demo user (replace with real user lookup)
        if (email.toLowerCase() === 'admin@example.com' && password === 'admin123') {
          return { id: '1', email, name: 'Admin' };
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
}; 