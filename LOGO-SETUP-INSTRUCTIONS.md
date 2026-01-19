# Peterson Pro Services Logo Setup Instructions

## ✅ Code Integration Complete

The portfolio code has been updated to use the Peterson Pro Services logo (lion head with red diamond). All you need to do now is save the logo files to the correct locations.

---

## 📁 Step 1: Save the Main Logo

1. **Save the logo image** (the lion head with red diamond) as:
   ```
   public/peterson-pro-services-logo.png
   ```

2. **Recommended specifications**:
   - Format: PNG with transparency
   - Size: 512x512 pixels (will be scaled down automatically)
   - File size: Aim for <100KB (compress if needed)
   - Background: Transparent

---

## 🎨 Step 2: Create Favicon Sizes

You need to create multiple sizes of the logo for favicons. Use one of these methods:

### **Method A: Online Tool (Easiest)** ⭐ RECOMMENDED

1. Go to: **https://realfavicongenerator.net/**
2. Upload your logo (peterson-pro-services-logo.png)
3. Configure settings:
   - iOS: Use the logo as-is
   - Android: Use the logo as-is
   - Windows: Use the logo as-is
4. Click "Generate favicons"
5. Download the package
6. Extract and save these files to the `public/` directory:
   - `favicon-16x16.png`
   - `favicon-32x32.png`
   - `favicon-192x192.png`
   - `favicon-512x512.png`
   - `favicon.ico`

### **Method B: Manual Creation**

If you have image editing software (Photoshop, GIMP, etc.):

1. Open the main logo (512x512px)
2. Create these sizes and save to `public/`:
   - **favicon-16x16.png** - 16×16 pixels
   - **favicon-32x32.png** - 32×32 pixels
   - **favicon-192x192.png** - 192×192 pixels
   - **favicon-512x512.png** - 512×512 pixels
   - **favicon.ico** - Multi-size ICO file (16, 32, 48 pixels)

### **Method C: Command Line (ImageMagick)**

If you have ImageMagick installed:

```bash
cd public

# Create all favicon sizes from main logo
convert peterson-pro-services-logo.png -resize 16x16 favicon-16x16.png
convert peterson-pro-services-logo.png -resize 32x32 favicon-32x32.png
convert peterson-pro-services-logo.png -resize 192x192 favicon-192x192.png
convert peterson-pro-services-logo.png -resize 512x512 favicon-512x512.png

# Create ICO file with multiple sizes
convert peterson-pro-services-logo.png -define icon:auto-resize=16,32,48 favicon.ico
```

---

## 📋 Step 3: Verify File Structure

After saving all files, your `public/` directory should contain:

```
public/
├── peterson-pro-services-logo.png  ← Main logo (512x512px)
├── favicon-16x16.png               ← Browser tab icon
├── favicon-32x32.png               ← Browser tab icon
├── favicon-192x192.png             ← PWA icon, Android
├── favicon-512x512.png             ← PWA icon, Android
├── favicon.ico                     ← Legacy browsers
├── eldon-peterson-profile.jpg      ← (existing)
└── ... (other existing files)
```

---

## 🧪 Step 4: Test the Logo

1. **Start the dev server** (if not already running):
   ```bash
   npm run dev
   ```

2. **Check the navigation**:
   - Open http://localhost:5174/
   - You should see the Peterson Pro Services logo in the top-left corner
   - Hover over it - it should scale slightly
   - Click it - it should scroll to the top

3. **Check the favicon**:
   - Look at your browser tab
   - You should see the lion logo instead of the default Vite icon

4. **If logo doesn't appear**:
   - Check browser console for errors (F12 → Console)
   - Verify file paths are correct
   - Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
   - Check that PNG files have transparency

---

## 🎯 What Was Changed in the Code

### Navigation (src/App.tsx)
- Replaced text "Eldon Peterson | Peterson Pro Services" with logo image
- Added hover effect (scale on hover)
- Added click handler to scroll to top
- Added fallback to text if logo fails to load
- Logo height: 48px (3rem) - follows golden ratio spacing

### HTML Head (index.html)
- Added favicon links for all sizes
- Added Apple touch icon
- Removed old Vite SVG favicon

### PWA Manifest (vite.config.ts)
- Updated app name to "Peterson Pro Services"
- Updated theme color to primary blue (#0a2f85)
- Updated icon paths to use favicon files
- Added "maskable" purpose for better Android support

---

## 🚀 Step 5: Deploy

Once you've verified the logo works locally:

```bash
# Build for production
npm run build

# Commit changes
git add -A
git commit -m "Integrate Peterson Pro Services logo and fix hero fade-out bug"

# Push to deploy
git push
```

---

## ✨ Logo Features

- **Responsive**: Scales perfectly on all devices
- **Accessible**: Includes descriptive alt text
- **Optimized**: Compressed for fast loading
- **Interactive**: Hover effect and click-to-top functionality
- **Fallback**: Shows text if image fails to load
- **PWA Ready**: Works as app icon on mobile devices

---

## 🐛 Troubleshooting

**Logo not showing in navigation?**
- Check file path: `public/peterson-pro-services-logo.png`
- Check file name spelling (case-sensitive)
- Clear browser cache
- Check browser console for 404 errors

**Favicon not updating?**
- Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Clear browser cache completely
- Close and reopen browser
- Check file paths in index.html

**Logo looks blurry?**
- Ensure source image is high resolution (512x512px minimum)
- Save as PNG, not JPG
- Don't use lossy compression

---

## 📞 Need Help?

If you encounter any issues:
1. Check browser console (F12 → Console tab)
2. Verify all file paths match exactly
3. Ensure PNG files have transparency
4. Try the RealFaviconGenerator.net tool for automatic generation

---

## ✅ Checklist

- [ ] Save main logo as `public/peterson-pro-services-logo.png`
- [ ] Create `favicon-16x16.png`
- [ ] Create `favicon-32x32.png`
- [ ] Create `favicon-192x192.png`
- [ ] Create `favicon-512x512.png`
- [ ] Create `favicon.ico`
- [ ] Test navigation logo appears
- [ ] Test favicon appears in browser tab
- [ ] Test hover effect on logo
- [ ] Test click-to-top functionality
- [ ] Build and deploy

---

**Status**: ✅ Code ready | ⏳ Waiting for logo files to be saved

