import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <h3 className="font-display text-2xl font-bold mb-4">Think <span className="text-primary">&</span> Ink</h3>
            <p className="text-background/70 text-sm leading-relaxed max-w-sm">
              Empowering kids to think, feel, and write. Because your thoughts are worth thinking, your words are worth writing, and you are worth knowing.
            </p>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-background/50">Explore</h4>
            <div className="space-y-3">
              <Link to="/" className="block text-sm text-background/70 hover:text-background transition-colors">Home</Link>
              <Link to="/about" className="block text-sm text-background/70 hover:text-background transition-colors">About</Link>
              <Link to="/shop" className="block text-sm text-background/70 hover:text-background transition-colors">Shop</Link>
              <Link to="/faq" className="block text-sm text-background/70 hover:text-background transition-colors">FAQ</Link>
              <Link to="/contact" className="block text-sm text-background/70 hover:text-background transition-colors">Contact</Link>
            </div>
          </div>
          <div>
            <h4 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-background/50">Connect</h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/thinkandink.kids"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-background/70 hover:text-background transition-colors group"
              >
                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
                @thinkandink.kids
              </a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-background/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-background/50">© 2026 Think & Ink. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy" className="text-xs text-background/50 hover:text-background/80 transition-colors">Privacy Policy</Link>
            <p className="text-xs text-background/50 flex items-center gap-1">
              Made with <Heart className="w-3 h-3 text-primary fill-primary" /> for little thinkers everywhere
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
