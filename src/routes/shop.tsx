import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, BookOpen, Flower2, MessageCircle, Truck, CreditCard, RefreshCw, IndianRupee, Clock, Globe, PenTool, Lightbulb } from "lucide-react";
import coverFull from "@/assets/cover-girl-edition.png";
import { Reveal } from "@/components/Reveal";
import { OrderModal } from "@/components/OrderModal";
import { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import girlCover3d from "@/assets/product-mockup-3d.png";
import girlEdition1 from "@/assets/girl-edition/4.jpg";
import girlEdition2 from "@/assets/girl-edition/8.jpg";
import girlEdition3 from "@/assets/girl-edition/10.jpg";
import girlEdition4 from "@/assets/girl-edition/12.jpg";
import girlEdition5 from "@/assets/girl-edition/18.jpg";
import girlEdition6 from "@/assets/girl-edition/20.jpg";
import girlEdition7 from "@/assets/girl-edition/24.jpg";
import boyEdition1 from "@/assets/product-mockup-boy-3d.png";
import boyEdition2 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.13.jpeg";
import boyEdition3 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.14 (1).jpeg";
import boyEdition4 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.14.jpeg";
import boyEdition5 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.15.jpeg";
import boyEdition6 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.16 (1).jpeg";
import boyEdition7 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.16 (2).jpeg";
import boyEdition8 from "@/assets/boy-edition/book/WhatsApp Image 2026-04-21 at 22.01.16.jpeg";

function ReactionButtons({ initialPen, initialBulb }: { initialPen: number, initialBulb: number }) {
  const [pen, setPen] = useState({ count: initialPen, active: false });
  const [bulb, setBulb] = useState({ count: initialBulb, active: false });

  return (
    <div className="flex gap-3 mt-3 mb-1">
      <button
        onClick={() => setPen(p => ({ count: p.active ? p.count - 1 : p.count + 1, active: !p.active }))}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${pen.active ? 'bg-primary/10 text-primary border border-primary/20' : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-transparent'}`}
        title="Loved writing!"
      >
        <PenTool className="w-3.5 h-3.5" />
        {pen.count}
      </button>
      <button
        onClick={() => setBulb(b => ({ count: b.active ? b.count - 1 : b.count + 1, active: !b.active }))}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${bulb.active ? 'bg-amber/10 text-amber-600 border border-amber/20' : 'bg-secondary/50 text-secondary-foreground hover:bg-secondary border border-transparent'}`}
        title="Thinking of buying"
      >
        <Lightbulb className="w-3.5 h-3.5" />
        {bulb.count}
      </button>
    </div>
  );
}

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Think & Ink Journals" },
      { name: "description", content: "Browse our collection of guided journals, creative kits, and more for kids." },
      { property: "og:title", content: "Shop — Think & Ink Journals" },
      { property: "og:description", content: "Browse our collection of guided journals, creative kits, and more for kids." },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ItemList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "item": {
                "@type": "Product",
                "name": "Brave • Curious • Me  Girl Edition",
                "description": "Our signature guided journal packed with prompts, affirmations, and creative exercises for ages 6–12.",
                "brand": {
                  "@type": "Brand",
                  "name": "Think & Ink"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "599",
                  "availability": "https://schema.org/InStock"
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 2,
              "item": {
                "@type": "Product",
                "name": "Brave • Curious • Me  Boy Edition",
                "description": "Our special edition guided journal packed with prompts, affirmations, and creative exercises for boys ages 6–12.",
                "brand": {
                  "@type": "Brand",
                  "name": "Think & Ink"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "599",
                  "availability": "https://schema.org/InStock"
                }
              }
            }
          ]
        })
      }
    ],
  }),
  component: ShopPage,
});

function ShopPage() {
  const [selectedProduct, setSelectedProduct] = useState<{ title: string; price: string } | null>(null);

  const products = [
    {
      title: "Brave • Curious • Me  Girl Edition",
      desc: "Our signature guided journal packed with prompts, affirmations, and creative exercises for ages 6–12.",
      price: "₹599",
      badge: "Bestseller",
      amazonLink: "https://mybook.to/thinkandink-girl",
      images: [girlCover3d, coverFull, girlEdition1, girlEdition2, girlEdition3, girlEdition4, girlEdition5, girlEdition6, girlEdition7],
      icon: BookOpen,
      penCount: 25,
      bulbCount: 11,
    },
    {
      title: "Brave • Curious • Me  Boy Edition",
      desc: "Our special edition guided journal packed with prompts, affirmations, and creative exercises for boys ages 6–12.",
      price: "₹599",
      badge: "Just Launched",
      images: [boyEdition1, boyEdition7, boyEdition6, boyEdition8, boyEdition5, boyEdition3, boyEdition4, boyEdition2],
      icon: Flower2,
      penCount: 5,
      bulbCount: 2,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <section className="pt-32 pb-16 bg-warm">
        <Reveal className="mx-auto max-w-7xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 mb-6">
            <ShoppingBag className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-secondary-foreground">Shop</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground">Our Collection</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            Tools for self-expression, creativity, and confidence — designed with love for little thinkers.
          </p>
        </Reveal>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {products.map((product, i) => (
              <Reveal key={product.title} delay={i * 0.1}>
                <div className="group h-full bg-card rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-border/50">
                  <div className="relative aspect-square bg-warm flex items-center justify-center p-8 overflow-hidden">
                    <Carousel className="w-full max-w-[75%]">
                      <CarouselContent>
                        {product.images.map((img, i) => (
                          <CarouselItem key={i} className="flex justify-center items-center">
                            <div className="img-protect w-48 aspect-square rounded-xl">
                              <img src={img} alt={`${product.title} view ${i + 1}`} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                      <CarouselPrevious className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" />
                      <CarouselNext className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 hover:bg-white" />
                    </Carousel>
                    {product.badge && (
                      <span className="absolute top-4 right-4 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <product.icon className="w-4 h-4 text-primary" />
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map((s) => (
                          <Star key={s} className="w-3 h-3 text-amber fill-amber" />
                        ))}
                      </div>
                    </div>
                    <h3 className="font-display text-lg font-bold text-foreground">{product.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{product.desc}</p>
                    <ReactionButtons initialPen={product.penCount} initialBulb={product.bulbCount} />
                    <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <span className="font-display text-xl font-bold text-primary">{product.price}</span>
                      {product.price !== "Coming Soon" && (
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                          <Button
                            variant="hero"
                            size="sm"
                            onClick={() => setSelectedProduct({ title: product.title, price: product.price })}
                            className="flex items-center gap-1.5 w-full"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Order via WhatsApp
                          </Button>
                          {product.amazonLink && (
                            <a href={product.amazonLink} target="_blank" rel="noopener noreferrer" className="w-full">
                              <Button
                                variant="outline"
                                size="sm"
                                className="flex items-center justify-center gap-1.5 w-full border-primary/20 hover:bg-primary/5 hover:text-primary"
                              >
                                <Globe className="w-4 h-4" />
                                Amazon Global
                              </Button>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Shipping & Payment */}
      <section className="py-20 bg-warm">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Shipping &amp; Payment</h2>
            <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
              Everything you need to know before you order.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Delivery */}
            <Reveal delay={0}>
              <div className="bg-card rounded-3xl p-7 h-full border border-border/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center mb-5">
                  <Truck className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">Pan-India Delivery</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We ship to every corner of India. Delivery takes <span className="font-semibold text-foreground">3–7 business days</span> depending on your location.
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed mt-2 border-t border-border/50 pt-2">
                  For international orders, please order via our <a href="https://mybook.to/thinkandink-girl" target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline inline-flex items-center gap-1">Amazon Global Store <Globe className="w-3 h-3" /></a>.
                </p>
              </div>
            </Reveal>

            {/* Shipping fee */}
            <Reveal delay={0.1}>
              <div className="bg-card rounded-3xl p-7 h-full border border-border/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-teal/10 rounded-2xl flex items-center justify-center mb-5">
                  <IndianRupee className="w-6 h-6 text-teal" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">Free Shipping</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Enjoy <span className="font-semibold text-foreground">free shipping on every order</span>, anywhere in India. No minimum order, no hidden charges.
                </p>
              </div>
            </Reveal>

            {/* Payment */}
            <Reveal delay={0.2}>
              <div className="bg-card rounded-3xl p-7 h-full border border-border/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-5">
                  <CreditCard className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">Payment Methods</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  We accept <span className="font-semibold text-foreground">UPI, Google Pay, PhonePe, NEFT/IMPS</span>, and all major cards. No Cash on Delivery.
                </p>
              </div>
            </Reveal>

            {/* Exchange */}
            <Reveal delay={0.3}>
              <div className="bg-card rounded-3xl p-7 h-full border border-border/50 shadow-sm hover:shadow-lg transition-shadow">
                <div className="w-12 h-12 bg-secondary rounded-2xl flex items-center justify-center mb-5">
                  <RefreshCw className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-display text-lg font-bold text-foreground mb-2">Exchange Policy</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Received a damaged copy? We offer <span className="font-semibold text-foreground">exchanges within 7 days</span> of delivery. No returns, only exchanges.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Payment note */}
          <Reveal delay={0.1} className="mt-10">
            <div className="bg-amber/10 border border-amber/30 rounded-2xl px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Clock className="w-6 h-6 text-amber shrink-0 mt-0.5 sm:mt-0" />
              <div>
                <p className="text-sm font-semibold text-foreground">How ordering works</p>
                <p className="text-sm text-muted-foreground mt-0.5">
                  Place your order → Share payment confirmation on WhatsApp → We dispatch within 1–2 business days once payment is verified → We will share the tracking details on WhatsApp.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />

      {/* Floating WhatsApp Widget */}
      <a
        href={`https://wa.me/917822845048?text=${encodeURIComponent("Hi Think & Ink! 👋 I have a question about your journals.")}`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-50 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Message us to order!
        </span>
      </a>

      {/* Order Modal */}
      {selectedProduct && (
        <OrderModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
}
