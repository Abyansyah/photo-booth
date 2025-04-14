import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t py-8">
      <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
        <p className="text-sm text-muted-foreground">© 2024 Pinky Booth. All rights reserved.</p>
        <div className="flex items-center space-x-4">
          <Link href="/privacy-policy" className="text-sm text-muted-foreground hover:text-primary">
            Privacy Policy
          </Link>
          <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
            FAQ
          </Link>
          <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
