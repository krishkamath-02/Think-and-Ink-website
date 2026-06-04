import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { HelpCircle, ChevronDown } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — Think & Ink" },
      { name: "description", content: "Got questions about Think & Ink journals? Find answers about our products, ordering, shipping, payment, and exchange policy." },
      { property: "og:title", content: "FAQ — Think & Ink" },
      { property: "og:description", content: "Frequently asked questions about Think & Ink guided journals for kids." },
    ],
  }),
  component: FAQPage,
});

const faqs = [
  {
    category: "About the Journals",
    items: [
      {
        q: "What journals do you offer?",
        a: "We currently offer five journals:\n\n• Brave • Curious • Me — Girl Edition Vol 1 (ages 6–12)\n• Brave • Curious • Me — Girl Edition Vol 2 (ages 6–12)\n• Brave • Curious • Me — Boy Edition Vol 1 (ages 6–12)\n• Brave • Curious • Me — Life Skills Journal Vol 1 (ages 6–12)\n• Celebrating You Every Day! — A self-reflection & happiness planner designed for adults (mothers, women, and anyone who values self-care).",
      },
      {
        q: "What age group are the kids' journals designed for?",
        a: "The Brave • Curious • Me journals (Girl, Boy, and Life Skills Editions) are designed for kids aged 6–12. The prompts are thoughtfully crafted to be simple enough for early readers yet engaging enough for older children.",
      },
      {
        q: "What's inside the kids' journals?",
        a: "Inside you'll find guided journaling prompts, daily affirmations, creative activities, gratitude & reflection pages, habit trackers, and lots more — all designed to build emotional intelligence.",
      },
      {
        q: "What's inside the 'Celebrating You Every Day!' journal?",
        a: "It's a beautiful self-reflection and happiness planner featuring Ikigai exercises, weekly planners, gratitude pages, mood trackers, and thoughtful prompts designed to help you celebrate yourself every single day.",
      },
      {
        q: "How many pages do the journals have?",
        a: "The kids' journals have approximately 90 pages each. The Celebrating You Every Day! journal also has around 90+ thoughtfully designed pages.",
      },
      {
        q: "Is it a hardcover or softcover book?",
        a: "All journals are A4 size with a soft cover, printed on 100gsm paper that lets you freely write, draw, and colour without worrying about bleed-through. The A4 size makes it comfortable to hold and use.",
      },
    ],
  },
  {
    category: "Bundle Discounts",
    items: [
      {
        q: "What is the Bundle & Save offer?",
        a: "Buy more, save more! When you add multiple different journals to your shelf, discounts apply automatically:\n\n• Any 2 different books — 10% off your entire order\n• Any 3 or more different books — 15% off your entire order\n\nMix and match kids' and adults' editions however you like!",
      },
      {
        q: "Which combinations qualify for the discount?",
        a: "Any combination of 2 or 3 different journals qualifies — Girl + Boy, Girl + Celebrating You, Boy + Celebrating You, or all three together. The discount is based purely on the number of unique titles in your shelf.",
      },
      {
        q: "How is the bundle discount applied?",
        a: "The discount is calculated on the product subtotal (before add-ons and delivery charges). It's applied automatically when qualifying items are in your shelf — no coupon code needed!",
      },
    ],
  },
  {
    category: "Ordering & Payment",
    items: [
      {
        q: "How do I place an order?",
        a: "Browse our Shop page, add journals to your shelf, and click 'Place Order'. Fill in your delivery details and choose your preferred checkout method — Pay Online (Razorpay) or confirm via WhatsApp.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept online payments through Razorpay (UPI, Google Pay, PhonePe, Paytm, debit/credit cards, net banking) and direct payment via WhatsApp (UPI/GPay). We do not accept Cash on Delivery.",
      },
      {
        q: "Is online payment secure?",
        a: "Absolutely! All online payments are processed through Razorpay, one of India's most trusted payment gateways. Your payment details are encrypted and never stored on our servers.",
      },
      {
        q: "When will my order be dispatched?",
        a: "Once we receive and verify your payment, your order will be dispatched within 1–2 business days. You'll receive tracking details on WhatsApp.",
      },
      {
        q: "Can I cancel my order?",
        a: "Cancellations are accepted before the order is dispatched. Please message us on WhatsApp as soon as possible if you'd like to cancel.",
      },
    ],
  },
  {
    category: "Shipping & Delivery",
    items: [
      {
        q: "Do you ship across India?",
        a: "Yes, we ship pan-India — to every state and union territory. Shipping is free on all orders!",
      },
      {
        q: "How long does delivery take?",
        a: "Regular delivery takes 3–7 business days depending on your location. Metro cities are typically faster (3–4 days) while remote areas may take up to 7 business days.",
      },
      {
        q: "Do you offer same-day delivery?",
        a: "Yes! If you're in Pune (pincodes starting with 411 or 412), you can opt for same-day delivery for an additional ₹99. Orders placed before 4 PM are delivered the same day; orders after 4 PM are delivered the next day.",
      },
      {
        q: "What are the shipping charges?",
        a: "Standard shipping is completely free across India! Same-day delivery in Pune is available for ₹99 extra.",
      },
      {
        q: "Will I get a tracking number?",
        a: "Yes! Once your order is dispatched, we'll share the tracking details with you directly on WhatsApp.",
      },
    ],
  },
  {
    category: "Exchange & Support",
    items: [
      {
        q: "What is your exchange policy?",
        a: "We offer exchanges within 7 days of delivery — only in cases where the product is damaged or defective. We do not accept returns.",
      },
      {
        q: "How do I request an exchange?",
        a: "Message us on WhatsApp within 7 days of receiving your order with a photo of the damaged product. We'll guide you through the exchange process.",
      },
      {
        q: "I have more questions — how can I reach you?",
        a: "You can reach us via our Contact page or message us directly on WhatsApp/Instagram. We typically respond within a few hours on business days. On weekends/public holidays there might be a slight delay.",
      },
    ],
  },
];

import { FEATURES } from "@/config/features";

function AccordionItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border/50 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left bg-card hover:bg-warm transition-colors"
      >
        <span className="font-semibold text-foreground text-sm md:text-base leading-snug">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-primary shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? "max-h-64 opacity-100" : "max-h-0 opacity-0"}`}
      >
        <div className="px-6 pb-5 pt-3 bg-card border-t border-border/30">
          <p className="text-sm text-muted-foreground leading-relaxed">{a}</p>
        </div>
      </div>
    </div>
  );
}

function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-16 bg-warm">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 mb-6">
            <HelpCircle className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-secondary-foreground">FAQ</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground">Got Questions?</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            We've answered the most common ones below. Still curious? Just reach out on WhatsApp.
          </p>
        </Reveal>
      </section>

      {/* FAQ Accordion */}
      <section className="py-20">
        <div className="mx-auto max-w-3xl px-6 space-y-12">
          {faqs
            .filter((section) => section.category !== "Bundle Discounts" || FEATURES.ENABLE_BUNDLE_DISCOUNT)
            .map((section, si) => (
              <Reveal key={section.category} delay={si * 0.05}>
                <h2 className="font-display text-2xl font-bold text-foreground mb-5">{section.category}</h2>
                <div className="space-y-3">
                  {section.items.map((item) => (
                    <AccordionItem key={item.q} q={item.q} a={item.a} />
                  ))}
                </div>
              </Reveal>
            ))}
        </div>
      </section>

      {/* Still have questions CTA */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-amber/5 to-teal/5">
        <Reveal className="mx-auto max-w-xl px-6 text-center">
          <h2 className="font-display text-3xl font-bold text-foreground mb-4">Still have a question?</h2>
          <p className="text-muted-foreground mb-8">
            Our team is just a message away. We'd love to help you.
          </p>
          <a
            href={`https://wa.me/917822845048?text=${encodeURIComponent("Hi Think & Ink! 👋 I have a question.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat with us on WhatsApp
          </a>
        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
