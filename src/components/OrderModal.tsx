import { useState } from "react";
import { X, MessageCircle, Loader2, CheckCircle, MapPin, User, Phone, Hash, Package, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ───────────────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-DcbofEE2r-a1ynAl5YRZ8c5aPUfLKA-67lbwnNcD7u8Ga9gjq47U3vc9f6ffuLmu/exec";
// ──────────────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "917822845048";

interface OrderModalProps {
  product: { title: string; price: string };
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  childName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  quantity: string;
}

const emptyForm: FormData = {
  firstName: "",
  lastName: "",
  childName: "",
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
  quantity: "1",
};

type Status = "idle" | "submitting" | "success" | "error";

export function OrderModal({ product, onClose }: OrderModalProps) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const buildWhatsAppMessage = (f: FormData, orderId: string) =>
    `Hi Think & Ink! 👋 I'd like to confirm my order.\n\n` +
    `*━━━━━━━━━━━━━━━━━━━━━*\n` +
    `*🧾 ORDER SUMMARY*\n` +
    `*Order ID:* ${orderId}\n` +
    `*Product:* ${product.title}\n` +
    `*Quantity:* ${f.quantity} copy\n` +
    `*Total Amount:* ₹${parseInt(product.price.replace("₹", "")) * parseInt(f.quantity)}\n` +
    `*━━━━━━━━━━━━━━━━━━━━━*\n\n` +
    `*📍 SHIPPING DETAILS*\n` +
    `*Buyer's Name:* ${f.firstName} ${f.lastName}\n` +
    `*Child's Name:* ${f.childName}\n` +
    `*Phone:* ${f.phone}\n` +
    `*Address:* ${f.address}, ${f.city}, ${f.state} – ${f.pincode}\n\n` +
    `Please let me know the payment details (UPI/GPay) so I can complete my order. Thank you! 🌟`;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const orderId = 'TNI-' + Math.floor(100000 + Math.random() * 900000).toString();

    const payload = {
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      orderId: orderId,
      name: `${form.firstName} ${form.lastName}`,
      childName: form.childName,
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      quantity: form.quantity,
      product: product.title,
      price: product.price,
      total: `₹${parseInt(product.price.replace("₹", "")) * parseInt(form.quantity)}`,
    };

    try {
      // Send to Google Sheets — no-cors because Apps Script returns a redirect
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      // Build and store the WhatsApp URL so the success screen can use it
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(form, orderId))}`;
      setWhatsAppUrl(url);
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or contact us directly on WhatsApp.");
    }
  };

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-card w-full max-w-lg rounded-3xl shadow-2xl border border-border/50 overflow-hidden max-h-[90vh] overflow-y-auto">

        {/* Header */}
        <div className="sticky top-0 bg-card z-10 flex items-center justify-between px-7 pt-7 pb-4 border-b border-border/40">
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Order</p>
            <h2 className="font-display text-xl font-bold text-foreground leading-tight">{product.title}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Fill in your details to complete via WhatsApp</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Success state */}
        {status === "success" ? (
          <div className="flex flex-col items-center text-center px-8 py-10">
            {/* Icon */}
            <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-teal" />
            </div>

            {/* Heading */}
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
              Thank you for your support! 🎉
            </h3>

            {/* Message */}
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-2">
              Thanks for showing your support by placing the order.
            </p>
            <p className="text-foreground font-medium leading-relaxed max-w-sm mb-8">
              We will ship the product as soon as the payment is confirmed.
            </p>

            {/* Payment info box */}
            <div className="w-full bg-amber/10 border border-amber/30 rounded-2xl px-5 py-4 mb-8 text-left">
              <p className="text-sm font-semibold text-foreground mb-1">💳 Next step: Confirm Payment</p>
              <p className="text-sm text-muted-foreground">
                Click below to open WhatsApp and share your payment confirmation with us. Your order will be dispatched right after!
              </p>
            </div>

            {/* CTA */}
            <Button
              variant="hero"
              size="lg"
              className="w-full text-base mb-3"
              onClick={() => window.open(whatsAppUrl, "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Confirm Payment on WhatsApp
            </Button>

            <button
              onClick={onClose}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              I'll do this later
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
                  <User className="w-3.5 h-3.5 text-primary" /> First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="Priya"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
                  <User className="w-3.5 h-3.5 text-primary" /> Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Sharma"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            {/* Child Name */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
                <Heart className="w-3.5 h-3.5 text-primary" /> Child's Name
              </label>
              <input
                type="text"
                name="childName"
                required
                value={form.childName}
                onChange={handleChange}
                placeholder="e.g. Rohan"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
                <Phone className="w-3.5 h-3.5 text-primary" /> WhatsApp / Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                required
                value={form.phone}
                onChange={handleChange}
                placeholder="e.g. 9876543210"
                pattern="[0-9]{10}"
                maxLength={10}
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* Address */}
            <div>
              <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
                <MapPin className="w-3.5 h-3.5 text-primary" /> Delivery Address
              </label>
              <input
                type="text"
                name="address"
                required
                value={form.address}
                onChange={handleChange}
                placeholder="House / Flat, Street, Area"
                className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
              />
            </div>

            {/* City + State */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">City</label>
                <input
                  type="text"
                  name="city"
                  required
                  value={form.city}
                  onChange={handleChange}
                  placeholder="e.g. Mumbai"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">State</label>
                <input
                  type="text"
                  name="state"
                  required
                  value={form.state}
                  onChange={handleChange}
                  placeholder="e.g. Maharashtra"
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
            </div>

            {/* Pincode + Quantity */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
                  <Hash className="w-3.5 h-3.5 text-primary" /> Pincode
                </label>
                <input
                  type="text"
                  name="pincode"
                  required
                  value={form.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 400001"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                />
              </div>
              <div>
                <label className="flex items-center gap-1.5 text-sm font-semibold text-foreground mb-2">
                  <Package className="w-3.5 h-3.5 text-primary" /> Quantity
                </label>
                <select
                  name="quantity"
                  value={form.quantity}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} {n === 1 ? "copy" : "copies"}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between bg-secondary/60 rounded-2xl px-5 py-3">
              <span className="text-sm font-semibold text-secondary-foreground">Total Amount</span>
              <span className="font-display text-xl font-bold text-primary">
                ₹{parseInt(product.price.replace("₹", "")) * parseInt(form.quantity || "1")}
              </span>
            </div>

            {errorMsg && (
              <p className="text-sm text-destructive bg-destructive/10 rounded-xl px-4 py-3">{errorMsg}</p>
            )}

            {/* Submit */}
            <Button
              type="submit"
              variant="hero"
              size="lg"
              disabled={status === "submitting"}
              className="w-full text-base"
            >
              {status === "submitting" ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Saving your order…
                </>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Confirm &amp; Open WhatsApp
                </>
              )}
            </Button>

            <p className="text-xs text-center text-muted-foreground pb-1">
              Your details are only used to process this order.{" "}
              <a href="/privacy" className="underline hover:text-foreground transition-colors">Privacy Policy</a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
