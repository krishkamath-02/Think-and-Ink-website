import { Star, Quote, CheckCircle, Heart, Sparkles } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const testimonials = [
  {
    quote: "Now this is really something awesome, I am in love with the book❤️❤️ and it is just the perfect thing that I was looking for my daughter... she is a child with a high EQ but mature in hiding her feelings. I wanted something that will enable her to express... so thank you for doing this!!! And the personal note, I was moved🥹🥹🥹",
    author: "Aanchal Agarwal",
    role: "Mother of a 6-year-old",
    rating: 5,
    size: "large"
  },
  {
    quote: "My daughter is loving the journal, Kudos to you for taking this forward!",
    author: "Dipsy Kundal",
    role: "I.T Professional & Mother",
    rating: 5,
    size: "small"
  },
  {
    quote: "We received the book, we loved it. Specially the note that is really appreciated. I stuck it in the book itself. 😊❤️",
    author: "Simran Moolani",
    role: "Mother of a 7-year-old",
    rating: 5,
    size: "medium"
  },
  {
    quote: "Thank you for such thoughtful gifts for my neice. She loved it. She has already started writing in her journal..",
    author: "Ritu Punjabi",
    role: "Image Consultant",
    rating: 5,
    size: "small"
  },
  {
    quote: "The prompts are so gentle yet deep. It's helping my son open up about his school day in a way he never did before. Highly recommend for every parent!",
    author: "Karan Mehta",
    role: "Father of an 8-year-old",
    rating: 5,
    size: "medium"
  },
  {
    quote: "The quality of the paper and the illustrations are top-notch. It feels like a premium keepsake that we will treasure forever.",
    author: "Meghna Shah",
    role: "Mother of Two",
    rating: 5,
    size: "small"
  }
]

export function Testimonials() {
  return (
    <section className="py-24 bg-warm/30 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/5 blur-3xl rounded-full -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal/5 blur-3xl rounded-full translate-x-1/3 translate-y-1/3" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <Reveal className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span className="text-xs font-bold text-primary uppercase tracking-widest">The Wall of Love</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
            Trusted by <span className="text-primary italic">Thousands</span> of Families
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            From bedtime reflections to morning gratitude, see how Think & Ink is making a difference in homes across the country.
          </p>
        </Reveal>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {testimonials.map((testimonial, index) => (
            <Reveal
              key={index}
              delay={index * 0.1}
              className="break-inside-avoid"
            >
              <div className={`
                bg-card rounded-[2rem] p-8 shadow-sm border border-border/50 
                relative group hover:shadow-xl transition-all duration-500 
                hover:-translate-y-1 flex flex-col
              `}>
                <Quote className="absolute top-6 right-6 w-8 h-8 text-primary/5 rotate-180 group-hover:text-primary/10 transition-colors" />

                <div className="flex items-center gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber fill-amber animate-sparkle" style={{ animationDelay: `${i * 200}ms` }} />
                  ))}
                </div>

                <p className="text-base text-foreground/90 font-medium leading-relaxed mb-8 italic">
                  "{testimonial.quote}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-teal/20 flex items-center justify-center text-primary font-bold text-lg border-2 border-white shadow-sm">
                    {testimonial.author[0]}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="font-display font-bold text-foreground">{testimonial.author}</p>
                      <CheckCircle className="w-3.5 h-3.5 text-teal" />
                    </div>
                    <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-wider">{testimonial.role}</p>
                  </div>
                </div>

                {index === 0 && (
                  <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-xl shadow-lg border border-border/50 rotate-12 group-hover:rotate-0 transition-transform">
                    <Sparkles className="w-4 h-4 text-amber" />
                  </div>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.5} className="mt-20 text-center">
          <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-primary/20 via-teal/20 to-amber/20">
            <div className="bg-white rounded-[14px] px-8 py-6 flex flex-col md:flex-row items-center gap-6">
              <div className="flex -space-x-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-[10px] font-bold text-primary">
                    {String.fromCharCode(64 + i)}
                  </div>
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold text-foreground">Join 50+ happy parents</p>
                <p className="text-xs text-muted-foreground">Helping kids grow with emotional intelligence every day.</p>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-amber fill-amber" />
                <span className="text-lg font-black text-foreground">4.9/5</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
