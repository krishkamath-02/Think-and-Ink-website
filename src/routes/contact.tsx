import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Mail, MessageCircle, Send } from "lucide-react";
import { useState } from "react";
import { Reveal } from "@/components/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Think & Ink" },
      { name: "description", content: "Get in touch with Think & Ink. We'd love to hear from you!" },
      { property: "og:title", content: "Contact — Think & Ink" },
      { property: "og:description", content: "Get in touch with Think & Ink." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-24">
        <div className="mx-auto max-w-3xl px-6">
          <Reveal className="text-center mb-12">
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 mb-6">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span className="text-xs font-semibold text-secondary-foreground">Get in Touch</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground">We'd Love to Hear From You</h1>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Questions, feedback, or just want to say hello? Drop us a message.
            </p>
          </Reveal>

          {submitted ? (
            <Reveal delay={0.2}>
              <div className="text-center py-16 bg-card rounded-3xl border border-border/50">
                <Send className="w-12 h-12 text-primary mx-auto mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground">We'll get back to you soon.</p>
              </div>
            </Reveal>
          ) : (
            <Reveal delay={0.2} className="bg-card rounded-3xl p-8 md:p-12 shadow-sm border border-border/50">
              <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
                    <input type="text" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                    <input type="email" required className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all" placeholder="hello@example.com" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">Message</label>
                  <textarea required rows={5} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all resize-none" placeholder="Tell us what's on your mind..." />
                </div>
                <Button variant="hero" size="lg" type="submit" className="w-full">
                  <Mail className="w-5 h-5 mr-2" />
                  Send Message
                </Button>
              </form>
            </Reveal>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
