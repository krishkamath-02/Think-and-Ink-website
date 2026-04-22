import { Star, Quote } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  {
    quote: "My daughter used to struggle to explain how her day went. This journal changed everything. The prompts are gentle and she actually looks forward to filling it out!",
    author: "Sarah M.",
    role: "Mother of a 7-year-old",
    rating: 5,
  },
  {
    quote: "As a child psychologist, I often recommend Think & Ink. It's brilliantly structured to build emotional intelligence and confidence without feeling like 'homework'.",
    author: "Dr. Emily R.",
    role: "Child Psychologist",
    rating: 5,
  },
  {
    quote: "The stickers and creative drawing pages make my son excited to write every day. It's beautifully crafted and feels like a truly premium keepsake.",
    author: "Mark T.",
    role: "Father of a 9-year-old",
    rating: 5,
  },
  {
    quote: "I bought these for my classroom. It's amazing to see the quietest kids open up and express their big feelings on these pages.",
    author: "Jessica C.",
    role: "2nd Grade Teacher",
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section className="py-24 bg-background overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 mb-6">
            <Star className="w-4 h-4 text-primary fill-primary" />
            <span className="text-xs font-semibold text-secondary-foreground">Trust & Love</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Loved by Parents & Experts</h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            See what families and professionals are saying about the Think & Ink experience.
          </p>
        </Reveal>

        <Reveal delay={0.2} className="relative max-w-5xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="pl-4 md:pl-6 md:basis-1/2 lg:basis-1/2">
                  <div className="bg-card h-full rounded-3xl p-8 md:p-10 shadow-sm border border-border/50 relative group hover:shadow-xl transition-shadow duration-300">
                    <Quote className="absolute top-8 right-8 w-10 h-10 text-primary/10 rotate-180" />
                    
                    <div className="flex gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-5 h-5 text-amber fill-amber" />
                      ))}
                    </div>
                    
                    <p className="text-lg text-foreground font-medium leading-relaxed mb-8 relative z-10">
                      "{testimonial.quote}"
                    </p>
                    
                    <div className="mt-auto">
                      <p className="font-display font-bold text-foreground text-lg">{testimonial.author}</p>
                      <p className="text-sm text-primary font-semibold tracking-wide uppercase mt-1">{testimonial.role}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            {/* Added a containing wrapper to ensure buttons don't break layout and are positioned nicely */}
            <div className="hidden md:block">
              <CarouselPrevious className="absolute -left-16 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-none shadow-md w-12 h-12" />
              <CarouselNext className="absolute -right-16 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white border-none shadow-md w-12 h-12" />
            </div>
          </Carousel>
        </Reveal>
      </div>
    </section>
  );
}
