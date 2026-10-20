# Darbhange Hamper — Image Assets & Replacement Guide

This folder contains the visual assets used throughout the Darbhange Hamper storefront.

## Folder Structure

```
public/images/
├── hero/
│   └── hero-gift-hampers.jpg          (Homepage hero background banner, recommended 1920x1080 or 16:9 aspect ratio)
└── products/
    ├── girls-accessories-hamper.jpg   (1:1 square, recommended 1000x1000px)
    ├── birthday-hamper-for-him.jpg    (1:1 square, recommended 1000x1000px)
    ├── birthday-hamper-for-her.jpg    (1:1 square, recommended 1000x1000px)
    └── anniversary-couple-hamper.jpg  (1:1 square, recommended 1000x1000px)
```

## How to Replace Images with Real Hamper Photos

1. **Keep the exact file names** (e.g., `girls-accessories-hamper.jpg`) or update the image path inside `src/data/products.ts`.
2. **Recommended Specs**:
   - Format: JPG, PNG, or WebP.
   - Product aspect ratio: 1:1 (Square), minimum 800×800px up to 1200×1200px.
   - File size: Keep compressed under 200KB-400KB each for lightning fast mobile load.
   - Clean, natural or studio lighting with neutral/warm cream background for brand consistency.
3. Once placed in `public/images/products/`, Next.js will automatically serve the updated images immediately without requiring a code rebuild.
