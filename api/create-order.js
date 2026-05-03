import Razorpay from 'razorpay';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { amount, currency, receipt } = req.body;

    if (!amount || amount < 100) {
      return res.status(400).json({ error: 'Invalid amount. Minimum 100 paise required.' });
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: amount.toString(),
      currency: currency || "INR",
      receipt: receipt || "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    
    if (!order) {
      return res.status(500).json({ error: 'Failed to create order with Razorpay' });
    }

    return res.status(200).json({
      order_id: order.id,
      amount: order.amount,
      currency: order.currency
    });
  } catch (err) {
    console.error("Create Order Error:", err);
    const errorMsg = err.error?.description || err.message || 'Internal Server Error';
    return res.status(500).json({ error: errorMsg });
  }
}
