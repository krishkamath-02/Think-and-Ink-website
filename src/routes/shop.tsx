import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Star, BookOpen, Flower2, MessageCircle, Truck, CreditCard, RefreshCw, IndianRupee, Clock, Globe, PenTool, Lightbulb, Heart, Download, Layout } from "lucide-react";
import coverFull from "@/assets/cover-girl-edition.png";
import { Reveal } from "@/components/Reveal";
import { OrderModal } from "@/components/OrderModal";
import { BulkOrderModal } from "@/components/BulkOrderModal";
import { useState, useEffect } from "react";
import { FEATURES } from "@/config/features";
import { Plus, Minus, Trash2, Library, X, PackageOpen } from "lucide-react";
import { trackAddToCart, trackRemoveFromCart, trackViewCart, trackBeginCheckout } from "@/lib/analytics";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import girlCover3d from "@/assets/product-mockup-3d.png";
import girlCoverV23D from "@/assets/girl-edition/volume 2/product-mockup-girl-v2-3d.png";

//Life skills journal for Girls and Boys
import lifeSkillsCoverV1_3d from "@/assets/life skills/product-mockup-lifeskills-v1-3d.png";
import lifeSkillsImg1 from "@/assets/life skills/1.jpg";
import lifeSkillsImg2 from "@/assets/life skills/3.jpg";
import lifeSkillsImg3 from "@/assets/life skills/4.jpg";
import lifeSkillsImg4 from "@/assets/life skills/7.jpg";
import lifeSkillsImg5 from "@/assets/life skills/9.jpg";
import lifeSkillsImg6 from "@/assets/life skills/11.jpg";
import lifeSkillsImg7 from "@/assets/life skills/31.jpg";
import lifeSkillsImg8 from "@/assets/life skills/32.jpg";
import lifeSkillsImg9 from "@/assets/life skills/35.jpg";
import lifeSkillsImg10 from "@/assets/life skills/53.jpg";
import lifeSkillsImg11 from "@/assets/life skills/62.jpg";
import lifeSkillsImg12 from "@/assets/life skills/66.jpg";
import lifeSkillsImg13 from "@/assets/life skills/81.jpg";


// Girl Edition Volume 2
import girlEditionV2Img1 from "@/assets/girl-edition/volume 2/1.jpg";
import girlEditionV2Img15 from "@/assets/girl-edition/volume 2/5.jpg";
import girlEditionV2Img16 from "@/assets/girl-edition/volume 2/9.jpg";
import girlEditionV2Img2 from "@/assets/girl-edition/volume 2/10.jpg";
import girlEditionV2Img3 from "@/assets/girl-edition/volume 2/11.jpg";
import girlEditionV2Img4 from "@/assets/girl-edition/volume 2/14.jpg";
import girlEditionV2Img5 from "@/assets/girl-edition/volume 2/16.jpg";
import girlEditionV2Img6 from "@/assets/girl-edition/volume 2/17.jpg";
import girlEditionV2Img7 from "@/assets/girl-edition/volume 2/22.jpg";
import girlEditionV2Img8 from "@/assets/girl-edition/volume 2/30.jpg";
import girlEditionV2Img9 from "@/assets/girl-edition/volume 2/32.jpg";
import girlEditionV2Img10 from "@/assets/girl-edition/volume 2/37.jpg";
import girlEditionV2Img11 from "@/assets/girl-edition/volume 2/40.jpg";
import girlEditionV2Img12 from "@/assets/girl-edition/volume 2/52.jpg";
import girlEditionV2Img13 from "@/assets/girl-edition/volume 2/62.jpg";
import girlEditionV2Img14 from "@/assets/girl-edition/volume 2/72.jpg";

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

// // Mother's Day Edition
// import mothersDayCover from "@/assets/mothers-day/mothers-day-journal-regular.png";
// import mothersDayCustomizedCover from "@/assets/mothers-day/mothers-day-journal-custom.png";
// import mothersDayInside1 from "@/assets/mothers-day/mdj-internal-1.jpg";
// import mothersDayInside2 from "@/assets/mothers-day/mdj-internal-2.jpg";
// import mothersDayInside3 from "@/assets/mothers-day/mdj-internal-3.jpg";
// import mothersDayInside4 from "@/assets/mothers-day/mdj-internal-4.jpg";
// import mothersDayCoverView1 from "@/assets/mothers-day/Mothers-day-cover.png";

//Sneek peek celebrating you every day
import mothersDayCover from "@/assets/celebrating-you/mothers-day-cover.png";
import mothersDayInside1 from "@/assets/celebrating-you/img1.png";
import mothersDayInside2 from "@/assets/celebrating-you/img2.png";
import mothersDayInside3 from "@/assets/celebrating-you/img3.png";
import mothersDayInside4 from "@/assets/celebrating-you/img4.png";
import mothersDayInside5 from "@/assets/celebrating-you/img5.png";
import mothersDayInside6 from "@/assets/celebrating-you/img6.png";
import mothersDayInside7 from "@/assets/celebrating-you/img7.png";
import mothersDayInside8 from "@/assets/celebrating-you/img8.png";
import mothersDayInside9 from "@/assets/celebrating-you/img9.png";
import mothersDayInside10 from "@/assets/celebrating-you/img10.png";

// Celebrating You Every Dayimport celebratingImg1 from "@/assets/celebrating-you/Celebrating_you_image_1.jpeg";
import celebratingImg1 from "@/assets/celebrating-you/Celebrating_you_image_2.jpeg";
import celebratingImg2 from "@/assets/celebrating-you/Celebrating_you_image_3.jpeg";
import celebratingImg3 from "@/assets/celebrating-you/Celebrating_you_image_4.jpeg";
import celebratingImg4 from "@/assets/celebrating-you/Celebrating_you_image_5.jpeg";
import celebratingImg5 from "@/assets/celebrating-you/img2.png";
import celebratingImg6 from "@/assets/celebrating-you/img4.png";
import celebratingImg7 from "@/assets/celebrating-you/img5.png";
import celebratingImg8 from "@/assets/celebrating-you/img7.png";
import celebratingImg9 from "@/assets/celebrating-you/img8.png";
import celebratingImg10 from "@/assets/celebrating-you/img9.png";
import celebratingImg11 from "@/assets/celebrating-you/img10.png";
import mothersDayCoverView2 from "@/assets/mothers-day/Mothers-day-cover.png";

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
            },
            {
              "@type": "ListItem",
              "position": 3,
              "item": {
                "@type": "Product",
                "name": "Mother's Day Special (Standard)",
                "description": "A 32-page guided keepsake designed for you to fill in and gift the most important woman in your life.",
                "brand": {
                  "@type": "Brand",
                  "name": "Think & Ink"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "399",
                  "availability": "https://schema.org/InStock"
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 4,
              "item": {
                "@type": "Product",
                "name": "Mother's Day Special (Customized)",
                "description": "Includes child's name printed on the cover. A 32-page guided keepsake designed for you to fill in and gift the most important woman in your life.",
                "brand": {
                  "@type": "Brand",
                  "name": "Think & Ink"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "499",
                  "availability": "https://schema.org/InStock"
                }
              }
            },
            {
              "@type": "ListItem",
              "position": 5,
              "item": {
                "@type": "Product",
                "name": "Celebrating You Every Day! Journal",
                "description": "A self-reflection, happiness, and mindfulness journal for mothers to celebrate themselves every day.",
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
              "position": 6,
              "item": {
                "@type": "Product",
                "name": "Brave • Curious • Me  Girl Edition Volume 2",
                "description": "The highly anticipated sequel to our best-selling girl edition. Packed with all-new guided prompts, gratitude pages, and creative challenges for girls aged 6–12.",
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
              "position": 7,
              "item": {
                "@type": "Product",
                "name": "Brave • Curious • Me  Life Skills Journal Volume 1",
                "description": "A specialized journal focused on essential life skills, goal setting, emotional growth, and problem-solving exercises for kids.",
                "brand": {
                  "@type": "Brand",
                  "name": "Think & Ink"
                },
                "offers": {
                  "@type": "Offer",
                  "priceCurrency": "INR",
                  "price": "699",
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
  const [shelf, setShelf] = useState<{ title: string; price: string; quantity: number; image: string }[]>([]);
  const [isShelfOpen, setIsShelfOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isBulkOrderOpen, setIsBulkOrderOpen] = useState(false);

  // Track when Shelf widget drawer is opened/closed
  useEffect(() => {
    if (isShelfOpen && shelf.length > 0) {
      trackViewCart(shelf);
    }
  }, [isShelfOpen]);

  const addToShelf = (product: { title: string; price: string; image: string }) => {
    setShelf(prev => {
      const existing = prev.find(p => p.title === product.title);
      if (existing) {
        return prev.map(p => p.title === product.title ? { ...p, quantity: p.quantity + 1 } : p);
      }
      return [...prev, { title: product.title, price: product.price, quantity: 1, image: product.image }];
    });
    setIsShelfOpen(true);
    trackAddToCart({ title: product.title, price: product.price, quantity: 1 });
  };

  const products = [
    {
      title: "Brave • Curious • Me  Girl Edition",
      desc: "Our signature guided journal packed with prompts, affirmations, and creative exercises for ages 6–12.",
      price: "₹599",
      badge: null,
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
      badge: null,
      images: [boyEdition1, boyEdition7, boyEdition6, boyEdition8, boyEdition5, boyEdition3, boyEdition4, boyEdition2],
      icon: Flower2,
      penCount: 5,
      bulbCount: 2,
    },
    {
      title: "Celebrating You Every Day! Journal",
      desc: "A beautiful self-reflection and happiness planner for mothers. Features Ikigai, weekly planners, and more.",
      price: "₹699",
      badge: null,
      launchingOffer: false,
      images: [mothersDayCoverView2, celebratingImg7, celebratingImg1, celebratingImg2, celebratingImg3, celebratingImg4, celebratingImg5, celebratingImg6, celebratingImg8, celebratingImg9, celebratingImg10],
      icon: Heart,
      penCount: 0,
      bulbCount: 0,
    },
    {
      title: "Brave • Curious • Me  Girl Edition Volume 2",
      desc: "The highly anticipated sequel to our best-selling girl edition. Packed with all-new guided prompts, gratitude pages, and creative challenges for girls aged 6–12.",
      price: "₹599",
      badge: "New Release",
      images: [girlCoverV23D, girlEditionV2Img1, girlEditionV2Img2, girlEditionV2Img3, girlEditionV2Img4, girlEditionV2Img5, girlEditionV2Img6, girlEditionV2Img7, girlEditionV2Img8, girlEditionV2Img9, girlEditionV2Img10, girlEditionV2Img11, girlEditionV2Img12, girlEditionV2Img13, girlEditionV2Img14, girlEditionV2Img15, girlEditionV2Img16],
      icon: BookOpen,
      penCount: 0,
      bulbCount: 0,
    },
    {
      title: "Brave • Curious • Me  Life Skills Journal Volume 1",
      desc: "A specialized journal focused on essential life skills, goal setting, emotional growth, and problem-solving exercises for kids.",
      price: "₹699",
      badge: "Just Launched",
      images: [lifeSkillsCoverV1_3d, lifeSkillsImg1, lifeSkillsImg2, lifeSkillsImg3, lifeSkillsImg4, lifeSkillsImg5, lifeSkillsImg6, lifeSkillsImg7, lifeSkillsImg8, lifeSkillsImg9, lifeSkillsImg10, lifeSkillsImg11, lifeSkillsImg12, lifeSkillsImg13],
      icon: BookOpen,
      penCount: 0,
      bulbCount: 0,
    },
    // {
    //   title: "Mother's Day Special (Standard)",
    //   desc: "She deserves more than a card. A 32-page guided keepsake for Mother's Day.",
    //   price: "Sold Out",
    //   badge: "Sold Out",
    //   images: [mothersDayCover, mothersDayInside1, mothersDayInside2, mothersDayInside3, mothersDayInside4],
    //   icon: Heart,
    //   penCount: 15,
    //   bulbCount: 10,
    // },
    // {
    //   title: "Mother's Day Special (Customized)",
    //   desc: "Includes child's name printed on the cover. A 32-page guided keepsake for Mother's Day.",
    //   price: "Sold Out",
    //   badge: "Sold Out",
    //   images: [mothersDayCustomizedCover, mothersDayInside1, mothersDayInside2, mothersDayInside3, mothersDayInside4],
    //   icon: Heart,
    //   penCount: 22,
    //   bulbCount: 18,
    // },
  ];

  const digitalProducts = [
    {
      title: "The Courage Challenge",
      desc: "A 7-day mini-journal focused on building bravery and trying new things. Perfect for home printing.",
      price: "₹99",
      badge: "Instant Download",
      images: [girlEdition3], // Placeholder
      icon: Layout,
    },
    {
      title: "Expression Sheet Bundle",
      desc: "A collection of 5 best-selling guided prompts from our physical journals in digital format.",
      price: "₹49",
      badge: "Digital Pack",
      images: [boyEdition4], // Placeholder
      icon: Download,
    }
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
                    {/* Launching Offer banner */}
                    {product.launchingOffer && (
                      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-r from-amber via-amber/90 to-amber py-1.5 text-center">
                        <p className="text-[10px] md:text-xs font-black text-amber-foreground uppercase tracking-[0.15em] flex items-center justify-center gap-2">
                          <span>🎉</span>
                          <span>Launching Offer</span>
                          <span>•</span>
                          <span>Limited Time</span>
                          <span>🎉</span>
                        </p>
                      </div>
                    )}
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
                      <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${product.launchingOffer ? 'top-10 bg-amber text-amber-foreground' : 'bg-primary text-primary-foreground'}`}>
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
                      {product.price !== "Coming Soon" && product.price !== "Sold Out" && (
                        <div className="flex flex-col gap-2 w-full sm:w-auto">
                          <Button
                            variant="hero"
                            size="sm"
                            onClick={() => addToShelf({ title: product.title, price: product.price, image: product.images[0] })}
                            className="flex items-center gap-1.5 w-full"
                          >
                            <Library className="w-4 h-4" />
                            Add to Shelf
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

      {/* Bulk Order CTA Banner */}
      <section className="py-12 bg-amber/10 border-y border-amber/20">
        <div className="mx-auto max-w-7xl px-6">
          <Reveal className="flex flex-col md:flex-row items-center justify-between gap-8 bg-white/60 backdrop-blur-md p-8 md:p-10 rounded-[2rem] shadow-sm border border-border/50">
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 rounded-full bg-amber/20 px-4 py-1.5 mb-4">
                <PackageOpen className="w-4 h-4 text-amber-900" />
                <span className="text-xs font-bold text-amber-900 uppercase tracking-widest">Special Occasions</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-foreground mb-3">Planning a party or an event?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl">
                Get special pricing for bulk orders! Perfect for return gifts, school workshops, or community events.
              </p>
            </div>
            <div className="shrink-0 w-full md:w-auto">
              <Button
                variant="hero"
                size="lg"
                onClick={() => setIsBulkOrderOpen(true)}
                className="w-full md:w-auto shadow-xl hover:shadow-2xl transition-all"
              >
                Inquire Bulk Pricing
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Digital Library Section */}
      {FEATURES.SHOW_DIGITAL_LIBRARY && (
        <section className="py-24 bg-primary/5">
          <div className="mx-auto max-w-7xl px-6">
            <Reveal className="text-center mb-16">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 mb-6">
                <Download className="w-4 h-4 text-primary" />
                <span className="text-xs font-semibold text-primary uppercase tracking-widest">Digital Library</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">Printable Mini-Journals</h2>
              <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
                Get instant access to our curated guided sheets and challenges. Perfect for printing at home.
              </p>
            </Reveal>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">
              {digitalProducts.map((product, i) => (
                <Reveal key={product.title} delay={i * 0.1}>
                  <div className="group bg-card rounded-3xl overflow-hidden shadow-sm border border-border/50 flex flex-col sm:flex-row h-full hover:shadow-xl transition-all duration-300">
                    <div className="sm:w-2/5 aspect-square bg-warm p-6 flex items-center justify-center">
                      <div className="img-protect w-full h-full">
                        <img src={product.images[0]} alt={product.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-2 mb-2">
                        <product.icon className="w-4 h-4 text-primary" />
                        <span className="text-[10px] font-bold text-primary uppercase tracking-wider bg-primary/5 px-2 py-0.5 rounded-full">{product.badge}</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-foreground">{product.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground leading-relaxed flex-1">{product.desc}</p>
                      <div className="mt-6 flex items-center justify-between">
                        <span className="font-display text-xl font-bold text-primary">{product.price}</span>
                        <Button
                          variant="hero"
                          size="sm"
                          onClick={() => addToShelf({ title: product.title, price: product.price, image: product.images[0] })}
                          className="flex items-center gap-1.5"
                        >
                          <Library className="w-4 h-4" />
                          Add to Shelf
                        </Button>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

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
        className="fixed bottom-6 right-6 bg-[#25D366] text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform z-40 flex items-center justify-center group"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="absolute right-full mr-4 bg-white text-gray-800 text-sm font-semibold px-3 py-1.5 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Message us to order!
        </span>
      </a>

      {/* Shelf Widget */}
      {shelf.length > 0 && (
        <div className="fixed bottom-6 left-6 z-50">
          {!isShelfOpen && (
            <button
              onClick={() => setIsShelfOpen(true)}
              className="bg-primary text-primary-foreground p-4 rounded-2xl shadow-2xl hover:scale-105 transition-all flex items-center gap-3 font-display font-bold"
            >
              <Library className="w-6 h-6" />
              My Shelf ({shelf.reduce((acc, item) => acc + item.quantity, 0)})
            </button>
          )}

          {isShelfOpen && (
            <div className="bg-card w-80 rounded-3xl shadow-2xl border border-border/50 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5">
              <div className="bg-primary/10 px-5 py-4 flex items-center justify-between">
                <h3 className="font-display font-bold text-primary flex items-center gap-2">
                  <Library className="w-5 h-5" /> My Book Shelf
                </h3>
                <button onClick={() => setIsShelfOpen(false)} className="text-primary/70 hover:text-primary p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 max-h-60 overflow-y-auto space-y-4">
                {shelf.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-center">
                    <img src={item.image} alt={item.title} className="w-12 h-12 rounded-lg object-cover bg-warm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-foreground truncate">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.price}</p>
                    </div>
                    <div className="flex items-center gap-2 bg-secondary/50 rounded-full px-2 py-1">
                      <button onClick={() => {
                        setShelf(prev => prev.map(p => p.title === item.title ? { ...p, quantity: Math.max(0, p.quantity - 1) } : p).filter(p => p.quantity > 0));
                        trackRemoveFromCart({ title: item.title, price: item.price, quantity: 1 });
                      }} className="text-muted-foreground hover:text-foreground">
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                      <button onClick={() => {
                        setShelf(prev => prev.map(p => p.title === item.title ? { ...p, quantity: p.quantity + 1 } : p));
                        trackAddToCart({ title: item.title, price: item.price, quantity: 1 });
                      }} className="text-muted-foreground hover:text-foreground">
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-4 bg-secondary/20 border-t border-border/30">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-semibold text-muted-foreground">Total</span>
                  <span className="font-display text-lg font-bold text-primary">
                    ₹{shelf.reduce((acc, item) => acc + parseInt(item.price.replace("₹", "")) * item.quantity, 0)}
                  </span>
                </div>
                <Button variant="hero" className="w-full" onClick={() => {
                  setIsShelfOpen(false);
                  setIsCheckoutOpen(true);
                  trackBeginCheckout(shelf);
                }}>
                  Place Order
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Order Modal */}
      {isCheckoutOpen && shelf.length > 0 && (
        <OrderModal
          shelf={shelf}
          onClose={() => setIsCheckoutOpen(false)}
        />
      )}

      {/* Bulk Order Modal */}
      {isBulkOrderOpen && (
        <BulkOrderModal
          onClose={() => setIsBulkOrderOpen(false)}
        />
      )}
    </div>
  );
}
