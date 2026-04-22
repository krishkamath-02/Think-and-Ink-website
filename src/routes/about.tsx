import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Heart, Sparkles, BookOpen, Users, Lightbulb } from "lucide-react";
import coverGirl from "@/assets/cover-girl.jpg";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Think & Ink" },
      { name: "description", content: "Learn about Think & Ink's mission to empower kids through guided journaling." },
      { property: "og:title", content: "About — Think & Ink" },
      { property: "og:description", content: "Learn about Think & Ink's mission to empower kids through guided journaling." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-20 bg-warm">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <Reveal direction="up" className="flex-1">
              <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 mb-6">
                <Heart className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-secondary-foreground">Our Story</span>
              </div>
              <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground leading-tight">
                Where Thoughts Find Their Shape
              </h1>
              <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
                Think & Ink was born from a simple but powerful belief: that when a kid learns to name what they feel, they gain the power to navigate it.
              </p>
            </Reveal>
            <Reveal direction="up" delay={0.2} className="flex-1 flex justify-center">
              <img src={coverGirl} alt="Think and Ink character" className="w-64 md:w-80 rounded-3xl shadow-2xl" loading="lazy" width={320} height={320} />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { icon: Lightbulb, title: "Think", desc: "Every great thing starts with a thought. A question asked in the dark. A dream sketched at the edge of sleep." },
              { icon: BookOpen, title: "Ink", desc: "Thoughts deserve to be made real. Writing them down is an act of courage, of ownership, of saying: this matters." },
              { icon: Sparkles, title: "Shine", desc: "Together, Think & Ink is the bridge between the inner world and the outer one. They think. They ink. They shine." },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <div className="text-center p-8 h-full">
                  <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <item.icon className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-foreground mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary/5 via-amber/5 to-teal/5">
        <Reveal className="mx-auto max-w-4xl px-6">
          <div className="text-center mb-12">
            <Users className="w-10 h-10 text-teal mx-auto mb-4" />
            <h2 className="font-display text-4xl font-bold text-foreground">Who We're For</h2>
          </div>
          <p className="text-center text-muted-foreground leading-relaxed max-w-3xl mx-auto text-lg">
            Think & Ink speaks directly to kids who are curious, sensitive, and growing into their voice. Whether they're navigating friendships, discovering new passions, processing big feelings, or simply trying to figure out who they want to be — we meet them where they are.
          </p>
          <div className="mt-10 text-center">
            <Link to="/shop">
              <Button variant="hero" size="lg">Start Their Journey</Button>
            </Link>
          </div>
        </Reveal>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-background">Give the Gift of Self-Expression</h2>
          <p className="mt-4 text-background/70 max-w-xl mx-auto">
            Ready to help them think, ink, and shine? Grab a journal today.
          </p>
          <div className="mt-8">
            <Link to="/shop">
              <Button variant="hero" size="lg" className="text-base px-10 py-6">
                Order Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
