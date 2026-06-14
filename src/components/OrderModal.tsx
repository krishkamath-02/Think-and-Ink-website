import { useState, useMemo, useEffect, useRef } from "react";
import { X, MessageCircle, Loader2, CheckCircle, MapPin, User, Phone, Hash, Package, Heart, Sparkles, CreditCard, Plus, Trash2, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FEATURES } from "@/config/features";
import { Zap } from "lucide-react";
import { 
  trackBeginCheckout, 
  trackAddShippingInfo, 
  trackAddPaymentInfo, 
  trackPurchase, 
  trackCheckoutCancellation 
} from "@/lib/analytics";

// ─── BUNDLE DISCOUNT CONSTANTS ─────────────────────────────────────────────────
const BUNDLE_DISCOUNT_TWO = 0.10; // 10% off when buying any 2 different books
const BUNDLE_DISCOUNT_THREE = 0.15; // 15% off when buying all 3 different books
// ──────────────────────────────────────────────────────────────────────────────

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
  const [submitMethod, setSubmitMethod] = useState<'whatsapp' | 'razorpay' | null>(null);
  const [completedMethod, setCompletedMethod] = useState<'whatsapp' | 'razorpay' | null>(null);

  // ─── ANALYTICS CANCELLATION TRACKING ────────────────────────────────────────
  const cancellationTrackedRef = useRef(false);
  const isCompletedRef = useRef(false);

  const trackCancellationOnce = (step: "form_closed" | "payment_failed_or_dismissed" | "unmounted_incomplete", reason: string) => {
    if (!cancellationTrackedRef.current && !isCompletedRef.current) {
      trackCheckoutCancellation(step, shelf, reason);
      cancellationTrackedRef.current = true;
    }
  };

  const handleClose = (reason: string = "user_clicked_close") => {
    if (status !== "success") {
      trackCancellationOnce("form_closed", reason);
    }
    onClose();
  };

  // Track begin checkout on mount
  useEffect(() => {
    trackBeginCheckout(shelf);
    return () => {
      // Trigger cancellation tracking if modal unmounts without successful checkout
      if (!isCompletedRef.current) {
        trackCancellationOnce("unmounted_incomplete", "modal_unmounted");
      }
    };
  }, []);

  // Update success flag when status changes to 'success'
  useEffect(() => {
    if (status === "success") {
      isCompletedRef.current = true;
    }
  }, [status]);

  // ─── BUNDLE DISCOUNT LOGIC ──────────────────────────────────────────────────
  const uniqueTitles = useMemo(() => new Set(shelf.map(item => item.title)).size, [shelf]);

  const bundleInfo = useMemo(() => {
    if (!FEATURES.ENABLE_BUNDLE_DISCOUNT) {
      return { discount: 0, label: "", description: "" };
    }
    if (uniqueTitles >= 3) {
      return { discount: BUNDLE_DISCOUNT_THREE, label: "15% Bundle Discount", description: "3 different books in your shelf — maximum bundle applied!" };
    } else if (uniqueTitles === 2) {
      return { discount: BUNDLE_DISCOUNT_TWO, label: "10% Bundle Discount", description: "2 different books in your shelf — bundle discount applied!" };
    }
    return { discount: 0, label: "", description: "" };
  }, [uniqueTitles]);

  // Upsell suggestion when user could unlock a bigger discount
  const bundleSuggestion = useMemo(() => {
    if (!FEATURES.ENABLE_BUNDLE_DISCOUNT) return null;
    if (uniqueTitles >= 3) return null; // Already at max discount
    if (uniqueTitles === 2) {
      return "Add a third book to unlock 15% off the entire order!";
    }
    if (uniqueTitles === 1) {
      return "Add another book to get 10% off, or add two more for 15% off!";
    }
    return null;
  }, [uniqueTitles]);

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

  const calculateSubtotal = () => {
    return shelf.reduce((acc, item) => acc + parseInt(item.price.replace("₹", "")) * item.quantity, 0);
  };

  const calculateTotal = () => {
    let subtotal = calculateSubtotal();
    // Apply bundle discount on the subtotal
    const discountAmount = Math.round(subtotal * bundleInfo.discount);
    let total = subtotal - discountAmount;
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
            // 2. Verify Payment Backend Call & Log to Google Sheets server-side
            const verifyRes = await fetch('/api/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
                orderPayload: payload,
                appsScriptUrl: APPS_SCRIPT_URL
              })
            });
            
            const verifyData = await verifyRes.json();
            
            if (verifyRes.ok && verifyData.success) {
              trackPurchase(orderId, total, "Razorpay", shelf);

              const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
                buildWhatsAppMessage(form, orderId) + `\n\n*Payment ID:* ${response.razorpay_payment_id}\n*Razorpay Order ID:* ${response.razorpay_order_id}`
              )}`;
              setCompletedMethod('razorpay');
              setWhatsAppUrl(url);
              setStatus("success");
              
              // Automatically redirect to WhatsApp
              try {
                window.location.href = url;
              } catch (e) {
                console.error("Failed to redirect automatically:", e);
              }
            } else {
              setErrorMsg("Payment verification failed. Please contact support.");
              setStatus("error");
              trackCancellationOnce("payment_failed_or_dismissed", "payment_verification_failed");
            }
          } catch (err) {
            setErrorMsg("Verification error. Please contact support.");
            setStatus("error");
            trackCancellationOnce("payment_failed_or_dismissed", "payment_verification_exception");
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
        modal: {
          ondismiss: function () {
            trackCancellationOnce("payment_failed_or_dismissed", "razorpay_modal_dismissed");
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (response: any) {
        setErrorMsg("Payment failed: " + response.error.description);
        setStatus("error");
        trackCancellationOnce("payment_failed_or_dismissed", response.error.description || "razorpay_payment_failed");
      });
      rzp.open();
    } catch (err: any) {
      setErrorMsg(err.message || "Could not initialize payment");
      setStatus("error");
      trackCancellationOnce("payment_failed_or_dismissed", err.message || "razorpay_initiation_failed");
    }
  };

  const buildWhatsAppMessage = (f: FormData, orderId: string) => {
    const total = calculateTotal();
    const subtotal = calculateSubtotal();
    const discountAmount = Math.round(subtotal * bundleInfo.discount);
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
      (bundleInfo.discount > 0 ? `*🎁 Bundle Discount:* -₹${discountAmount} (${Math.round(bundleInfo.discount * 100)}% off)\n` : "") +
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
    if (bundleInfo.discount > 0) additionsList.push(`Bundle ${Math.round(bundleInfo.discount * 100)}% Off`);

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

    // Track shipping and payment method selection
    trackAddShippingInfo(deliveryType === "quick" ? "Same Day (Quick)" : "Regular", shelf);
    trackAddPaymentInfo(method === 'razorpay' ? "Razorpay" : "WhatsApp", shelf);

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

        // Track purchase success for WhatsApp
        trackPurchase(orderId, total, "WhatsApp", shelf);

        const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildWhatsAppMessage(form, orderId))}`;
        setCompletedMethod('whatsapp');
        setWhatsAppUrl(url);
        setStatus("success");

        // Automatically redirect to WhatsApp
        window.location.href = url;
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or contact us directly on WhatsApp.");
      trackCancellationOnce("payment_failed_or_dismissed", "whatsapp_api_error");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/40 backdrop-blur-sm"
      onClick={(e) => e.target === e.currentTarget && handleClose("overlay_click")}
    >
      <div className="relative bg-card w-full max-w-lg rounded-3xl shadow-2xl border border-border/50 overflow-hidden max-h-[90vh] overflow-y-auto">

        <div className="sticky top-0 bg-card z-10 flex items-center justify-between px-7 pt-7 pb-4 border-b border-border/40">
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1">Order Summary</p>
            <h2 className="font-display text-xl font-bold text-foreground leading-tight">{shelf.length} Items in Shelf</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Choose your checkout method below</p>
          </div>
          <button
            onClick={() => handleClose("close_button_click")}
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
              {completedMethod === "razorpay" ? "Payment Successful! 🎉" : "Order Registered! 🎉"}
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
              {completedMethod === "razorpay"
                ? "Your payment was verified. Click below to share your order details on WhatsApp so we can process it immediately."
                : "Click below to complete your payment on WhatsApp or share the confirmation."}
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
          <form 
            onSubmit={(e) => {
              if (submitMethod) {
                handleSubmit(e, submitMethod);
              }
            }} 
            className="px-7 py-6 space-y-5"
          >
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

            {/* ─── BUNDLE DISCOUNT BANNER ─── */}
            {bundleInfo.discount > 0 && (
              <div className="bg-teal/5 border border-teal/20 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-bold text-teal flex items-center gap-2 uppercase tracking-widest">
                  <Gift className="w-3.5 h-3.5" /> {bundleInfo.label}
                </p>
                <p className="text-sm text-foreground font-medium">{bundleInfo.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-muted-foreground line-through">₹{calculateSubtotal()}</span>
                  <span className="text-sm font-bold text-teal">You save ₹{Math.round(calculateSubtotal() * bundleInfo.discount)}</span>
                </div>
              </div>
            )}

            {/* ─── BUNDLE SUGGESTION (upsell nudge) ─── */}
            {bundleSuggestion && bundleInfo.discount < BUNDLE_DISCOUNT_THREE && (
              <div className="bg-amber/5 border border-amber/20 rounded-2xl px-4 py-3 flex items-start gap-3">
                <Gift className="w-4 h-4 text-amber shrink-0 mt-0.5" />
                <p className="text-xs text-foreground leading-relaxed">
                  <span className="font-bold">Bundle & Save!</span> {bundleSuggestion}
                </p>
              </div>
            )}

            <div className="flex items-center justify-between bg-secondary/40 rounded-2xl px-5 py-3">
              <span className="text-sm font-semibold">Total Amount</span>
              <span className="font-display text-xl font-bold text-primary">₹{calculateTotal()}</span>
            </div>

            <div className={`grid grid-cols-1 ${FEATURES.SHOW_RAZORPAY ? 'sm:grid-cols-2' : ''} gap-3 pt-2`}>
              {FEATURES.SHOW_RAZORPAY && (
                <Button 
                  type="submit" 
                  variant="hero" 
                  disabled={status === "submitting"} 
                  onClick={() => setSubmitMethod('razorpay')} 
                  className="w-full"
                >
                  <CreditCard className="w-4 h-4 mr-2" /> Pay Online
                </Button>
              )}
              <Button 
                type="submit" 
                variant={FEATURES.SHOW_RAZORPAY ? "outline" : "hero"} 
                disabled={status === "submitting"} 
                onClick={() => setSubmitMethod('whatsapp')} 
                className={`w-full ${FEATURES.SHOW_RAZORPAY ? 'border-primary/30 text-primary' : ''}`}
              >
                <MessageCircle className="w-4 h-4 mr-2" /> {FEATURES.SHOW_RAZORPAY ? 'Pay via WhatsApp' : 'Confirm on WhatsApp'}
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
