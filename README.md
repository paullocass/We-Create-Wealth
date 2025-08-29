# We Create Wealth

Next.js + Supabase + Stripe. Mandatory paid subscription to access tasks.

## Phone Launch (no laptop)
1. Create Stripe account (live). Copy keys.
2. Create Supabase project. Run `supabase/schema.sql` then `supabase/plans_seed.sql` in the SQL editor. Copy URL + anon key + service role key.
3. Upload this folder to GitHub from your phone.
4. Go to Vercel on your phone → Import your repo → set env vars:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_URL` (same as above)
   - `SUPABASE_SERVICE_ROLE`
   - `STRIPE_SECRET_KEY`
   - `STRIPE_WEBHOOK_SECRET`
5. In Stripe → Developers → Webhooks → Add endpoint: `https://YOUR-APP.vercel.app/api/webhook` → select event `checkout.session.completed` → copy signing secret into Vercel env (`STRIPE_WEBHOOK_SECRET`).
6. Hit Deploy. Visit `/subscribe` on your phone, enter your email, pick a plan, pay, then go to `/login` to access `/dashboard`.

## Notes
- The Service Role key is **server-only** (used in API/webhook). Never expose it client-side.
- This template uses **email-only login**. Replace with proper auth later if needed.
