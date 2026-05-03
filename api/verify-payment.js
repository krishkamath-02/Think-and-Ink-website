import crypto from 'crypto';

export default function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const sign = razorpay_order_id + '|' + razorpay_payment_id;
    const expectedSign = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(sign.toString())
      .digest('hex');

    if (razorpay_signature === expectedSign) {
      return res.status(200).json({ message: 'Payment verified successfully', success: true });
    } else {
      return res.status(400).json({ error: 'Invalid signature', success: false });
    }
  } catch (err) {
    console.error("Verify Payment Error:", err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
