'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { MenuIcon, XIcon, UserIcon, LogOutIcon } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const response = await fetch('/api/auth/status');
      if (response.ok) {
        const userData = await response.json();
        setIsAuthenticated(true);
        setUser(userData.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth', { method: 'DELETE' });
      setIsAuthenticated(false);
      setUser(null);
      setIsMobileMenuOpen(false);
      window.location.href = '/';
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const publicNavItems = [
    { href: '/', label: 'Home', exact: true },
    { href: '/about', label: 'About', exact: true },
  ];

  const adminNavItems = [
    { href: '/admin', label: 'Dashboard', exact: true },
    { href: '/admin/create', label: 'New Post', exact: false },
  ];

  const isActiveLink = (href: string, exact: boolean = false) => {
    if (exact) {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const NavLink = ({ 
    href, 
    label, 
    exact = false, 
    mobile = false,
    onClick 
  }: { 
    href: string; 
    label: string; 
    exact?: boolean; 
    mobile?: boolean;
    onClick?: () => void;
  }) => {
    const isActive = isActiveLink(href, exact);
    const baseClasses = mobile
      ? "block px-3 py-2 rounded-md text-base font-medium transition-colors"
      : "px-3 py-2 rounded-md text-sm font-medium transition-colors";
    
    const activeClasses = isActive
      ? "text-blue-600 bg-blue-50 border-blue-200"
      : "text-gray-700 hover:text-blue-600 hover:bg-gray-50";

    return (
      <Link
        href={href}
        className={`${baseClasses} ${activeClasses}`}
        onClick={onClick}
      >
        {label}
      </Link>
    );
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">B</span>
            </div>
            <span className="text-xl font-bold text-gray-900">BlogPlatform</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {publicNavItems.map((item) => (
              <NavLink 
                key={item.href}
                href={item.href}
                label={item.label}
                exact={item.exact}
              />
            ))}

            {/* Admin Navigation (if authenticated) */}
            {isAuthenticated && (
              <>
                <div className="w-px h-6 bg-gray-300 mx-2"></div>
                {adminNavItems.map((item) => (
                  <NavLink 
                    key={item.href}
                    href={item.href}
                    label={item.label}
                    exact={item.exact}
                  />
                ))}
              </>
            )}
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <UserIcon className="w-4 h-4 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {user?.name || 'Admin'}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-800 transition-colors"
                >
                  <LogOutIcon className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {isMobileMenuOpen ? (
                <XIcon className="h-6 w-6" />
              ) : (
                <MenuIcon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {publicNavItems.map((item) => (
                <NavLink 
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  exact={item.exact}
                  mobile={true}
                  onClick={() => setIsMobileMenuOpen(false)}
                />
              ))}

              {isAuthenticated && (
                <>
                  <div className="border-t border-gray-200 my-2"></div>
                  {adminNavItems.map((item) => (
                    <NavLink 
                      key={item.href}
                      href={item.href}
                      label={item.label}
                      exact={item.exact}
                      mobile={true}
                      onClick={() => setIsMobileMenuOpen(false)}
                    />
                  ))}
                </>
              )}

              <div className="border-t border-gray-200 pt-3 mt-3">
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center px-3 py-2">
                      <UserIcon className="w-4 h-4 text-gray-600 mr-2" />
                      <span className="text-sm text-gray-700">
                        {user?.name || 'Admin'}
                      </span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-base font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
                    >
                      <LogOutIcon className="w-4 h-4 mr-2 inline" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="block px-3 py-2 text-base font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}