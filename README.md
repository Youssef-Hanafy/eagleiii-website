# Egypt Herbs B2B — Phase 2 Backend

This version turns the original design into a database-driven site with a real Supabase admin backend.

## Working features after Supabase setup
- Email/password admin login
- Protected admin dashboard
- Add/edit/delete products
- Main product photo upload
- Multiple gallery photo uploads
- Product specification PDF upload
- Product visibility + featured toggles
- Product detail pages
- Editable homepage/business/contact/social information
- Quote form saves buyer inquiries
- Inquiry dashboard with New / Contacted / Closed status
- Email-buyer shortcut
- Supabase Row Level Security
- Only explicitly authorized admin users can edit data

## 1. Install/run
```bash
npm install
npm run dev
```

## 2. Create Supabase project
Create a project in Supabase Dashboard.

## 3. Run database setup
Open Supabase > SQL Editor. Copy all of `supabase/schema.sql`, paste it, and click Run.

## 4. Create your dad's login
In Supabase Dashboard go to Authentication > Users and create a user with your dad's email/password.

Then run this in SQL Editor, changing the email:
```sql
insert into public.admin_users(user_id,email)
select id,email from auth.users where email='YOUR_DADS_EMAIL_HERE';
```

There is intentionally NO public sign-up page.

## 5. Add environment variables
In Supabase open your project's Connect panel and copy the Project URL and Publishable Key.

Create `.env.local` in the project root:
```env
NEXT_PUBLIC_SUPABASE_URL=YOUR_PROJECT_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```

Restart the dev server after creating `.env.local`:
```bash
npm run dev
```

## 6. Log in
Open:
`http://localhost:3000/admin/login`

Then manage everything from:
`http://localhost:3000/admin`

## Notes
- Product images are public because they must display on the public catalog.
- Only an authorized admin can upload/update/delete files.
- Product PDF specifications are currently public when linked from a product page. Do not upload confidential documents there.
- Regulatory claims should only be added when the supporting documentation is confirmed.

## Quote email notifications
The contact form always saves the inquiry to Supabase first. If Resend is configured, it also emails the address saved under Admin > Website Settings > Email.

Add these to `.env.local`:

```env
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL="Egypt Herbs <onboarding@resend.dev>"
```

For Resend's test sender (`onboarding@resend.dev`), the recipient generally needs to be the email address associated with your Resend account. For production delivery to arbitrary recipients, verify your own sending domain in Resend and change `RESEND_FROM_EMAIL` to an address on that domain.

The API key is server-only. Do not prefix it with `NEXT_PUBLIC_`.
