import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { Shield } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Think & Ink" },
      { name: "description", content: "Learn how Think & Ink collects, uses, and protects your personal information." },
      { property: "og:title", content: "Privacy Policy — Think & Ink" },
    ],
  }),
  component: PrivacyPage,
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  // Split "1. Who Are We?" into num="1" and label="Who Are We?"
  const dotIndex = title.indexOf(". ");
  const num = dotIndex !== -1 ? title.slice(0, dotIndex) : "";
  const label = dotIndex !== -1 ? title.slice(dotIndex + 2) : title;

  return (
    <div className="mb-10 border-b border-border/30 pb-10 last:border-0 last:pb-0">
      {num && (
        <span className="text-xs font-bold text-primary uppercase tracking-widest mb-2 block">
          Section {num}
        </span>
      )}
      <h2 className="font-display text-2xl font-bold text-foreground mb-4">{label}</h2>
      <div className="space-y-3 text-sm text-muted-foreground leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
        {children}
      </div>
    </div>
  );
}

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero */}
      <section className="pt-32 pb-12 bg-warm">
        <Reveal className="mx-auto max-w-3xl px-6 text-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 mb-6">
            <Shield className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-secondary-foreground">Your Privacy Matters</span>
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            We take your privacy seriously. Here's exactly what we collect and how we use it.
          </p>
          <p className="mt-3 text-xs text-muted-foreground">Last updated: April 2026</p>
        </Reveal>
      </section>

      {/* Policy Content */}
      <section className="py-16">
        <Reveal className="mx-auto max-w-3xl px-6">

          <Section title="1. Who Are We?">
            <p>
              Think &amp; Ink ("we", "our", "us") is a small independent brand based in India that sells guided journals for children. We operate through our website at{" "}
              <span className="text-foreground font-medium">thinkandink.in</span> and process orders via WhatsApp.
            </p>
            <p>
              For any privacy-related concerns, you can reach us at{" "}
              <a href="https://wa.me/917822845048" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </a>{" "}
              or via our{" "}
              <a href="/contact" className="text-primary hover:underline">Contact page</a>.
            </p>
          </Section>

          <Section title="2. What Information Do We Collect?">
            <p>When you place an order through our website, we collect the following information:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-foreground font-medium">Full Name</span> — to address your order and delivery label</li>
              <li><span className="text-foreground font-medium">Phone / WhatsApp Number</span> — to confirm your order and share tracking details</li>
              <li><span className="text-foreground font-medium">Delivery Address</span> (street, city, state, pincode) — to ship your order</li>
              <li><span className="text-foreground font-medium">Product &amp; quantity selected</span> — to process your order correctly</li>
            </ul>
            <p>We do <span className="text-foreground font-medium">not</span> collect payment card details. All payments are made directly via UPI, Google Pay, PhonePe, or bank transfer — outside of our website.</p>
          </Section>

          <Section title="3. How Do We Use Your Information?">
            <p>We use your information solely for the following purposes:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>To process and fulfil your order</li>
              <li>To contact you on WhatsApp with your order confirmation and shipping details</li>
              <li>To handle exchange requests if needed</li>
            </ul>
            <p>We do <span className="text-foreground font-medium">not</span> use your information for marketing emails, automated messages, or profiling.</p>
          </Section>

          <Section title="4. How Do We Store Your Information?">
            <p>
              Order details are stored in a private Google Sheet accessible only to the Think &amp; Ink team. This sheet is hosted on Google's infrastructure and protected by Google account security.
            </p>
            <p>
              We retain order data for up to <span className="text-foreground font-medium">12 months</span> for order fulfilment and exchange purposes, after which it is deleted.
            </p>
          </Section>

          <Section title="5. Who Do We Share Your Information With?">
            <p>We do not sell, rent, or trade your personal data to any third parties.</p>
            <p>
              Your delivery address is shared only with our <span className="text-foreground font-medium">shipping courier partner</span> for the sole purpose of delivering your order. No other information is shared.
            </p>
          </Section>

          <Section title="6. Your Rights">
            <p>You have the right to:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><span className="text-foreground font-medium">Access</span> the personal data we hold about you</li>
              <li><span className="text-foreground font-medium">Request correction</span> of any inaccurate information</li>
              <li><span className="text-foreground font-medium">Request deletion</span> of your data at any time</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us on{" "}
              <a href="https://wa.me/917822845048" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                WhatsApp
              </a>{" "}
              or via the{" "}
              <a href="/contact" className="text-primary hover:underline">Contact page</a>. We will respond within 5 business days.
            </p>
          </Section>

          <Section title="7. Cookies">
            <p>
              Our website does not use tracking cookies or advertising cookies. We may use essential browser storage (such as session data) solely to make the website function correctly.
            </p>
          </Section>

          <Section title="8. Children's Privacy">
            <p>
              Think &amp; Ink sells products <em>for</em> children but our website is intended to be used by parents and guardians. We do not knowingly collect personal information directly from children under the age of 13.
            </p>
          </Section>

          <Section title="9. Changes to This Policy">
            <p>
              We may update this Privacy Policy from time to time. Any changes will be reflected on this page with an updated date. We encourage you to review it periodically.
            </p>
          </Section>

          <div className="mt-12 bg-secondary/50 rounded-2xl px-6 py-5">
            <p className="text-sm text-foreground font-semibold mb-1">Questions about this policy?</p>
            <p className="text-sm text-muted-foreground">
              Reach us on{" "}
              <a href="https://wa.me/917822845048" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline font-medium">
                WhatsApp
              </a>{" "}
              or through our{" "}
              <a href="/contact" className="text-primary hover:underline font-medium">Contact page</a>. We're happy to help.
            </p>
          </div>

        </Reveal>
      </section>

      <Footer />
    </div>
  );
}
