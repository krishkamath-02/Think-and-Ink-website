import crypto from 'crypto';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      orderPayload,
      appsScriptUrl
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      let loggedToSheets = false;
      if (orderPayload) {
        try {
          const targetUrl = appsScriptUrl || "https://script.google.com/macros/s/AKfycbz-DcbofEE2r-a1ynAl5YRZ8c5aPUfLKA-67lbwnNcD7u8Ga9gjq47U3vc9f6ffuLmu/exec";
          await fetch(targetUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...orderPayload,
              paymentMethod: "Razorpay (Paid)",
              razorpayPaymentId: razorpay_payment_id
            }),
          });
          loggedToSheets = true;
        } catch (sheetErr) {
          console.error("Failed to log to Google Sheets server-side:", sheetErr);
        }
      }

      return res.status(200).json({ 
        message: 'Payment verified successfully', 
        success: true,
        loggedToSheets
      });
    } else {
      return res.status(400).json({ error: 'Invalid signature', success: false });
    }
  } catch (err) {
    console.error("Verify Payment Error:", err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}

