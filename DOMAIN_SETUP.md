# Quick Domain Setup (for phone)

1. Buy a domain from Namecheap / Google Domains on your phone.
2. In Vercel dashboard -> Domains -> Add Domain -> enter your domain.
3. Vercel shows DNS records (CNAME or A). In your domain registrar's DNS settings add the records exactly.
4. Wait for propagation (usually minutes to an hour). Vercel will show when it's verified.
5. Add your domain as the PRIMARY domain in Vercel for the project.
6. Ensure your webhook in Stripe uses the primary domain: https://YOUR_DOMAIN/api/webhook
