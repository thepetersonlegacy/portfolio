# Peterson Pro Services Logo Integration Instructions

## Step 1: Save Logo Files

Please save the Peterson Pro Services logo (the lion head with red diamond) to the following locations:

1. **Main Logo** (for navigation):
   - Save as: `public/peterson-pro-services-logo.png`
   - Recommended size: 512x512px (will be scaled down in CSS)
   - Format: PNG with transparency

2. **Favicon Sizes** (create from main logo):
   - `public/favicon-16x16.png` (16x16px)
   - `public/favicon-32x32.png` (32x32px)
   - `public/favicon-192x192.png` (192x192px)
   - `public/favicon-512x512.png` (512x512px)
   - `public/favicon.ico` (multi-size ICO file)

## Step 2: Optimize Logo

Use an image optimization tool to:
- Compress PNG files (aim for <50KB for main logo)
- Ensure transparency is preserved
- Maintain sharp edges for the lion and diamond

## Step 3: Code Integration

The code has been updated to use the logo. Once you save the files above, the logo will automatically appear in:
- Navigation header
- Browser favicon
- PWA manifest

## Tools for Creating Favicons

**Online Tools:**
- https://realfavicongenerator.net/ (recommended)
- https://favicon.io/

**Command Line (if you have ImageMagick):**
```bash
# From the main logo, create all sizes
convert public/peterson-pro-services-logo.png -resize 16x16 public/favicon-16x16.png
convert public/peterson-pro-services-logo.png -resize 32x32 public/favicon-32x32.png
convert public/peterson-pro-services-logo.png -resize 192x192 public/favicon-192x192.png
convert public/peterson-pro-services-logo.png -resize 512x512 public/favicon-512x512.png
```

## Current Status

✅ Code updated to use logo
⏳ Waiting for logo files to be saved to public directory
