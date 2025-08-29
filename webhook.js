import Stripe from 'stripe';
import { buffer } from 'micro';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export const config = { api: { bodyParser: false } };
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    const buf = await buffer(req);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (e) {
    console.error('Webhook signature verification failed', e.message);
    return res.status(400).send(`Webhook Error: ${e.message}`);
  }

  if(event.type === 'checkout.session.completed'){
    const session = event.data.object;
    const email = session.metadata?.email || session.customer_details?.email;
    const planId = session.metadata?.planId;

    if(email && planId){
      // upsert user by email
      const { data: userRow, error: userErr } = await supabaseAdmin
        .from('users')
        .upsert({ email }, { onConflict: 'email' })
        .select()
        .single();

      if(userErr){ console.error('User upsert error', userErr); }

      if(userRow){
        // insert active subscription
        const { error: subErr } = await supabaseAdmin
          .from('subscriptions')
          .insert({ user_id: userRow.id, plan_id: planId, status: 'active' });

        if(subErr) console.error('Subscription insert error', subErr);
      }
    }
  }

  return res.json({ received: true });
}
