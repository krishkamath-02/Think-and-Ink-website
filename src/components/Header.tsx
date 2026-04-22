import { Link } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Menu, X, ChevronDown, BookOpen, Sparkles } from "lucide-react";

export function Header() {
  const [open, setOpen] = useState(false);
  const [collectionsOpen, setCollectionsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setCollectionsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const collections = [
    {
      label: "Girl Edition",
      sublabel: "Brave • Curious • Me",
      emoji: "🌸",
      href: "/shop",
      badge: null,
    },
    {
      label: "Boy Edition",
      sublabel: "Brave • Curious • Me",
      emoji: "🚀",
      href: "/shop",
      badge: "New",
    },
    {
      label: "Coming Soon",
      sublabel: "More adventures ahead...",
      emoji: "✨",
      href: "/shop",
      badge: "Soon",
      disabled: true,
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-3">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-display text-2xl font-bold tracking-tight text-foreground">
            Think <span className="text-primary">&</span> Ink
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-sm font-medium text-primary" }}>Home</Link>
          <Link to="/about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-sm font-medium text-primary" }}>About</Link>

          {/* Collections dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setCollectionsOpen(!collectionsOpen)}
              className="flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              aria-expanded={collectionsOpen}
              aria-haspopup="true"
            >
              <BookOpen className="w-3.5 h-3.5" />
              Collections
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${collectionsOpen ? "rotate-180" : ""}`} />
            </button>

            {collectionsOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-64 bg-background/95 backdrop-blur-xl border border-border/60 rounded-2xl shadow-2xl shadow-black/10 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="px-3 py-2.5 border-b border-border/40">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3" />
                    Our Collections
                  </p>
                </div>
                <div className="p-2">
                  {collections.map((col) => (
                    <Link
                      key={col.label}
                      to={col.href}
                      onClick={() => setCollectionsOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-150 group ${
                        col.disabled
                          ? "opacity-50 pointer-events-none"
                          : "hover:bg-secondary/70 cursor-pointer"
                      }`}
                    >
                      <span className="text-xl leading-none">{col.emoji}</span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-foreground leading-tight">{col.sublabel}</p>
                        <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">{col.label}</p>
                      </div>
                      {col.badge && (
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          col.badge === "Soon"
                            ? "bg-muted text-muted-foreground"
                            : "bg-primary text-primary-foreground"
                        }`}>
                          {col.badge}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link to="/shop" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-sm font-medium text-primary" }}>Shop</Link>
          <Link to="/faq" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-sm font-medium text-primary" }}>FAQ</Link>
          <Link to="/contact" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors" activeProps={{ className: "text-sm font-medium text-primary" }}>Contact</Link>
        </nav>

        <div className="hidden md:block">
          <Link to="/shop" className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5">
            Get Your Journal
          </Link>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden p-2 text-foreground">
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-b border-border px-6 pb-6 space-y-1">
          <Link to="/" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground py-2">Home</Link>
          <Link to="/about" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground py-2">About</Link>

          {/* Mobile Collections section */}
          <div className="py-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/60 mb-2 flex items-center gap-1.5">
              <BookOpen className="w-3 h-3" />Collections
            </p>
            {collections.map((col) => (
              <Link
                key={col.label}
                to={col.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 py-2 pl-3 rounded-xl ${col.disabled ? "opacity-50 pointer-events-none" : ""}`}
              >
                <span className="text-base">{col.emoji}</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{col.sublabel}</p>
                  <p className="text-[11px] text-muted-foreground">{col.label}</p>
                </div>
                {col.badge && col.badge !== "Soon" && (
                  <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-primary text-primary-foreground">
                    {col.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <Link to="/shop" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground py-2">Shop</Link>
          <Link to="/faq" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground py-2">FAQ</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="block text-sm font-medium text-foreground py-2">Contact</Link>
          <Link to="/shop" onClick={() => setOpen(false)} className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground w-full mt-2">
            Get Your Journal
          </Link>
        </div>
      )}
    </header>
  );
}
