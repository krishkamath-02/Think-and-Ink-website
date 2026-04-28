import { useState } from "react";
import { X, MessageCircle, Loader2, CheckCircle, MapPin, User, Phone, Hash, Package, Heart, Sparkles, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FEATURES } from "@/config/features";

// ─── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ───────────────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-DcbofEE2r-a1ynAl5YRZ8c5aPUfLKA-67lbwnNcD7u8Ga9gjq47U3vc9f6ffuLmu/exec";
const SECRET_WEB_KEY = "TNI-SEC-7822-XP91"; // MUST MATCH GOOGLE APPS SCRIPT
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
  const [upsells, setUpsells] = useState({
    sketchPens: false,
    siblingBundle: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpsellChange = (name: 'sketchPens' | 'siblingBundle') => {
    setUpsells(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const calculateTotal = () => {
    let total = parseInt(product.price.replace("₹", "")) * parseInt(form.quantity || "1");
    if (upsells.sketchPens) total += 99;
    if (upsells.siblingBundle) {
      total += 419; 
    }
    return total;
  };

  const handlePayment = (orderId: string) => {
    const total = calculateTotal();
    
    const options = {
      key: "rzp_test_YOUR_KEY", // User must replace this with their actual key
      amount: total * 100, 
      currency: "INR",
      name: "Think & Ink",
      description: `Payment for ${product.title}`,
      image: "/favicon.svg",
      handler: function (response: any) {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
          buildWhatsAppMessage(form, orderId) + `\n\n*Payment ID:* ${response.razorpay_payment_id}`
        )}`;
        setWhatsAppUrl(url);
        setStatus("success");
      },
      prefill: {
        name: `${form.firstName} ${form.lastName}`,
        contact: form.phone,
      },
      theme: {
        color: "#E28B84",
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const buildWhatsAppMessage = (f: FormData, orderId: string) => {
    const total = calculateTotal();
    let additions = "";
    if (upsells.sketchPens) additions += `+ Pastel Sketch Pens (₹99)\n`;
    if (upsells.siblingBundle) additions += `+ Sibling Bundle Upgrade (₹419)\n`;

    return `Hi Think & Ink! 👋 I'd like to confirm my order.\n\n` +
    `*━━━━━━━━━━━━━━━━━━━━━*\n` +
    `*🧾 ORDER SUMMARY*\n` +
    `*Order ID:* ${orderId}\n` +
    `*Product:* ${product.title}\n` +
    `*Quantity:* ${f.quantity} copy\n` +
    (additions ? `*Add-ons:*\n${additions}` : "") +
    `*Total Amount:* ₹${total}\n` +
    `*━━━━━━━━━━━━━━━━━━━━━*\n\n` +
    `*📍 SHIPPING DETAILS*\n` +
    `*Buyer's Name:* ${f.firstName} ${f.lastName}\n` +
    `*Child's Name:* ${f.childName}\n` +
    `*Phone:* ${f.phone}\n` +
    `*Address:* ${f.address}, ${f.city}, ${f.state} – ${f.pincode}\n\n` +
    `Please let me know the payment details (UPI/GPay) so I can complete my order. Thank you! 🌟`;
  };

  const handleSubmit = async (e: React.FormEvent, method: 'whatsapp' | 'razorpay') => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const orderId = 'TNI-' + Math.floor(100000 + Math.random() * 900000).toString();
    const total = calculateTotal();
    
    let additionsList = [];
    if (upsells.sketchPens) additionsList.push("Sketch Pens");
    if (upsells.siblingBundle) additionsList.push("Sibling Bundle");

    const payload = {
      authKey: SECRET_WEB_KEY,
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
      additions: additionsList.join(", "),
      total: `₹${total}`,
      paymentMethod: method,
    };

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (method === 'razorpay') {
        handlePayment(orderId);
        setStatus("idle");
      } else {
        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(form, orderId))}`;
        setWhatsAppUrl(url);
        setStatus("success");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or contact us directly on WhatsApp.");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="relative bg-card w-full max-w-lg rounded-3xl shadow-2xl border border-border/50 overflow-hidden max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-card z-10 flex items-center justify-between px-7 pt-7 pb-4 border-b border-border/40">
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Order</p>
            <h2 className="font-display text-xl font-bold text-foreground leading-tight">{product.title}</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Choose your checkout method below</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center text-center px-8 py-10">
            <div className="w-20 h-20 rounded-full bg-teal/10 flex items-center justify-center mb-6">
              <CheckCircle className="w-10 h-10 text-teal" />
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4 leading-tight">
              Order Registered! 🎉
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
              Click below to complete your payment on WhatsApp or share the confirmation.
            </p>
            <Button
              variant="hero"
              size="lg"
              className="w-full text-base mb-3"
              onClick={() => window.open(whatsAppUrl, "_blank")}
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Open WhatsApp
            </Button>
            <button onClick={onClose} className="text-sm text-muted-foreground">Close</button>
          </div>
        ) : (
          <form className="px-7 py-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
              <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            </div>
            <input name="childName" required value={form.childName} onChange={handleChange} placeholder="Child's Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <input name="phone" required value={form.phone} onChange={handleChange} placeholder="WhatsApp Number" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <input name="address" required value={form.address} onChange={handleChange} placeholder="Full Address" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <div className="grid grid-cols-3 gap-4">
              <input name="city" required value={form.city} onChange={handleChange} placeholder="City" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm col-span-1" />
              <input name="state" required value={form.state} onChange={handleChange} placeholder="State" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm col-span-1" />
              <input name="pincode" required value={form.pincode} onChange={handleChange} placeholder="Pincode" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm col-span-1" />
            </div>
            <select name="quantity" value={form.quantity} onChange={handleChange} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm">
              {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n} {n === 1 ? 'copy' : 'copies'}</option>)}
            </select>

            {/* Add-ons Section */}
            {FEATURES.SHOW_UPSELLS && (
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold text-primary flex items-center gap-2 uppercase tracking-widest"><Sparkles className="w-3 h-3" /> Add-ons</p>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={upsells.sketchPens} onChange={() => handleUpsellChange('sketchPens')} className="rounded text-primary" />
                  <span className="text-xs font-medium text-foreground">Pastel Sketch Pens (+ ₹99)</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={upsells.siblingBundle} onChange={() => handleUpsellChange('siblingBundle')} className="rounded text-primary" />
                  <span className="text-xs font-medium text-foreground">Sibling Bundle (+ ₹419)</span>
                </label>
              </div>
            )}

            <div className="flex items-center justify-between bg-secondary/40 rounded-2xl px-5 py-3">
              <span className="text-sm font-semibold">Total Amount</span>
              <span className="font-display text-xl font-bold text-primary">₹{calculateTotal()}</span>
            </div>

            <div className={`grid grid-cols-1 ${FEATURES.SHOW_RAZORPAY ? 'sm:grid-cols-2' : ''} gap-3 pt-2`}>
              {FEATURES.SHOW_RAZORPAY && (
                <Button type="button" variant="hero" disabled={status === "submitting"} onClick={(e) => handleSubmit(e, 'razorpay')} className="w-full">
                  <CreditCard className="w-4 h-4 mr-2" /> Pay Online
                </Button>
              )}
              <Button type="button" variant={FEATURES.SHOW_RAZORPAY ? "outline" : "hero"} disabled={status === "submitting"} onClick={(e) => handleSubmit(e, 'whatsapp')} className={`w-full ${FEATURES.SHOW_RAZORPAY ? 'border-primary/30 text-primary' : ''}`}>
                <MessageCircle className="w-4 h-4 mr-2" /> {FEATURES.SHOW_RAZORPAY ? 'Pay via WhatsApp' : 'Confirm on WhatsApp'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
