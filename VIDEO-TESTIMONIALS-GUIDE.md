# Video Testimonials Integration Guide

## Overview
Your portfolio now supports video testimonials with automatic fallback to text testimonials. This guide explains how to add video testimonials to your site.

## How It Works

The testimonials section now includes:
- **Toggle buttons** to switch between text and video testimonials (only shown if at least one video exists)
- **Video player** with responsive iframe embedding
- **Automatic fallback** to text testimonials if video fails to load or doesn't exist
- **Lazy loading** for optimal performance

## Adding Video Testimonials

### Step 1: Get Client Video Testimonials

**Option A: Record Yourself**
- Use Zoom, Loom, or your phone camera
- Ask clients these questions:
  1. What was your biggest challenge before working with me?
  2. How did I help solve that problem?
  3. What results have you seen since launching your new website?
  4. Would you recommend my services to others?
- Keep videos under 2 minutes for best engagement

**Option B: Have Clients Record**
- Send them a Loom link or ask them to record on their phone
- Provide a simple script or talking points
- Make it easy - even a 30-second video is valuable

### Step 2: Upload Videos to YouTube or Vimeo

**YouTube (Recommended - Free)**
1. Upload video to YouTube
2. Set visibility to "Unlisted" (not searchable, but accessible via link)
3. Click "Share" → "Embed"
4. Copy the embed URL (looks like: `https://www.youtube.com/embed/VIDEO_ID`)

**Vimeo (Professional Option)**
1. Upload video to Vimeo
2. Go to video settings
3. Copy the embed URL (looks like: `https://player.vimeo.com/video/VIDEO_ID`)

### Step 3: Add Video URL to Your Code

Open `src/App.tsx` and find the `testimonials` array (around line 531).

Update the testimonial you want to add a video to:

```typescript
{
  id: 1,
  quote: "Eldon transformed our online presence completely...",
  name: "Sarah Mitchell",
  title: "Managing Partner",
  company: "The Money Team Law Firm",
  avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
  rating: 5,
  videoUrl: "https://www.youtube.com/embed/YOUR_VIDEO_ID" // Add this line
},
```

**Important:** Replace `YOUR_VIDEO_ID` with your actual video ID from YouTube or Vimeo.

### Step 4: Test Your Changes

1. Save the file
2. Run `npm run dev` to start the development server
3. Navigate to the testimonials section
4. You should see toggle buttons appear
5. Click "Video Testimonials" to view the video
6. Verify the video loads and plays correctly

### Step 5: Deploy

Once you're happy with the videos:
```bash
npm run build
git add -A
git commit -m "Add video testimonials"
git push
```

Netlify will automatically deploy your changes.

## Best Practices

### Video Quality
- **Resolution:** 1080p minimum
- **Audio:** Clear audio is MORE important than video quality
- **Lighting:** Natural light or ring light for professional look
- **Background:** Clean, professional background

### Video Length
- **Ideal:** 30-60 seconds
- **Maximum:** 2 minutes
- **Minimum:** 15 seconds

### Content Tips
- Start with client's name and company
- Focus on specific results (numbers, percentages)
- Keep it authentic - don't over-script
- End with a clear recommendation

### Technical Considerations
- Videos are lazy-loaded for performance
- Fallback to text if video fails
- Mobile-optimized with responsive iframe
- Works with YouTube, Vimeo, and other embed services

## Troubleshooting

### Video Not Showing
- Check that the URL is an **embed** URL, not a regular watch URL
- YouTube: Should be `youtube.com/embed/ID` not `youtube.com/watch?v=ID`
- Vimeo: Should be `player.vimeo.com/video/ID` not `vimeo.com/ID`

### Toggle Buttons Not Appearing
- At least one testimonial must have a `videoUrl` that is not `null`
- Check that you saved the file after adding the video URL

### Video Not Playing
- Check browser console for errors
- Verify the video is set to "Unlisted" or "Public" (not "Private")
- Some browsers block autoplay - this is normal

## Example Video URLs

**YouTube:**
```
https://www.youtube.com/embed/dQw4w9WgXcQ
```

**Vimeo:**
```
https://player.vimeo.com/video/123456789
```

## Next Steps

1. Reach out to your top 3-5 clients for video testimonials
2. Record or collect videos
3. Upload to YouTube/Vimeo
4. Add embed URLs to your code
5. Test and deploy

Video testimonials can increase conversion rates by 80%+ compared to text alone!

