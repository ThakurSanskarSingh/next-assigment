
export const ROUTES = {
    HOME: '/',
    LOGIN: '/login',
    ABOUT: '/about',
    
    ADMIN: '/admin',
    ADMIN_CREATE_POST: '/admin/create',
    ADMIN_EDIT_POST: '/admin/edit',
    
    POSTS: '/posts',
    
    PRIVACY: '/privacy',
    TERMS: '/terms',
    
    API: {
      AUTH: '/api/auth',
    }
  } as const;
  
  export const getPostViewRoute = (slug: string) => `${ROUTES.POSTS}/${slug}`;
  export const getPostEditRoute = (slug: string) => `${ROUTES.ADMIN_EDIT_POST}/${slug}`;
  
  export type RouteType = typeof ROUTES[keyof typeof ROUTES] | typeof ROUTES.API[keyof typeof ROUTES.API];
