# Deployment Guide

This walks through taking the project from your machine to a live URL:
**MongoDB Atlas** (database) → **Render** (backend API) → **Netlify or Vercel**
(frontend). Do them in this order — the frontend needs the backend's live
URL, and the backend needs the database's connection string.

---

## 1. MongoDB Atlas (database)

1. Go to https://www.mongodb.com/cloud/atlas and create a free account / sign in.
2. Create a new **Project**, then create a free **M0 Cluster**.
3. Under **Database Access**, add a database user with a username and a
   strong password (save these — you'll need them in the connection string).
4. Under **Network Access**, add an IP allowlist entry:
   - For getting started quickly: `0.0.0.0/0` (allows access from anywhere —
     fine while testing, tighten later if you want).
   - For production: prefer adding Render's outbound IPs once your backend
     is deployed, if your Render plan gives static IPs; otherwise `0.0.0.0/0`
     is the common approach for small projects since access is still gated
     by the username/password.
5. Go to **Database > Connect > Drivers**, choose Node.js, and copy the
   connection string. It looks like:
   ```
   mongodb+srv://<username>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
   ```
6. Replace `<username>` and `<password>` with the database user you created,
   and add a database name before the `?`, e.g. `/unthought-creative?`.

You'll paste this full string into `MONGODB_URI` in step 2.

---

## 2. Backend on Render

1. Push this project to a GitHub repository (Render deploys from Git).
2. Go to https://render.com, sign in, click **New > Web Service**, and
   connect your repository.
3. Configure the service:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance type:** Free is fine to start.
4. Under **Environment**, add these environment variables (values from your
   own setup):
   ```
   PORT=5000
   MONGODB_URI=<the connection string from step 1>
   JWT_SECRET=<a long random string — e.g. generate with `openssl rand -hex 32`>
   CLIENT_URL=http://localhost:5173
   ```
   You'll update `CLIENT_URL` again in step 3 once your frontend has a real
   URL — it can hold a comma-separated list, e.g.
   `http://localhost:5173,https://unthoughtcreative.netlify.app`.
5. Click **Create Web Service**. Render will build and deploy; once live
   you'll get a URL like `https://unthought-creative-api.onrender.com`.
6. Test it: visit `https://<your-render-url>/health` in a browser — you
   should see `{"success":true,"status":"ok",...}`.

> Render's free tier spins down after inactivity, so the first request
> after idle time may take ~30–60 seconds to respond. This is normal.

---

## 3. Frontend on Netlify (or Vercel)

### Option A — Netlify

1. Push the project to GitHub if you haven't already.
2. Go to https://app.netlify.com, **Add new site > Import an existing project**,
   and connect your repository.
3. Configure the build:
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
4. Under **Site settings > Environment variables**, add:
   ```
   VITE_API_URL=https://<your-render-backend-url>
   ```
5. Deploy. Netlify will give you a URL like `https://unthought-creative.netlify.app`.
6. The included `frontend/public/_redirects` file (`/* /index.html 200`)
   is already set up so client-side routing won't 404 on refresh.

### Option B — Vercel

1. Go to https://vercel.com, **Add New > Project**, import your repository.
2. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite (auto-detected)
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variable:
   ```
   VITE_API_URL=https://<your-render-backend-url>
   ```
4. Deploy. Vercel handles SPA routing automatically for Vite projects.

---

## 4. Connect frontend and backend in production

1. Copy your live frontend URL (from Netlify or Vercel).
2. Go back to Render → your backend service → **Environment**, and update:
   ```
   CLIENT_URL=https://<your-frontend-url>
   ```
   (comma-separate multiple URLs if you keep localhost for local dev too).
3. Redeploy the backend (Render redeploys automatically on env var changes,
   or trigger manually).
4. On your live site, submit the contact form and confirm:
   - The button shows a loading state.
   - You get the success screen.
   - A new document appears in your MongoDB Atlas cluster, in the
     `inquiries` collection (Atlas → Browse Collections).

---

## 5. Create your admin user (optional, for the dashboard API)

Run this **once**, locally, pointed at your production database:

```bash
cd backend
MONGODB_URI="<your Atlas connection string>" node src/scripts/createAdmin.js admin@unthoughtcreative.com "yourStrongPassword"
```

You can then `POST /api/auth/login` with that email/password against your
live backend to get a JWT for the protected inquiry-management endpoints.

---

## 6. Post-deployment checklist

- [ ] Frontend loads at its live URL with no console errors
- [ ] Navbar scroll behavior, mobile menu, and smooth scroll all work
- [ ] All sections render correctly on desktop and mobile
- [ ] Pricing cards are readable and not overflowing on small screens
- [ ] Contact form: validation, loading, success, and error states all work
- [ ] A test submission appears in MongoDB Atlas
- [ ] WhatsApp button opens WhatsApp with the pre-filled message
- [ ] Instagram links open the correct profile
- [ ] `CLIENT_URL` on the backend matches your real frontend URL (no CORS errors in the browser console)
- [ ] `VITE_API_URL` on the frontend matches your real backend URL
- [ ] Lighthouse check in Chrome DevTools for performance/SEO/accessibility

---

## Environment variable reference

**frontend/.env**
```
VITE_API_URL=https://<your-backend-url>
```

**backend/.env**
```
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<pass>@<cluster>/unthought-creative?retryWrites=true&w=majority
JWT_SECRET=<long random string>
CLIENT_URL=https://<your-frontend-url>
```

Never commit real `.env` files — both are already listed in `.gitignore`.
