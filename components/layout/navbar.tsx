'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Camera, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center space-x-2">
          <Camera className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Pinky Booth</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link href="/" className={cn('transition-colors hover:text-primary', isActive('/') && 'text-primary')}>
            Home
          </Link>
          <Link href="/faq" className={cn('transition-colors hover:text-primary', isActive('/faq') && 'text-primary')}>
            FAQ
          </Link>
          <Link href="/privacy-policy" className={cn('transition-colors hover:text-primary', isActive('/privacy-policy') && 'text-primary')}>
            Privacy Policy
          </Link>
          <Link href="/contact" className={cn('transition-colors hover:text-primary', isActive('/contact') && 'text-primary')}>
            Contact
          </Link>
        </nav>

        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </div>

      <div className={cn('fixed inset-x-0 top-16 z-50 bg-background border-b md:hidden transition-all duration-300 ease-in-out', isMenuOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0 pointer-events-none')}>
        <nav className="container py-4 flex flex-col space-y-4 text-sm font-medium">
          <Link href="/" className={cn('px-4 py-2 rounded-md hover:bg-muted transition-colors', isActive('/') && 'text-primary bg-primary/10')} onClick={() => setIsMenuOpen(false)}>
            Home
          </Link>
          <Link href="/faq" className={cn('px-4 py-2 rounded-md hover:bg-muted transition-colors', isActive('/faq') && 'text-primary bg-primary/10')} onClick={() => setIsMenuOpen(false)}>
            FAQ
          </Link>
          <Link href="/privacy-policy" className={cn('px-4 py-2 rounded-md hover:bg-muted transition-colors', isActive('/privacy-policy') && 'text-primary bg-primary/10')} onClick={() => setIsMenuOpen(false)}>
            Privacy Policy
          </Link>
          <Link href="/contact" className={cn('px-4 py-2 rounded-md hover:bg-muted transition-colors', isActive('/contact') && 'text-primary bg-primary/10')} onClick={() => setIsMenuOpen(false)}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
