import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { planId, email } = req.body || {};
  if(!planId || !email) return res.status(400).json({ error: 'Missing planId or email' });

  const { data: plan } = await supabase.from('plans').select('*').eq('id', planId).single();
  if(!plan) return res.status(404).json({ error: 'Plan not found' });

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    payment_method_types: ['card'],
    customer_email: email,
    line_items: [{ price_data: { currency:'usd', product_data:{ name: plan.name }, unit_amount: Math.round(plan.price*100) }, quantity: 1 }],
    success_url: `${req.headers.origin}/login?paid=true`,
    cancel_url: `${req.headers.origin}/subscribe?canceled=true`,
    metadata: { email, planId }
  });

  return res.status(200).json({ url: session.url });
}
