import { supabase } from '@/lib/supabaseClient';

export default async function handler(req, res){
  if(req.method !== 'POST') return res.status(405).end();
  const { email } = req.body || {};
  if(!email) return res.status(400).json({ error: 'Missing email' });

  const { data: user } = await supabase.from('users').select('*').eq('email', email).maybeSingle();
  if(!user) return res.status(403).json({ error: 'No account found. Please subscribe first.' });

  const { data: sub } = await supabase.from('subscriptions').select('*').eq('user_id', user.id).eq('status','active').maybeSingle();
  if(!sub) return res.status(403).json({ error: 'No active subscription. Please subscribe.' });

  res.setHeader('Set-Cookie', `wcw_email=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`);
  return res.status(200).json({ ok: true });
}
