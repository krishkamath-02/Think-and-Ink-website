import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Heart, Sparkles, BookOpen, Brain, Palette, Star, Smile, ShieldCheck, Lightbulb, TrendingUp, PenLine, Moon, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-lifestyle.png";
import coverGirl from "@/assets/product-mockup-3d.png";
import coverBoy from "@/assets/product-mockup-boy-3d.png";
import journalIllustration from "@/assets/journal-illustration.png";
import { Reveal } from "@/components/Reveal";
import { Testimonials } from "@/components/Testimonials";

// Interior Pages
import girlIntro from "@/assets/girl-edition/girl-intro.jpg";
import boyIntro from "@/assets/boy-edition/boy-intro.jpg";
import readingCorner from "@/assets/reading-corner.jpg";

import girlInside1 from "@/assets/girl-edition/4.jpg";
import girlInside2 from "@/assets/girl-edition/8.jpg";
import girlInside3 from "@/assets/girl-edition/10.jpg";
import girlInside4 from "@/assets/girl-edition/12.jpg";
import girlInside5 from "@/assets/girl-edition/18.jpg";
import girlInside6 from "@/assets/girl-edition/20.jpg";
import girlInside7 from "@/assets/girl-edition/24.jpg";

import boyInside1 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.13.jpeg";
import boyInside2 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.14 (1).jpeg";
import boyInside3 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.14.jpeg";
import boyInside4 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.15.jpeg";
import boyInside5 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.16 (1).jpeg";
import boyInside6 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.16 (2).jpeg";
import boyInside7 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.16.jpeg";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const [activeEdition, setActiveEdition] = useState<'girl' | 'boy'>('girl');
  const [currentIndex, setCurrentIndex] = useState(3);

  useEffect(() => {
    setCurrentIndex(3);
  }, [activeEdition]);

  const girlPages = [girlIntro, girlInside3, girlInside4, girlInside5, girlInside6, girlInside7];
  const boyPages = [boyIntro, boyInside5, boyInside4, boyInside2, readingCorner, boyInside1];
  const activePages = activeEdition === 'girl' ? girlPages : boyPages;

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={heroBg} alt="" className="w-full h-full object-cover object-top" width={1920} height={1080} />
          <div className="absolute inset-0 bg-background/55" />
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 flex flex-col lg:flex-row items-center gap-12">
          <Reveal direction="up" className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 mb-6">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-secondary-foreground">Guided Journals for Kids</span>
            </div>
            <h1 className="font-display text-5xl md:text-7xl font-bold leading-tight text-foreground">
              They Think.{" "}
              <span className="text-primary">They Ink.</span>{" "}
              <span className="text-teal">They Shine.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              A guided journaling experience that helps kids name their feelings, dream big, and discover who they truly are.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/shop">
                <Button variant="hero" size="lg" className="text-base px-8 py-6 w-full sm:w-auto">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Explore Journals
                </Button>
              </Link>
              <a href="https://mybook.to/thinkandink-girl" target="_blank" rel="noopener noreferrer">
                <Button variant="outline" size="lg" className="text-base px-8 py-6 bg-white/50 backdrop-blur-sm border-primary/20 hover:bg-primary/5 hover:text-primary w-full sm:w-auto">
                  <Globe className="w-5 h-5 mr-2" />
                  Amazon Global
                </Button>
              </a>
            </div>
          </Reveal>
          <Reveal direction="up" delay={0.2} className="flex-1 flex justify-center">
            <div className="relative flex items-end justify-center gap-4 md:gap-6">
              {/* Shared glow */}
              <div className="absolute -inset-6 bg-gradient-to-br from-primary/20 via-amber/15 to-teal/20 rounded-3xl blur-3xl" />

              {/* Girl Edition */}
              <div className="relative flex flex-col items-center">
                <div className="absolute -top-5 -left-3 bg-primary text-primary-foreground rounded-xl px-3 py-1 shadow-lg text-[10px] font-bold uppercase tracking-wide z-10">
                  🌸 Girl Edition
                </div>
                <div className="img-protect w-36 md:w-52 rounded-2xl">
                  <img
                    src={coverGirl}
                    alt="Brave Curious Me — Girl Edition journal 3D mockup"
                    className="relative w-full drop-shadow-2xl animate-float"
                    width={208}
                    height={208}
                  />
                </div>
              </div>

              {/* Boy Edition */}
              <div className="relative flex flex-col items-center" style={{ marginBottom: "-1.5rem" }}>
                <div className="absolute -top-5 -right-3 bg-teal text-teal-foreground rounded-xl px-3 py-1 shadow-lg text-[10px] font-bold uppercase tracking-wide z-10">
                  🚀 Boy Edition
                </div>
                <div className="img-protect w-36 md:w-52 rounded-2xl">
                  <img
                    src={coverBoy}
                    alt="Brave Curious Me — Boy Edition journal 3D mockup"
                    className="relative w-full drop-shadow-2xl animate-float animation-delay-400 rounded-lg"
                    width={208}
                    height={208}
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 bg-amber text-amber-foreground rounded-2xl px-3 py-1.5 shadow-lg animate-sparkle animation-delay-600 z-10">
                  <Star className="w-4 h-4 inline mr-1" />
                  <span className="text-xs font-bold">Just Launched!</span>
                </div>
              </div>

              {/* Brave badge top-right of entire group */}
              <div className="absolute -top-6 right-0 bg-secondary text-secondary-foreground rounded-2xl px-3 py-1.5 shadow-lg animate-sparkle text-xs font-bold">
                <Heart className="w-4 h-4 inline mr-1 text-primary" />
                Curious
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Tagline Banner */}
      <section className="bg-primary py-6">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="font-display text-xl md:text-2xl font-bold text-primary-foreground tracking-wide">
            "When they can name it, they can tame it."
          </p>
        </div>
      </section>

      {/* Features / Promise */}
      <section className="py-24 bg-warm">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">The Think & Ink Promise</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Through daily journaling, we help your child build the inner tools they need to navigate life with confidence.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Heart, title: "Emotional Intelligence", desc: "Learning to name, understand, and manage feelings early in life.", color: "bg-secondary text-primary" },
              { icon: Brain, title: "Growth Mindset", desc: "Embracing challenges and understanding the Power of Yet.", color: "bg-teal/10 text-teal" },
              { icon: Sparkles, title: "Cultivate Gratitude", desc: "Shifting focus toward the small joys and positive moments of every day.", color: "bg-amber/10 text-amber" },
              { icon: Palette, title: "Unlock Creativity", desc: "A judgment-free space for thinking with a pencil through drawing and writing.", color: "bg-primary/10 text-primary" },
            ].map((feature, i) => (
              <Reveal key={feature.title} delay={i * 0.1}>
                <div className="group h-full bg-card rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
                  <div className={`w-14 h-14 ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* About / Journal Preview */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <Reveal direction="right" className="flex-1 flex justify-center">
              <div className="img-protect w-64 md:w-80 rounded-2xl">
                <img
                  src={journalIllustration}
                  alt="Think and Ink journal"
                  className="w-full animate-float animation-delay-200"
                  loading="lazy"
                  width={800}
                  height={800}
                />
              </div>
            </Reveal>
            <Reveal direction="left" delay={0.2} className="flex-1">
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">More Than a Journal</h2>
              <p className="mt-6 text-muted-foreground leading-relaxed">
                Think & Ink isn't just a collection of blank pages. It's a thoughtfully designed experience that gently nudges young minds to reflect, dream, question, and grow. Through prompts, affirmations, and creative exercises, it invites kids to explore their inner world without judgment.
              </p>
              <div className="mt-8 space-y-4">
                {["Guided prompts & affirmations", "Creative drawing exercises", "Gratitude & reflection pages", "Sticker reward charts"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                      <Star className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium text-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/shop">
                  <Button variant="hero" size="lg">
                    Get Your Copy
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What's Inside Teaser */}
      <section className="py-24 bg-card/50 overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center mb-12">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Peek Inside the Pages</h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
              Every edition is packed with mood trackers, doodle spaces, and empowering prompts carefully curated for growing minds.
            </p>
          </Reveal>

          {/* Tab Switcher */}
          <Reveal delay={0.1} className="flex justify-center mb-16">
            <div className="inline-flex bg-background p-1.5 rounded-full border border-border/50 shadow-sm relative w-[280px]">
              <div
                className="absolute inset-y-1.5 rounded-full transition-all duration-300 ease-out"
                style={{
                  width: 'calc(50% - 6px)',
                  left: activeEdition === 'girl' ? '6px' : '50%',
                  backgroundColor: activeEdition === 'girl' ? 'hsl(var(--primary) / 0.1)' : 'hsl(var(--teal) / 0.1)',
                }}
              />
              <button
                onClick={() => setActiveEdition('girl')}
                className={`flex-1 relative py-2.5 rounded-full text-sm font-semibold transition-colors z-10 flex items-center justify-center gap-2 ${activeEdition === 'girl' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
              >
                🌸 Girl Edition
              </button>
              <button
                onClick={() => setActiveEdition('boy')}
                className={`flex-1 relative py-2.5 rounded-full text-sm font-semibold transition-colors z-10 flex items-center justify-center gap-2 ${activeEdition === 'boy' ? 'text-teal' : 'text-muted-foreground hover:text-foreground'}`}
              >
                🚀 Boy Edition
              </button>
            </div>
          </Reveal>

          {/* 3D Coverflow Carousel */}
          <Reveal delay={0.2}>
            <div className="relative h-[450px] md:h-[550px] max-w-6xl mx-auto flex items-center justify-center perspective-[1200px] overflow-hidden sm:overflow-visible">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeEdition}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="relative w-full h-full flex items-center justify-center"
                >
                  {activePages.map((img, i) => {
                    const offset = i - currentIndex;
                    const isMiddle = offset === 0;

                    // Pronounced Semi-circle math
                    const xRadius = 500; // How far they spread horizontally
                    const zRadius = 400; // How deep the curve goes
                    const angleStepDeg = 25; // Degrees between each card
                    const thetaDeg = offset * angleStepDeg;
                    const thetaRad = (thetaDeg * Math.PI) / 180;

                    const xTranslation = xRadius * Math.sin(thetaRad);
                    const zTranslation = zRadius * Math.cos(thetaRad) - zRadius;
                    const rotationY = -thetaDeg;

                    const scale = isMiddle ? 1.05 : 0.9;

                    return (
                      <motion.div
                        key={`${activeEdition}-${i}`}
                        initial={false}
                        animate={{
                          x: xTranslation,
                          z: zTranslation,
                          rotateY: rotationY,
                          scale: scale,
                          opacity: Math.abs(offset) > 3 ? 0 : 1
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          damping: 20,
                          mass: 1
                        }}
                        onClick={() => setCurrentIndex(i)}
                        className="absolute w-[220px] md:w-[300px] aspect-[4/5] rounded-2xl overflow-hidden shadow-2xl border border-border/40 cursor-pointer origin-center"
                        style={{
                          zIndex: 100 - Math.abs(offset),
                          transformStyle: "preserve-3d"
                        }}
                      >
                        <div className="img-protect w-full h-full">
                          <img
                            src={img}
                            alt={`${activeEdition} edition page ${i + 1}`}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        {/* Shading effect to simulate 3D lighting */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 to-white/10 pointer-events-none" />
                        {!isMiddle && (
                          <div className="absolute inset-0 bg-background/30 pointer-events-none transition-opacity duration-300" />
                        )}
                      </motion.div>
                    );
                  })}
                </motion.div>
              </AnimatePresence>

              {/* Navigation Controls */}
              <div className="absolute inset-x-2 md:-inset-x-4 top-1/2 -translate-y-1/2 flex justify-between z-50 pointer-events-none">
                <button
                  onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
                  disabled={currentIndex === 0}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center shadow-lg disabled:opacity-0 hover:bg-background transition-all duration-300 text-foreground"
                  aria-label="Previous page"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
                </button>
                <button
                  onClick={() => setCurrentIndex(prev => Math.min(activePages.length - 1, prev + 1))}
                  disabled={currentIndex === activePages.length - 1}
                  className="pointer-events-auto w-12 h-12 rounded-full bg-background/80 backdrop-blur-md border border-border flex items-center justify-center shadow-lg disabled:opacity-0 hover:bg-background transition-all duration-300 text-foreground"
                  aria-label="Next page"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </button>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.4} className="mt-16 text-center relative z-20">
            <Link to="/shop">
              <Button variant="hero" size="lg">
                See Full Gallery in Shop
              </Button>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* Social Proof / Testimonials */}
      <Testimonials />

      {/* ===== WHY JOURNALING? ===== */}
      <section className="py-28 bg-warm overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">

          {/* Heading */}
          <Reveal className="text-center mb-6">
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-4">
              <PenLine className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-primary uppercase tracking-widest">Science-Backed</span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Why Journaling?
            </h2>
            <p className="mt-4 text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Research consistently shows that children who journal regularly develop stronger emotional regulation, higher self-esteem, and better academic outcomes. Here's what the science says.
            </p>
          </Reveal>

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {[
              { stat: "3×", label: "more likely to express emotions healthily", color: "from-primary/20 to-primary/5", textColor: "text-primary" },
              { stat: "82%", label: "of kids report feeling calmer after journaling", color: "from-teal/20 to-teal/5", textColor: "text-teal" },
              { stat: "15 min", label: "a day is all it takes to build the habit", color: "from-amber/20 to-amber/5", textColor: "text-amber" },
              { stat: "↑ GPA", label: "students who reflect daily show higher academic focus", color: "from-secondary to-secondary/30", textColor: "text-primary" },
            ].map((item, i) => (
              <Reveal key={item.stat} delay={i * 0.1}>
                <div className={`bg-gradient-to-br ${item.color} rounded-2xl p-6 text-center border border-border/40 hover:shadow-lg transition-all hover:-translate-y-1 duration-300`}>
                  <p className={`font-display text-4xl md:text-5xl font-black ${item.textColor} mb-2`}>{item.stat}</p>
                  <p className="text-xs text-muted-foreground leading-snug">{item.label}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Benefits grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {[
              {
                icon: Smile,
                title: "Emotional Awareness",
                desc: "Journaling helps children identify and name their emotions, developing the vocabulary of feelings that serves them for life.",
                pill: "Ages 6–14",
                pillColor: "bg-secondary text-primary",
                iconBg: "bg-secondary text-primary",
              },
              {
                icon: Brain,
                title: "Cognitive Development",
                desc: "Writing activates both hemispheres of the brain — strengthening memory, language, and critical thinking simultaneously.",
                pill: "Brain Science",
                pillColor: "bg-teal/10 text-teal",
                iconBg: "bg-teal/10 text-teal",
              },
              {
                icon: ShieldCheck,
                title: "Resilience Building",
                desc: "Kids who reflect on difficult experiences through writing bounce back from setbacks faster and with more confidence.",
                pill: "Mental Health",
                pillColor: "bg-primary/10 text-primary",
                iconBg: "bg-primary/10 text-primary",
              },
              {
                icon: TrendingUp,
                title: "Growth Mindset",
                desc: "Prompts that celebrate effort over outcome teach children that every mistake is simply the next step in learning.",
                pill: "Proven Method",
                pillColor: "bg-amber/10 text-amber",
                iconBg: "bg-amber/10 text-amber",
              },
              {
                icon: Lightbulb,
                title: "Creative Confidence",
                desc: "A non-judgmental space for ideas unlocks imaginative thinking and helps children trust their own voice.",
                pill: "Creativity",
                pillColor: "bg-purple-100 text-purple-600",
                iconBg: "bg-purple-100 text-purple-600",
              },
              {
                icon: Moon,
                title: "Better Sleep",
                desc: "An evening journaling routine helps kids process the day's events, reducing anxiety and leading to more restful sleep.",
                pill: "Daily Ritual",
                pillColor: "bg-teal/10 text-teal",
                iconBg: "bg-teal/10 text-teal",
              },
            ].map((benefit, i) => (
              <Reveal key={benefit.title} delay={i * 0.08}>
                <div className="group h-full bg-card rounded-2xl p-7 shadow-sm border border-border/50 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col">
                  <div className="flex items-start justify-between mb-5">
                    <div className={`w-12 h-12 ${benefit.iconBg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <benefit.icon className="w-6 h-6" />
                    </div>
                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${benefit.pillColor}`}>{benefit.pill}</span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed flex-1">{benefit.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Pull-quote CTA */}
          <Reveal>
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary to-amber p-px">
              <div className="bg-card rounded-3xl px-8 py-12 md:py-16 text-center">
                <Heart className="w-10 h-10 text-primary mx-auto mb-4" />
                <blockquote className="font-display text-2xl md:text-3xl font-bold text-foreground max-w-3xl mx-auto leading-snug">
                  "Children don't need more screen time — they need more <span className="text-primary">reflection</span> time."
                </blockquote>
                <p className="mt-4 text-sm text-muted-foreground">— Child Psychologists &amp; Educators worldwide</p>
                <div className="mt-8">
                  <Link to="/shop">
                    <Button variant="hero" size="lg" className="px-10">
                      <BookOpen className="w-5 h-5 mr-2" />
                      Start Their Journaling Journey
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </section>


      {/* Testimonial / Quote */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-amber/5 to-teal/5">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <Sparkles className="w-10 h-10 text-amber mx-auto mb-6" />
          <blockquote className="font-display text-3xl md:text-4xl font-bold text-foreground leading-snug">
            "Your thoughts are worth thinking. Your words are worth writing. You are worth knowing."
          </blockquote>
          <p className="mt-6 text-sm font-semibold text-primary uppercase tracking-widest">Think & Ink</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-foreground">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-background">Ready to Start the Journey?</h2>
          <p className="mt-4 text-background/70 max-w-xl mx-auto">
            Give your child the gift of self-expression. Think it. Feel it. Write it.
          </p>
          <div className="mt-8">
            <Link to="/shop">
              <Button variant="hero" size="lg" className="text-base px-10 py-6">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
