import { useState } from "react";
import { X, MessageCircle, Loader2, CheckCircle, MapPin, User, Phone, Hash, Package, Heart, Sparkles, CreditCard, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FEATURES } from "@/config/features";
import { Zap } from "lucide-react";

// ─── PASTE YOUR GOOGLE APPS SCRIPT WEB APP URL HERE ───────────────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz-DcbofEE2r-a1ynAl5YRZ8c5aPUfLKA-67lbwnNcD7u8Ga9gjq47U3vc9f6ffuLmu/exec";
const SECRET_WEB_KEY = "TNI-SEC-7822-XP91"; // MUST MATCH GOOGLE APPS SCRIPT
// ──────────────────────────────────────────────────────────────────────────────

const WHATSAPP_NUMBER = "917822845048";

interface OrderModalProps {
  shelf: { title: string; price: string; quantity: number }[];
  onClose: () => void;
}

interface FormData {
  firstName: string;
  lastName: string;
  childNames: string[];
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

const emptyForm: FormData = {
  firstName: "",
  lastName: "",
  childNames: [""],
  phone: "",
  address: "",
  city: "",
  state: "",
  pincode: "",
};

type Status = "idle" | "submitting" | "success" | "error";

export function OrderModal({ shelf, onClose }: OrderModalProps) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  const [deliveryType, setDeliveryType] = useState<"regular" | "quick">("regular");
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

  const handleChildNameChange = (index: number, value: string) => {
    const newChildNames = [...form.childNames];
    newChildNames[index] = value;
    setForm({ ...form, childNames: newChildNames });
  };

  const addChild = () => {
    setForm({ ...form, childNames: [...form.childNames, ""] });
  };

  const removeChild = (index: number) => {
    if (form.childNames.length === 1) return;
    const newChildNames = form.childNames.filter((_, i) => i !== index);
    setForm({ ...form, childNames: newChildNames });
  };

  const calculateTotal = () => {
    let total = shelf.reduce((acc, item) => acc + parseInt(item.price.replace("₹", "")) * item.quantity, 0);
    if (upsells.sketchPens) total += 99;
    if (upsells.siblingBundle) {
      total += 419;
    }
    if (deliveryType === "quick") {
      total += 99; // Optional: extra charge for same-day delivery
    }
    return total;
  };

  const isLocalPincode = form.pincode.length >= 3 && (form.pincode.startsWith("411") || form.pincode.startsWith("412"));
  const currentHour = new Date().getHours();
  const isBefore4PM = currentHour < 16;

  const handlePayment = async (orderId: string, payload: any) => {
    const total = calculateTotal();

    try {
      // 1. Create Order Backend Call
      const orderRes = await fetch('/api/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: total * 100, currency: "INR", receipt: orderId })
      });
      
      const orderData = await orderRes.json();
      
      if (!orderRes.ok) throw new Error(orderData.error || "Failed to create order");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: orderData.amount,
        currency: orderData.currency,
        order_id: orderData.order_id,
        name: "Think & Ink",
        description: `Payment for ${shelf.length} items`,
        image: "/favicon.svg",
        handler: async function (response: any) {
          try {
            // 2. Verify Payment Backend Call
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature
              })
            });
            
            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok && verifyData.success) {
              // 3. Log the successful order to Google Apps Script
              try {
                await fetch(APPS_SCRIPT_URL, {
                  method: "POST",
                  mode: "no-cors",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    ...payload,
                    paymentMethod: "Razorpay (Paid)",
                    razorpayPaymentId: response.razorpay_payment_id
                  }),
                });
              } catch (e) {
                console.error("Failed to log to Google Sheets", e);
              }

              const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                buildWhatsAppMessage(form, orderId) + `\n\n*Payment ID:* ${response.razorpay_payment_id}\n*Razorpay Order ID:* ${response.razorpay_order_id}`
              )}`;
              setWhatsAppUrl(url);
              setStatus("success");
            } else {
              setErrorMsg("Payment verification failed. Please contact support.");
              setStatus("error");
            }
          } catch (err) {
            setErrorMsg("Verification error. Please contact support.");
            setStatus("error");
          }
        },
        prefill: {
          name: `${form.firstName} ${form.lastName}`,
          email: "thinkandink10@gmail.com",
          contact: form.phone
        },
        theme: {
          color: "#E28E73",
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setErrorMsg("Payment failed: " + response.error.description);
        setStatus("error");
      });
      rzp.open();
    } catch (err: any) {
      setErrorMsg(err.message || "Could not initialize payment");
      setStatus("error");
    }
  };

  const buildWhatsAppMessage = (f: FormData, orderId: string) => {
    const total = calculateTotal();
    let additions = "";
    if (upsells.sketchPens) additions += `+ Pastel Sketch Pens (₹99)\n`;
    if (upsells.siblingBundle) additions += `+ Sibling Bundle Upgrade (₹419)\n`;

    const itemsList = shelf.map(item => `${item.title} (x${item.quantity})`).join('\n');

    let msg = `Hi Think & Ink! 👋 I'd like to confirm my order.\n\n`;
    if (deliveryType === "quick") {
      msg += `*I would like to opt for same day instant delivery*\n\n`;
    }

    msg += `*━━━━━━━━━━━━━━━━━━━━━*\n` +
      `*🧾 ORDER SUMMARY*\n` +
      `*Order ID:* ${orderId}\n` +
      `*Items:*\n${itemsList}\n` +
      (additions ? `*Add-ons:*\n${additions}` : "") +
      `*Delivery:* ${deliveryType === "quick" ? "Instant Delivery ⚡" : "Regular Delivery"}\n` +

      `*Total Amount:* ₹${total}\n` +
      `*━━━━━━━━━━━━━━━━━━━━━*\n\n` +
      `*📍 SHIPPING DETAILS*\n` +
      `*Buyer's Name:* ${f.firstName} ${f.lastName}\n` +
      `*Children's Names:* ${f.childNames.filter(n => n.trim()).join(", ")}\n` +
      `*Phone:* ${f.phone}\n` +
      `*Address:* ${f.address}, ${f.city}, ${f.state} – ${f.pincode}\n\n` +
      `Please let me know the payment details (UPI/GPay) so I can complete my order. Thank you! 🌟`;

    return msg;
  };

  const handleSubmit = async (e: React.FormEvent, method: 'whatsapp' | 'razorpay') => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const prefix = deliveryType === "quick" ? "TNI-INST-" : "TNI-REG-";
    const orderId = prefix + Math.floor(100000 + Math.random() * 900000).toString();
    const total = calculateTotal();

    let additionsList = [];
    if (upsells.sketchPens) additionsList.push("Sketch Pens");
    if (upsells.siblingBundle) additionsList.push("Sibling Bundle");

    const itemsListString = shelf.map(item => `${item.title} (x${item.quantity})`).join(', ');
    const totalQuantity = shelf.reduce((acc, item) => acc + item.quantity, 0);

    const payload = {
      authKey: SECRET_WEB_KEY,
      timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      orderId: orderId,
      name: `${form.firstName} ${form.lastName}`,
      childName: form.childNames.filter(n => n.trim()).join(", "),
      phone: form.phone,
      address: form.address,
      city: form.city,
      state: form.state,
      pincode: form.pincode,
      quantity: totalQuantity.toString(),
      product: itemsListString,
      price: `₹${Math.round(total / totalQuantity)}`,
      additions: additionsList.join(", "),
      deliveryType: deliveryType === "quick" ? "Same Day (Quick)" : "Regular",
      total: `₹${total}`,
      paymentMethod: method,
    };

    try {
      if (method === 'razorpay') {
        // Do not log to Google Sheets yet. Wait for successful payment.
        handlePayment(orderId, payload);
        setStatus("idle");
      } else {
        // WhatsApp flow: log to Google Sheets immediately
        await fetch(APPS_SCRIPT_URL, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

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
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Order Summary</p>
            <h2 className="font-display text-xl font-bold text-foreground leading-tight">{shelf.length} Items in Shelf</h2>
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
              {whatsAppUrl ? "Order Registered! 🎉" : "Payment Successful! 🎉"}
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
              {whatsAppUrl 
                ? "Click below to complete your payment on WhatsApp or share the confirmation."
                : "Your order has been placed successfully and sent to our shipping partner."}
            </p>
            {whatsAppUrl && (
              <Button
                variant="hero"
                size="lg"
                className="w-full text-base mb-3"
                onClick={() => window.open(whatsAppUrl, "_blank")}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Open WhatsApp
              </Button>
            )}
            <button onClick={onClose} className="text-sm text-muted-foreground">{whatsAppUrl ? "Close" : "Return to Shop"}</button>
          </div>
        ) : (
          <form className="px-7 py-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <input name="firstName" required value={form.firstName} onChange={handleChange} placeholder="First Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
              <input name="lastName" required value={form.lastName} onChange={handleChange} placeholder="Last Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-foreground">Children's Names</label>
              </div>
              {form.childNames.map((name, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    required
                    value={name}
                    onChange={(e) => handleChildNameChange(index, e.target.value)}
                    placeholder={`Child ${index + 1} Name`}
                    className="flex-1 rounded-xl border border-input bg-background px-4 py-3 text-sm"
                  />
                  {form.childNames.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChild(index)}
                      className="p-3 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={addChild}
                className="text-xs font-semibold text-primary flex items-center gap-1 hover:underline"
              >
                <Plus className="w-3 h-3" /> Add another child
              </button>
            </div>

            <input name="phone" required value={form.phone} onChange={handleChange} placeholder="WhatsApp Number" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <input name="address" required value={form.address} onChange={handleChange} placeholder="Full Address" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
            <div className="grid grid-cols-3 gap-4">
              <input name="city" required value={form.city} onChange={handleChange} placeholder="City" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm col-span-1" />
              <input name="state" required value={form.state} onChange={handleChange} placeholder="State" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm col-span-1" />
              <input name="pincode" required value={form.pincode} onChange={handleChange} placeholder="Pincode" maxLength={6} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm col-span-1" />
            </div>

            {/* Delivery Type Selection (Shows only for local Pune pincodes) */}
            {isLocalPincode && (
              <div className="bg-teal/5 border border-teal/20 rounded-2xl p-4 space-y-3">
                <p className="text-xs font-bold text-teal flex items-center gap-2 uppercase tracking-widest"><Zap className="w-3 h-3" /> Delivery Speed</p>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === "regular"}
                      onChange={() => setDeliveryType("regular")}
                      className="text-teal focus:ring-teal"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">Regular Delivery (Free)</span>
                      <span className="text-xs text-muted-foreground">3-5 Business Days</span>
                    </div>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="radio"
                      name="deliveryType"
                      checked={deliveryType === "quick"}
                      onChange={() => setDeliveryType("quick")}
                      className="text-teal focus:ring-teal"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {isBefore4PM ? "Same Day Delivery" : "Next Day Delivery"} (+₹99)
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {isBefore4PM ? "Delivered today via local courier" : "Delivered tomorrow via local courier as cut-off is 5 PM!"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {"Only for Pune Pincodes and after payment confirmation!"}
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            )}

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
