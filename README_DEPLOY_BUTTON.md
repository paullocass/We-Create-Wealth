# One-click Deploy (Vercel)

You can add a "Deploy to Vercel" button to your README to make a near one-click deploy:

```markdown
[![Deploy to Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/<YOUR-USERNAME>/<REPO>&env=NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE,SUPABASE_URL,STRIPE_SECRET_KEY,STRIPE_WEBHOOK_SECRET,ADMIN_KEY)
```

Replace `<YOUR-USERNAME>/<REPO>` with your GitHub repository path.
When clicked, Vercel's UI will prompt you to fill environment variables. Paste the corresponding keys from Supabase and Stripe.
