# Velofy Agency - Telegram Mini App & Website

This is the official web presence for Velofy, a remote-first agency specializing in Telegram Mini Apps and bots. It's built to run inside Telegram, on mobile browsers, and on desktop.

## ✨ Features

- **Astro & Tailwind CSS**: A modern, fast, and beautiful stack.
- **Dynamic Content**: All content (case studies, pricing, etc.) is managed via Supabase.
- **Telegram-Aware Admin Button**: A special admin button appears only for the designated admin's Telegram ID when viewed inside Telegram.
- **Protected Admin Panel**: A secure area to manage site content via Supabase Auth.
- **Lead Capture**: Forms for service requests and newsletter subscriptions.
- **Deploy-Ready**: Configured for Vercel and GitHub Codespaces.

## 🚀 Tech Stack

- **Frontend**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend & Auth**: [Supabase](https://supabase.io/)
- **Hosting**: [Vercel](https://vercel.com/)

## 🛠️ Setup & Deployment

### 1. Supabase Setup

1.  **Create a Supabase Project**: Go to [supabase.com](https://supabase.com) and create a new project.
2.  **Run SQL Schema**: In your Supabase project, go to the `SQL Editor`, paste the entire contents of `pgsql/schema.sql` and click **Run**. This will create all your tables and security policies.
3.  **Get API Keys**: Go to `Project Settings` > `API`. Copy the **Project URL** and the **`anon` public key**.
4.  **Enable Email Authentication**: Go to `Authentication` > `Providers` and enable the **Email** provider. For simplicity, you can disable "Confirm email".
5.  **Create Admin User**: Go to `Authentication` > `Users` and click "Create user" to create your admin account. You'll use this email/password to log into the `/admin` page.

### 2. Environment Setup

1.  **Get Your Telegram ID**: In Telegram, find `@userinfobot`, start a chat, and it will give you your numeric User ID.
2.  **Create `.env` file**: If it doesn't exist, copy the example file: `cp .env.example .env`.
3.  **Fill in `.env`**: Add your Supabase keys and your Telegram ID.
    ```
    PUBLIC_SUPABASE_URL=YOUR_SUPABASE_URL
    PUBLIC_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
    PUBLIC_TELEGRAM_ADMIN_ID=YOUR_TELEGRAM_USER_ID
    ```

### 3. Running Locally

1.  **Install Dependencies**: If you haven't already:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
3.  Open `http://localhost:4321` in your browser (or the URL your Codespace provides).

### 4. Deploying to Vercel

1.  **Push to GitHub**: Push your completed code to a GitHub repository.
2.  **Import to Vercel**: Import the repository into Vercel. It will automatically detect Astro.
3.  **Add Environment Variables**: In the Vercel project settings, go to `Settings` > `Environment Variables` and add the same three variables from your `.env` file (`PUBLIC_SUPABASE_URL`, `PUBLIC_SUPABASE_ANON_KEY`, `PUBLIC_TELEGRAM_ADMIN_ID`).
4.  **Deploy**. Vercel will handle the rest.