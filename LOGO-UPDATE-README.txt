Eagle III business logo update

This patch adds:
- Logo upload/replacement in /admin/settings
- Supabase Storage bucket for logo assets
- Logo on public header and footer
- Default E mark remains when no logo is uploaded

IMPORTANT:
1. Run supabase/logo-migration.sql ONCE in the existing Supabase SQL Editor.
2. Overwrite the matching project files with this patch.
3. Run npm run dev and test /admin/settings.
4. Commit and push to GitHub; Vercel will redeploy automatically.
