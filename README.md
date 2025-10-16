# SoulSync Landing (Static, Vercel-ready)

An emotional, Calm-style landing page for SoulSync.

## Files
- `index.html` — Hero with gradient lavender→aqua, bullets and CTA.
- `waitlist.html` — Simple waitlist form. Replace the placeholder JS with your email endpoint.
- `vercel.json` — Optional static config (clean URLs).

## One‑click deploy to Vercel
1) Create a new empty GitHub repo (e.g., `soulsync-landing`).
2) Upload these three files (index.html, waitlist.html, vercel.json).
3) Go to https://vercel.com/import and pick your repo.
4) Framework preset: **Other** (static).
5) Deploy. Your site will appear at `https://<project>.vercel.app`.

### Without GitHub
- On Vercel dashboard → **New Project** → **Import** → **Add files** → drag & drop this folder/zip.

## Hooking up the Waitlist
Replace the placeholder JS in `waitlist.html` with your provider:
- **Google Sheets via Apps Script** (free)
- **MailerLite** (free tier) — create a group and use their API endpoint
- **ConvertKit/Mailchimp** — forms or API keys

### Example (MailerLite)
```html
<script>
async function subscribe(email){
  await fetch('https://connect.mailerlite.com/api/subscribers', {
    method:'POST',
    headers:{
      'Content-Type':'application/json',
      'Authorization':'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({ email, groups: ['YOUR_GROUP_ID'] })
  });
}
</script>
```

## Custom Domain
After deploy, on Vercel → Project → **Domains** → add `soulsync.vercel.app` or your custom domain.

## Branding
Colors:
- Primary: #B388EB
- Secondary: #EBD4FF
- Accent: #90E0EF
- Neutral Light: #FAFAFA
- Neutral Dark: #2D2E3A
- Complementary: #F9A8A8
