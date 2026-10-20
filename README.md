# Darbhange Hamper — Thoughtful Gifts. Beautiful Memories.

A modern, elegant, production-ready e-commerce storefront for **Darbhange Hamper**, a personalized gifting business in India. Built with Next.js (App Router), TypeScript, Tailwind CSS, Lucide icons, and integrated WhatsApp order workflows with greeting card customization.

---

## 🌸 Brand Identity & Color Palette

- **Brand Name:** Darbhange Hamper
- **Primary Tagline:** Thoughtful Gifts. Beautiful Memories.
- **Alternative Tagline:** Every Gift Tells a Story.
- **Market:** India
- **Currency:** Indian Rupees (₹)
- **Palette:**
  - Burgundy: `#722F37` (Primary brand accent, CTAs, headers)
  - Warm Cream: `#FAF3EF` (Backdrop, cards, warm tone)
  - Muted Gold: `#C5A46D` (Accents, badges, stationery borders)
  - Charcoal: `#292525` (Readable text, dark contrasts)
  - Crisp White: `#FFFFFF`

---

## 🚀 Key Features

1. **Centralized Product Catalogue (`src/data/products.ts`)**
   - 4 official launch hampers with launch prices:
     - **Girls Accessories Hamper** — ₹299
     - **Birthday Hamper for Him** — ₹599
     - **Birthday Hamper for Her** — ₹399
     - **Anniversary Couple Hamper** — ₹499
   - No hardcoded duplicated prices; single source of truth with integer paise arithmetic.

2. **Personalized Greeting Card Customization**
   - Complimentary greeting card feature included for every hamper.
   - Live stationery card preview as the customer types their message.
   - 250 character limit with counter and reset button.
   - Preserves individual line-item greeting messages even when ordering multiples of the same hamper.

3. **WhatsApp Order Inquiry Integration (`src/lib/whatsapp.ts`)**
   - Formats complete, professional order inquiry messages with customer details, address, line items, prices, and customized card notes.
   - Direct `wa.me` links with proper URL encoding.
   - If WhatsApp number is pending owner setup, displays a helpful configuration notice and allows 1-click order copying.

4. **Persistent Shopping Cart (`src/context/CartContext.tsx`)**
   - Real-time totals, quantity controls, and delete actions.
   - Preserves items in `localStorage` across refreshes.
   - Zero hydration mismatch using React’s `useSyncExternalStore`.
   - Discards malformed or non-existent items automatically.

5. **Customer Checkout Review (`/checkout`)**
   - Collects only necessary delivery info: Name, Mobile, House Address, City, State, PIN code, and optional preferred delivery date and notes.
   - Validates Indian 10-digit mobile numbers and 6-digit PIN codes.
   - Complete pre-flight WhatsApp order preview modal.

6. **Filter & Search Catalogue (`/shop`)**
   - Category filtering (Birthday Gifts, Girls Accessories, Anniversary Gifts).
   - Price sorting (Low to High, High to Low, A-Z) and price tiers.
   - Real-time search by name, description, tags, and included items.
   - Synchronized with URL search parameters for link sharing.

7. **Complete Policy Suite**
   - Shipping & Delivery Policy (`/shipping-policy`)
   - Cancellation & Refund Policy (`/refund-policy`)
   - Privacy Policy (`/privacy-policy`)
   - Terms & Conditions (`/terms-and-conditions`)

8. **SEO & Accessibility**
   - Dynamic sitemap (`/sitemap.xml`) and search engine directives (`/robots.txt`).
   - JSON-LD structured data for products without fabricated reviews.
   - WCAG-compliant color contrast, keyboard navigation, and mobile drawer.

---

## 📂 Project Structure

```
├── public/
│   └── images/
│       ├── hero/
│       │   └── hero-gift-hampers.jpg          (Homepage hero background banner)
│       ├── products/
│       │   ├── girls-accessories-hamper.jpg   (Launch hamper photo)
│       │   ├── birthday-hamper-for-him.jpg    (Launch hamper photo)
│       │   ├── birthday-hamper-for-her.jpg    (Launch hamper photo)
│       │   └── anniversary-couple-hamper.jpg  (Launch hamper photo)
│       └── README.md                          (Asset replacement guide)
├── src/
│   ├── app/
│   │   ├── cart/                              (Shopping cart page)
│   │   ├── checkout/                          (Order review and WhatsApp generator)
│   │   ├── contact/                           (Inquiry form and contact channels)
│   │   ├── privacy-policy/                    (Privacy terms)
│   │   ├── products/[slug]/                   (Product details & card customizer)
│   │   ├── refund-policy/                     (Cancellation & returns)
│   │   ├── shipping-policy/                   (Transit timelines & shipping)
│   │   ├── shop/                              (Product catalogue with filters)
│   │   ├── terms-and-conditions/              (Terms of service)
│   │   ├── globals.css                        (Tailwind v4 theme & brand tokens)
│   │   ├── layout.tsx                         (Fonts, SEO metadata, Root Layout)
│   │   ├── not-found.tsx                      (Custom 404 page)
│   │   ├── page.tsx                           (Homepage assembling all 8 sections)
│   │   ├── robots.ts                          (Robots.txt generator)
│   │   └── sitemap.ts                         (Sitemap.xml generator)
│   ├── components/
│   │   ├── home/                              (Hero, Occasions, Featured, WhyChoose, etc.)
│   │   ├── layout/                            (Header, Footer, AnnouncementBar)
│   │   ├── product/                           (GreetingMessageEditor)
│   │   └── shop/                              (ProductCard)
│   ├── config/
│   │   └── site.ts                            (Centralized business settings)
│   ├── context/
│   │   └── CartContext.tsx                    (Cart state & persistence)
│   ├── data/
│   │   └── products.ts                        (Authoritative product catalogue)
│   ├── lib/
│   │   ├── cart.ts                            (Totals calculation & sanitization)
│   │   ├── checkout.ts                        (Indian address validation)
│   │   └── whatsapp.ts                        (WhatsApp message builder)
│   └── types/
│       └── index.ts                           (TypeScript interfaces)
├── tests/
│   ├── cart.test.ts                           (Cart calculations & sanitization)
│   ├── checkout.test.ts                       (Address & phone validation)
│   ├── products.test.ts                       (Product lookup, filter, and sorting)
│   └── whatsapp.test.ts                       (Message formatting & URL encoding)
├── .env.example                               (Environment variables template)
├── vitest.config.mts                          (Vitest test runner configuration)
└── package.json
```

---

## 🛠️ Getting Started & Commands

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Run Unit Tests
```bash
npm run test
```
Runs the 21 automated unit tests across cart calculations, WhatsApp message generation, product queries, and checkout validation.

### 4. Run Linter
```bash
npm run lint
```

### 5. Production Build
```bash
npm run build
npm run start
```

---

## ⚙️ Store Owner Configuration Guide

### 1. Connecting Your WhatsApp Business Number
1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Set your WhatsApp number in international format without `+` or spaces:
   ```env
   NEXT_PUBLIC_WHATSAPP_NUMBER=919876543210
   NEXT_PUBLIC_DISPLAY_PHONE="+91 98765 43210"
   NEXT_PUBLIC_CONTACT_EMAIL=support@darbhangehamper.com
   NEXT_PUBLIC_SITE_URL=https://your-custom-domain.com
   ```
3. Alternatively, update `src/config/site.ts` directly.

### 2. Changing Product Prices or Details
Open `src/data/products.ts`. Each hamper has a single definition:
```typescript
{
  id: "prod-girls-accessories",
  slug: "girls-accessories-hamper",
  name: "Girls Accessories Hamper",
  price: 299,
  pricePaise: 29900,
  category: "Girls Accessories",
  // ...
}
```
Update the `price` and `pricePaise` fields. The updated price is instantly reflected everywhere across the site, cart, and checkout calculations.

### 3. Replacing Hamper Photos
1. Place your real hamper images in `public/images/products/`.
2. Recommended format: Square (1:1), 800×800px to 1200×1200px JPG or WebP.
3. Keep the file names matching the slug (e.g. `girls-accessories-hamper.jpg`) or update the image path inside `src/data/products.ts`.
4. See detailed instructions in `public/images/README.md`.

---

## 🚢 Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Initial release of Darbhange Hamper storefront"
   git branch -M main
   git remote add origin https://github.com/<your-username>/darbhange-hamper.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your `darbhange-hamper` repository.
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = your WhatsApp business number (e.g. `91XXXXXXXXXX`)
   - `NEXT_PUBLIC_CONTACT_EMAIL` = your business email
   - `NEXT_PUBLIC_SITE_URL` = your production domain
5. Click **Deploy**. Vercel will build and deploy your store automatically.
