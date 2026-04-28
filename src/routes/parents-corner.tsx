import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Newspaper, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/parents-corner")({
  component: ParentsCorner,
});

function ParentsCorner() {
  const articles = [
    { 
      title: "5 Ways to Help Your Child Express Emotions", 
      category: "Emotional Health",
      readTime: "5 min read",
      desc: "Practical tips to create a safe space for big feelings at home."
    },
    { 
      title: "Why Journaling is Better than Screen Time", 
      category: "Development",
      readTime: "4 min read",
      desc: "How a physical journal activates the brain differently than a tablet."
    },
    { 
      title: "Building a Daily Reflection Habit", 
      category: "Habits",
      readTime: "6 min read",
      desc: "Setting up a simple 10-minute routine that sticks for years."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6">
          {/* Hero Section */}
          <Reveal className="text-center mb-20">
            <div className="inline-flex items-center gap-2 rounded-full bg-teal/10 px-4 py-1.5 mb-6">
              <Newspaper className="w-4 h-4 text-teal" />
              <span className="text-xs font-semibold text-teal uppercase tracking-widest">Parent's Corner</span>
              <span className="text-[10px] bg-teal text-white px-2 py-0.5 rounded-full font-bold animate-pulse">Coming Soon</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-6">
              Insights for Raising <span className="text-primary italic">Mindful</span> Kids
            </h1>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
              Welcome to our dedicated space for parents, educators, and caregivers. We're curating science-backed articles and practical tips to help you nurture your child's emotional health.
            </p>
          </Reveal>

          {/* Article Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="group bg-card rounded-3xl p-8 border border-border/50 hover:shadow-xl transition-all duration-300 h-full flex flex-col relative overflow-hidden">
                  {/* Coming Soon Overlay */}
                  <div className="absolute inset-0 bg-background/5 backdrop-blur-[1px] flex items-center justify-center z-10 pointer-events-none">
                     <span className="bg-white/90 shadow-sm border border-border/50 px-4 py-2 rounded-full text-xs font-bold text-muted-foreground uppercase tracking-widest">Article Coming Soon</span>
                  </div>

                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-4">{article.category}</span>
                  <h3 className="font-display text-xl font-bold text-foreground mb-4">{article.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">{article.desc}</p>
                  
                  <div className="flex items-center justify-between pt-6 border-t border-border/50">
                    <span className="text-xs text-muted-foreground">{article.readTime}</span>
                    <button className="text-sm font-bold text-muted-foreground flex items-center gap-1 cursor-default">
                      Coming Soon
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Newsletter / Teaser */}
          <Reveal delay={0.4} className="mt-24">
            <div className="bg-primary/5 rounded-[3rem] p-8 md:p-16 text-center border border-primary/10">
              <Heart className="w-10 h-10 text-primary mx-auto mb-6" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">Want to be the first to know?</h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-10">
                Join our newsletter and we'll notify you the moment our first set of deep-dive articles goes live. Plus, get exclusive parenting tips!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-md mx-auto">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full sm:flex-1 rounded-full px-6 py-4 bg-white border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 text-sm md:text-base"
                />
                <Button variant="hero" className="w-full sm:w-auto rounded-full px-8 py-4 h-full">
                  Notify Me
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </main>

      <Footer />
    </div>
  );
}
