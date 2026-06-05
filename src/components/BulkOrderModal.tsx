import { useState } from "react";
import { X, MessageCircle, PackageOpen } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_NUMBER = "917822845048";

interface BulkOrderModalProps {
  onClose: () => void;
}

interface BulkFormData {
  totalBooks: string;
  girlEditionCount: string;
  boyEditionCount: string;
  occasion: string;
  otherOccasion: string;
  name: string;
  phone: string;
  isCustomizationRequired: boolean;
  customizationDetails: string;
}

const emptyForm: BulkFormData = {
  totalBooks: "10",
  girlEditionCount: "",
  boyEditionCount: "",
  occasion: "Return Gift",
  otherOccasion: "",
  name: "",
  phone: "",
  isCustomizationRequired: false,
  customizationDetails: "",
};

export function BulkOrderModal({ onClose }: BulkOrderModalProps) {
  const [form, setForm] = useState<BulkFormData>(emptyForm);
  const [whatsAppUrl, setWhatsAppUrl] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const boyCount = parseInt(form.boyEditionCount) || 0;
    const girlCount = parseInt(form.girlEditionCount) || 0;
    const totalCount = boyCount + girlCount;

    if (totalCount < 10) {
      setErrorMsg("The total number of Boy and Girl edition books combined must be at least 10.");
      return;
    }
    setErrorMsg("");

    const occasionText = form.occasion === "Other" && form.otherOccasion 
      ? form.otherOccasion 
      : form.occasion;

    const msg = `Hi Think & Ink! 👋 I am looking to place a *Bulk Order*.\n\n` +
      `*📦 BULK ORDER DETAILS*\n` +
      `*Total Books Required:* ${form.totalBooks}\n` +
      `*Boy Edition:* ${form.boyEditionCount || '0'}\n` +
      `*Girl Edition:* ${form.girlEditionCount || '0'}\n` +
      `*Occasion:* ${occasionText}\n` +
      `*Customization Required:* ${form.isCustomizationRequired ? 'Yes' : 'No'}\n` +
      (form.isCustomizationRequired && form.customizationDetails ? `*Customization Details:* ${form.customizationDetails}\n` : "") +
      `\n*👤 CONTACT INFO*\n` +
      `*Name:* ${form.name}\n` +
      `*Phone:* ${form.phone}\n\n` +
      `Please let me know the bulk pricing and availability. Thank you!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
    setWhatsAppUrl(url);
    
    // Automatically redirect to WhatsApp
    window.location.href = url;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-card w-full max-w-xl rounded-[2rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 rounded-full hover:bg-secondary/50 transition-colors z-10"
        >
          <X className="w-5 h-5 text-muted-foreground" />
        </button>

        <div className="sticky top-0 bg-card z-10 flex items-center justify-between px-7 pt-7 pb-4 border-b border-border/40">
          <div>
            <p className="text-xs text-primary font-semibold uppercase tracking-widest mb-1 flex items-center gap-1.5">
              <PackageOpen className="w-4 h-4" /> Bulk Inquiry
            </p>
            <h2 className="font-display text-xl font-bold text-foreground leading-tight">Request Bulk Pricing</h2>
            <p className="text-sm text-muted-foreground mt-0.5">Minimum order quantity is 10 books</p>
          </div>
        </div>

        {whatsAppUrl ? (
          <div className="px-7 py-10 text-center flex flex-col items-center">
            <h3 className="font-display text-2xl font-bold text-foreground mb-4 leading-tight">
              Details Captured! 🎉
            </h3>
            <p className="text-muted-foreground leading-relaxed max-w-sm mb-8">
              Click below to send your bulk inquiry to our team on WhatsApp.
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
          <form onSubmit={handleSubmit} className="px-7 py-6 space-y-5">
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Contact Name</label>
                <input name="name" required value={form.name} onChange={handleChange} placeholder="Your Name" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
              </div>
              <div>
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Contact Number</label>
                <input name="phone" required value={form.phone} onChange={handleChange} placeholder="WhatsApp Number" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
              </div>

              <div className="pt-2">
                <label className="text-sm font-semibold text-foreground mb-1.5 block">Total Books Required (Min 10)</label>
                <input type="number" min="10" name="totalBooks" required value={form.totalBooks} onChange={handleChange} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Boy Edition Qty</label>
                  <input type="number" min="0" name="boyEditionCount" value={form.boyEditionCount} onChange={handleChange} placeholder="0" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Girl Edition Qty</label>
                  <input type="number" min="0" name="girlEditionCount" value={form.girlEditionCount} onChange={handleChange} placeholder="0" className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
                </div>
              </div>

              <div className="pt-2">
                <label className="text-sm font-semibold text-foreground mb-1.5 block">What occasion are you planning for?</label>
                <select name="occasion" required value={form.occasion} onChange={handleChange} className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm">
                  <option value="Return Gift">Return Gift</option>
                  <option value="School Reasons">School / Educational Events</option>
                  <option value="Workshops">Workshops</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {form.occasion === "Other" && (
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Please specify occasion</label>
                  <input name="otherOccasion" required value={form.otherOccasion} onChange={handleChange} placeholder="Specify here..." className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm" />
                </div>
              )}

              <div className="pt-2">
                <label className="text-sm font-semibold text-foreground mb-2 block">Is customization required?</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="isCustomizationRequired" 
                      checked={form.isCustomizationRequired === true} 
                      onChange={() => setForm(prev => ({ ...prev, isCustomizationRequired: true }))}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">Yes</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="isCustomizationRequired" 
                      checked={form.isCustomizationRequired === false} 
                      onChange={() => setForm(prev => ({ ...prev, isCustomizationRequired: false, customizationDetails: "" }))}
                      className="text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-foreground">No</span>
                  </label>
                </div>
              </div>

              {form.isCustomizationRequired && (
                <div>
                  <label className="text-sm font-semibold text-foreground mb-1.5 block">Please mention the customization in detail</label>
                  <textarea 
                    name="customizationDetails" 
                    required 
                    value={form.customizationDetails} 
                    onChange={(e) => setForm(prev => ({ ...prev, customizationDetails: e.target.value }))} 
                    placeholder="e.g. Please print 'Happy Birthday Rohan' on the cover..." 
                    className="w-full rounded-xl border border-input bg-background px-4 py-3 text-sm min-h-[80px] resize-y" 
                  />
                </div>
              )}
            </div>

            {errorMsg && (
              <div className="bg-destructive/10 border border-destructive/20 text-destructive text-sm font-semibold p-3 rounded-xl mt-4">
                {errorMsg}
              </div>
            )}

            <div className="pt-4 pb-2">
              <Button type="submit" variant="hero" className="w-full text-base">
                <MessageCircle className="w-4 h-4 mr-2" /> Send Inquiry via WhatsApp
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
