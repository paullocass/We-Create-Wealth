# Phone Launch Checklist — We Create Wealth

1. Upload this repo to GitHub (use GitHub website or app). Create a new repo and drag-and-drop the zip contents.
2. In Supabase:
   - Create a new project.
   - Go to SQL Editor -> run `supabase/schema.sql` then `supabase/plans_seed.sql`.
   - Copy the Project URL and Anon Key. In Settings -> API get the Service Role key.
3. In Stripe:
   - Create account (if not already).
   - Go to Developers -> API keys -> copy Secret key (live).
   - Go to Developers -> Webhooks -> Add endpoint -> URL: https://YOUR-VERCEL-URL/api/webhook -> select event `checkout.session.completed`. Copy the signing secret.
4. In Vercel:
   - Import GitHub repo -> set Environment Variables:
     NEXT_PUBLIC_SUPABASE_URL
     NEXT_PUBLIC_SUPABASE_ANON_KEY
     SUPABASE_URL
     SUPABASE_SERVICE_ROLE
     STRIPE_SECRET_KEY
     STRIPE_WEBHOOK_SECRET
     ADMIN_KEY (pick a secret string for admin page)
   - Deploy.
5. After deploy:
   - Visit https://YOUR-VERCEL-URL/subscribe, enter your email, pick a plan, and complete checkout.
   - After payment, Stripe will call /api/webhook which will activate the subscription.
   - Visit /login to sign in with the email you used at checkout and access /dashboard.
6. To view subscriptions as admin: https://YOUR-VERCEL-URL/admin?key=YOUR_ADMIN_KEY
