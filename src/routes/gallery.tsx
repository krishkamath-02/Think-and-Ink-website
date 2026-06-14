import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { 
  Trophy, 
  Heart, 
  Share2, 
  Search, 
  Sparkles, 
  Upload, 
  X, 
  Award, 
  MessageCircle, 
  Copy, 
  Check,
  Maximize2
} from "lucide-react";
import { toast } from "sonner";
import { Reveal } from "@/components/Reveal";
import { FEATURES } from "@/config/features";

// Import local student art assets
import rocketArt from "@/assets/gallery/gallery_rocket.png";
import gardenArt from "@/assets/gallery/gallery_garden.png";
import underwaterArt from "@/assets/gallery/gallery_underwater.png";
import familyArt from "@/assets/gallery/gallery_family.png";

// Setup TanStack Router route
export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Student Art Showcase & Contest — Think & Ink" },
      { name: "description", content: "Explore creative drawings from little thinkers. Vote for your favorite art, share on social media, and win exciting prizes!" },
      { property: "og:title", content: "Student Art Showcase & Contest — Think & Ink" },
      { property: "og:description", content: "Explore creative drawings from little thinkers. Vote for your favorite art, share on social media, and win exciting prizes!" },
    ],
  }),
  component: GalleryPage,
});

interface Artwork {
  id: string;
  studentName: string;
  age: number;
  school: string;
  title: string;
  image: string;
  baseLikes: number;
}

const INITIAL_ARTWORKS: Artwork[] = [
  {
    id: "1",
    studentName: "Ayaan Shah",
    age: 8,
    school: "Podar International School, Pune",
    title: "My Journey to the Stars 🚀",
    image: rocketArt,
    baseLikes: 142,
  },
  {
    id: "2",
    studentName: "Anaya Kulkarni",
    age: 6,
    school: "The Orchid School, Pune",
    title: "The Singing Sunshine Garden 🌸",
    image: gardenArt,
    baseLikes: 98,
  },
  {
    id: "3",
    studentName: "Vihaan Joshi",
    age: 9,
    school: "Delhi Public School, Pune",
    title: "Deep Sea Ocean Explorers 🐢",
    image: underwaterArt,
    baseLikes: 124,
  },
  {
    id: "4",
    studentName: "Rhea Deshmukh",
    age: 7,
    school: "Vibgyor High, Pune",
    title: "My Happy Family under the Rainbow 🏡",
    image: familyArt,
    baseLikes: 76,
  },
];

const WHATSAPP_NUMBER = "917822845048";

function GalleryPage() {
  if (!FEATURES.SHOW_STUDENT_GALLERY) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4 text-center">
        <div>
          <h1 className="text-6xl font-bold text-foreground">404</h1>
          <p className="mt-4 text-lg text-muted-foreground">Page not found</p>
          <Link to="/" className="mt-6 inline-block rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Go Home</Link>
        </div>
      </div>
    );
  }

  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"likes" | "latest">("likes");
  const [likedArtworks, setLikedArtworks] = useState<string[]>([]);
  const [selectedArt, setSelectedArt] = useState<Artwork | null>(null);
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [highlightedId, setHighlightedId] = useState<string | null>(null);

  // References for scrolling to a shared artwork card
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  // 1. Load user's liked artworks from localStorage on mount
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem("tni_gallery_user_likes");
      if (storedLikes) {
        setLikedArtworks(JSON.parse(storedLikes));
      }
    } catch (e) {
      console.error("Failed to load likes from localStorage", e);
    }
  }, []);

  // 2. Handle highlighting/scrolling from sharing links (?art=<id>)
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const artId = searchParams.get("art");
    if (artId) {
      const exists = INITIAL_ARTWORKS.find(a => a.id === artId);
      if (exists) {
        setHighlightedId(artId);
        setSelectedArt(exists); // Open detailed view automatically

        // Smooth scroll to card
        setTimeout(() => {
          const card = cardRefs.current[artId];
          if (card) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }, 800);
      }
    }
  }, []);

  // Save likes to localStorage
  const toggleLike = (id: string) => {
    let updatedLikes: string[];
    const isLiked = likedArtworks.includes(id);

    if (isLiked) {
      updatedLikes = likedArtworks.filter(artId => artId !== id);
      toast.success("Vote removed!");
    } else {
      updatedLikes = [...likedArtworks, id];
      toast.success("Thank you for your vote! ❤️");
    }

    setLikedArtworks(updatedLikes);
    localStorage.setItem("tni_gallery_user_likes", JSON.stringify(updatedLikes));
  };

  // Build current artwork list with dynamic likes calculation
  const getArtworks = () => {
    return INITIAL_ARTWORKS.map(art => ({
      ...art,
      likes: art.baseLikes + (likedArtworks.includes(art.id) ? 1 : 0),
    }));
  };

  // Filter and sort artworks
  const filteredAndSortedArtworks = getArtworks()
    .filter(art => 
      art.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      art.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "likes") {
        return b.likes - a.likes; // Most liked first
      } else {
        // Simple mock sorting: keep original ordering or invert for latest
        return parseInt(b.id) - parseInt(a.id);
      }
    });

  // Top 3 Leaderboard calculation
  const leaderboardArtworks = [...getArtworks()]
    .sort((a, b) => b.likes - a.likes)
    .slice(0, 3);

  // Copy share link helper
  const handleShare = (id: string) => {
    const shareUrl = `${window.location.origin}/gallery?art=${id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopiedId(id);
      toast.success("Link copied! Share it on WhatsApp to get votes!");
      setTimeout(() => setCopiedId(null), 2000);
    }).catch(() => {
      toast.error("Could not copy link. Copy the URL manually.");
    });
  };

  // WhatsApp submit redirect helper
  const handleSubmitArtWhatsApp = () => {
    const msg = `Hi Think & Ink! 👋 I would like to submit my child's artwork for the Student Showcase Gallery Contest.\n\n` +
      `*👤 SUBMISSION DETAILS*\n` +
      `*Student's Name:* \n` +
      `*Age / Grade:* \n` +
      `*School Name:* \n` +
      `*Artwork Title:* \n\n` +
      `[Please attach a high-quality photo of the artwork to this message]`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
    setIsSubmitModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-background text-foreground pb-20">
      <Header />

      {/* Hero Header */}
      <section className="pt-32 pb-12 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <Reveal direction="up">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6 border border-primary/20">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-semibold text-primary">Monthly Art Contest</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground leading-tight max-w-3xl mx-auto">
              Student Art Showcase
            </h1>
            <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              A magical space where our little thinkers showcase their imagination! Vote for your favorites, share with friends, and the most liked artwork of the month wins a free Think & Ink Journal Box! 🎉
            </p>
          </Reveal>
        </div>
      </section>

      {/* Leaderboard Podiums */}
      <section className="py-8">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <div className="bg-card border border-border/60 rounded-3xl p-6 md:p-8 shadow-xl relative overflow-hidden backdrop-blur-sm">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl" />
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal/5 rounded-full blur-2xl" />

              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 bg-amber/15 rounded-xl text-amber">
                  <Trophy className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-foreground">Weekly Leaderboard</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Top voted artworks of this contest cycle</p>
                </div>
              </div>

              {/* Podium Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4 pb-2">
                {/* 2nd Place */}
                {leaderboardArtworks[1] && (
                  <div className="order-2 md:order-1 flex flex-col items-center">
                    <div className="relative group cursor-pointer" onClick={() => setSelectedArt(leaderboardArtworks[1])}>
                      <img 
                        src={leaderboardArtworks[1].image} 
                        alt={leaderboardArtworks[1].studentName} 
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-slate-300 shadow-md group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-slate-300 text-slate-800 text-[10px] font-bold flex items-center justify-center border-2 border-white shadow">
                        2
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <p className="text-xs font-bold text-foreground truncate max-w-[150px]">{leaderboardArtworks[1].studentName}</p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{leaderboardArtworks[1].title}</p>
                      <div className="inline-flex items-center gap-1 mt-1 text-slate-500 bg-slate-50 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                        <Heart className="w-3 h-3 fill-slate-500" /> {leaderboardArtworks[1].likes} votes
                      </div>
                    </div>
                  </div>
                )}

                {/* 1st Place */}
                {leaderboardArtworks[0] && (
                  <div className="order-1 md:order-2 flex flex-col items-center scale-105 mb-4 md:mb-0">
                    <div className="relative group cursor-pointer" onClick={() => setSelectedArt(leaderboardArtworks[0])}>
                      <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-r from-amber to-yellow-500 opacity-70 blur animate-pulse" />
                      <img 
                        src={leaderboardArtworks[0].image} 
                        alt={leaderboardArtworks[0].studentName} 
                        className="w-24 h-24 rounded-3xl object-cover border-4 border-amber relative shadow-lg group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-amber text-amber-foreground text-xs font-bold flex items-center justify-center border-2 border-white shadow">
                        🏆
                      </div>
                    </div>
                    <div className="text-center mt-4">
                      <p className="text-sm font-bold text-foreground flex items-center justify-center gap-1 truncate max-w-[180px]">
                        {leaderboardArtworks[0].studentName}
                      </p>
                      <p className="text-xs text-muted-foreground truncate max-w-[180px] font-medium">{leaderboardArtworks[0].title}</p>
                      <div className="inline-flex items-center gap-1 mt-1 text-amber bg-amber/10 px-3 py-1 rounded-full text-xs font-bold border border-amber/25">
                        <Heart className="w-3.5 h-3.5 fill-amber" /> {leaderboardArtworks[0].likes} votes
                      </div>
                    </div>
                  </div>
                )}

                {/* 3rd Place */}
                {leaderboardArtworks[2] && (
                  <div className="order-3 flex flex-col items-center">
                    <div className="relative group cursor-pointer" onClick={() => setSelectedArt(leaderboardArtworks[2])}>
                      <img 
                        src={leaderboardArtworks[2].image} 
                        alt={leaderboardArtworks[2].studentName} 
                        className="w-20 h-20 rounded-2xl object-cover border-2 border-amber-600 shadow-md group-hover:scale-105 transition-transform" 
                      />
                      <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-amber-600 text-white text-[10px] font-bold flex items-center justify-center border-2 border-white shadow">
                        3
                      </div>
                    </div>
                    <div className="text-center mt-3">
                      <p className="text-xs font-bold text-foreground truncate max-w-[150px]">{leaderboardArtworks[2].studentName}</p>
                      <p className="text-[10px] text-muted-foreground truncate max-w-[150px]">{leaderboardArtworks[2].title}</p>
                      <div className="inline-flex items-center gap-1 mt-1 text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full text-[10px] font-semibold">
                        <Heart className="w-3 h-3 fill-amber-700" /> {leaderboardArtworks[2].likes} votes
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Main Gallery Section */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-6">
          {/* Controls Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10 pb-6 border-b border-border/40">
            <div className="relative max-w-md w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by student, school, or artwork..."
                className="w-full rounded-2xl border border-input bg-card pl-11 pr-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all shadow-sm"
              />
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                onClick={() => setSortBy("likes")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  sortBy === "likes"
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Most Liked
              </button>
              <button
                onClick={() => setSortBy("latest")}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  sortBy === "latest"
                    ? "bg-primary text-primary-foreground shadow"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                Latest
              </button>
              <Button
                variant="hero"
                onClick={() => setIsSubmitModalOpen(true)}
                className="rounded-xl text-xs px-4 py-2.5"
              >
                <Upload className="w-3.5 h-3.5 mr-2" /> Submit Art
              </Button>
            </div>
          </div>

          {/* Artworks Grid */}
          {filteredAndSortedArtworks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredAndSortedArtworks.map((art) => {
                const isLiked = likedArtworks.includes(art.id);
                const isHighlighted = highlightedId === art.id;

                return (
                  <div
                    key={art.id}
                    ref={(el) => { cardRefs.current[art.id] = el; }}
                    className={`bg-card rounded-3xl border overflow-hidden shadow-md group transition-all duration-300 flex flex-col h-full hover:shadow-xl hover:-translate-y-1 ${
                      isHighlighted 
                        ? "border-amber ring-4 ring-amber/20 animate-pulse-slow shadow-amber/10" 
                        : "border-border/50"
                    }`}
                  >
                    {/* Art Image */}
                    <div className="relative aspect-square overflow-hidden bg-muted cursor-pointer" onClick={() => setSelectedArt(art)}>
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-white/90 shadow flex items-center justify-center text-foreground hover:scale-110 transition-transform">
                          <Maximize2 className="w-4 h-4" />
                        </div>
                      </div>
                    </div>

                    {/* Art Metadata */}
                    <div className="p-5 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="font-display font-bold text-base text-foreground leading-tight mb-1 truncate group-hover:text-primary transition-colors">
                          {art.title}
                        </h3>
                        <p className="text-xs font-semibold text-primary leading-none mb-2">
                          By {art.studentName}, Age {art.age}
                        </p>
                        <p className="text-[11px] text-muted-foreground leading-snug line-clamp-2 min-h-[32px]">
                          {art.school}
                        </p>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="flex items-center justify-between pt-4 mt-2 border-t border-border/40">
                        <button
                          onClick={() => toggleLike(art.id)}
                          className={`flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full transition-all ${
                            isLiked
                              ? "bg-rose-50 text-rose-600 border border-rose-100"
                              : "bg-secondary text-secondary-foreground hover:bg-rose-50 hover:text-rose-600 border border-transparent"
                          }`}
                        >
                          <Heart className={`w-3.5 h-3.5 transition-transform ${isLiked ? "fill-rose-600 scale-110 text-rose-600 animate-beat" : ""}`} />
                          {art.likes}
                        </button>

                        <button
                          onClick={() => handleShare(art.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/15 hover:text-primary transition-all text-xs font-bold"
                          title="Share direct link"
                        >
                          {copiedId === art.id ? (
                            <>
                              <Check className="w-3.5 h-3.5 text-teal" />
                              <span className="text-teal">Copied</span>
                            </>
                          ) : (
                            <>
                              <Share2 className="w-3.5 h-3.5" />
                              <span>Share</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-20 bg-card rounded-3xl border border-dashed border-border p-8">
              <p className="text-muted-foreground font-semibold">No artworks found matching your search.</p>
              <button onClick={() => setSearchTerm("")} className="text-primary font-bold text-sm mt-2 hover:underline">Clear Search</button>
            </div>
          )}
        </div>
      </section>

      {/* Info Callout Section */}
      <section className="py-8 bg-warm">
        <div className="mx-auto max-w-4xl px-6">
          <Reveal>
            <div className="bg-foreground text-background rounded-3xl p-8 text-center relative overflow-hidden shadow-xl">
              <div className="absolute top-0 left-0 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">Art Showcase Contest Rules</h2>
              <p className="text-sm text-background/80 leading-relaxed max-w-xl mx-auto mb-6">
                Art submissions are open to all students using **Think & Ink** journals. Submissions run every month. The artwork with the maximum validated likes on our gallery page by the last day of the month wins a free **Mindfulness Gift Box** and a **20% discount coupon** for the whole family!
              </p>
              <Button
                variant="hero"
                size="lg"
                onClick={() => setIsSubmitModalOpen(true)}
                className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold shadow-lg"
              >
                <Upload className="w-4 h-4 mr-2" /> Submit Your Artwork Now
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />

      {/* ─── DETAILED ART MODAL VIEW ─── */}
      {selectedArt && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm"
          onClick={() => {
            setSelectedArt(null);
            setHighlightedId(null);
            // Clear URL param without reloading
            window.history.replaceState({}, document.title, window.location.pathname);
          }}
        >
          <div 
            className="relative bg-card w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden border border-border/50 animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => {
                setSelectedArt(null);
                setHighlightedId(null);
                window.history.replaceState({}, document.title, window.location.pathname);
              }}
              className="absolute right-5 top-5 p-2 rounded-full bg-black/40 hover:bg-black/60 transition-colors text-white z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <img
              src={selectedArt.image}
              alt={selectedArt.title}
              className="w-full aspect-video object-cover"
            />

            <div className="p-6 md:p-8">
              <h3 className="font-display text-2xl font-bold text-foreground mb-1 leading-tight">
                {selectedArt.title}
              </h3>
              <p className="text-sm font-bold text-primary mb-3">
                By {selectedArt.studentName}, Age {selectedArt.age}
              </p>
              <div className="bg-secondary/40 rounded-2xl p-4 mb-6">
                <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider mb-1 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-primary" /> Student Information
                </p>
                <p className="text-sm font-medium text-foreground">{selectedArt.school}</p>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={() => toggleLike(selectedArt.id)}
                  className={`flex-1 font-bold ${
                    likedArtworks.includes(selectedArt.id)
                      ? "bg-rose-600 hover:bg-rose-700 text-white"
                      : "bg-secondary text-secondary-foreground hover:bg-rose-50 hover:text-rose-600"
                  }`}
                >
                  <Heart className={`w-4 h-4 mr-2 ${likedArtworks.includes(selectedArt.id) ? "fill-white text-white scale-110" : ""}`} />
                  {likedArtworks.includes(selectedArt.id) ? "Voted!" : "Vote for this Art"}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare(selectedArt.id)}
                  className="font-bold border-primary/20 text-primary hover:bg-primary/5"
                >
                  {copiedId === selectedArt.id ? (
                    <>
                      <Check className="w-4 h-4 mr-2 text-teal" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ─── SUBMISSION INSTRUCTION MODAL ─── */}
      {isSubmitModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
          onClick={() => setIsSubmitModalOpen(false)}
        >
          <div
            className="relative bg-card w-full max-w-md rounded-3xl shadow-2xl border border-border/50 overflow-hidden animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-7">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-xl font-bold text-foreground">Submit Your Artwork</h3>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="p-1.5 rounded-full hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We showcase drawing pages, diary entries, and coloring creations made by students using **Think & Ink** books! It is 100% free to participate.
                </p>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-sm">1</div>
                  <p className="text-xs text-foreground font-medium pt-1.5">Take a clean, well-lit photo of the artwork page.</p>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-sm">2</div>
                  <p className="text-xs text-foreground font-medium pt-1.5">Click the WhatsApp button below to start a submission chat.</p>
                </div>

                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0 font-bold text-sm">3</div>
                  <p className="text-xs text-foreground font-medium pt-1.5">Send the photo along with the student's name, age, title of drawing, and school name.</p>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button
                  onClick={handleSubmitArtWhatsApp}
                  variant="hero"
                  className="w-full text-sm py-5 font-bold"
                >
                  <MessageCircle className="w-4 h-4 mr-2" /> Send via WhatsApp
                </Button>
                <button
                  onClick={() => setIsSubmitModalOpen(false)}
                  className="text-xs text-muted-foreground mt-2 hover:underline"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
