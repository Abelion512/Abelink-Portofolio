# Image & Media Format Guide

## Recommended Formats for Web

### 🖼️ Images

#### **AVIF** (Best Choice)
- **Size**: ~50% smaller than JPEG at same quality
- **Quality**: Excellent, supports HDR
- **Browser Support**: Modern browsers (Chrome, Firefox, Safari 16+)
- **Use Case**: Photos, complex images with gradients
- **Transparency**: Yes (better than PNG)

#### **WebP** (Great Alternative)
- **Size**: ~25-35% smaller than JPEG
- **Quality**: Very good
- **Browser Support**: Excellent (all modern browsers)
- **Use Case**: General purpose, fallback for AVIF
- **Transparency**: Yes

#### **PNG** (For Graphics)
- **Size**: Larger than JPEG/WebP/AVIF
- **Quality**: Lossless, perfect for sharp edges
- **Browser Support**: Universal
- **Use Case**: Logos, icons, screenshots, images with text
- **Transparency**: Yes (best support)

#### **SVG** (For Icons/Logos)
- **Size**: Smallest for vector graphics
- **Quality**: Perfect at any scale
- **Browser Support**: Universal
- **Use Case**: Icons, logos, simple illustrations

#### **JPEG/JPG** (Legacy)
- **Size**: Larger than AVIF/WebP
- **Quality**: Good with lossy compression
- **Browser Support**: Universal
- **Use Case**: Only when other formats not available
- **Note**: No transparency support

### 📹 Videos

#### **MP4 (H.264)** - Recommended
- **Compatibility**: Universal support
- **Quality**: Excellent
- **Size**: Good compression
- **Use**: Primary format for web

#### **WebM** - Alternative
- **Size**: ~30% smaller than MP4
- **Quality**: Excellent
- **Browser Support**: Modern browsers
- **Use**: Alternative format for smaller size

### 🎵 Audio

#### **MP3** - Universal
- **Compatibility**: Everywhere
- **Quality**: Good
- **Use**: General purpose

#### **OGG** - Open Source
- **Size**: Smaller than MP3
- **Quality**: Better than MP3 at same bitrate
- **Use**: Alternative to MP3

#### **WebM Audio** - Modern
- **Size**: Smallest
- **Quality**: Excellent
- **Use**: Modern browsers

---

## Best Practices for This Project

### Image Optimization Strategy

1. **Primary Format**: Use **AVIF** for photos
2. **Fallback**: Provide **WebP** as fallback
3. **Graphics**: Use **PNG** for logos/icons
4. **Vectors**: Use **SVG** when possible

### Example Implementation

```tsx
// For photos
<picture>
  <source srcSet="/image.avif" type="image/avif" />
  <source srcSet="/image.webp" type="image/webp" />
  <img src="/image.jpg" alt="Description" />
</picture>

// For videos (already implemented)
<video autoPlay loop muted playsInline>
  <source src="/video.mp4" type="video/mp4" />
  <source src="/video.webm" type="video/webm" />
</video>
```

### Tools for Conversion

- **AVIF**: [Squoosh](https://squoosh.app), `ffmpeg`
- **WebP**: [Squoosh](https://squoosh.app), `cwebp`
- **PNG**: [TinyPNG](https://tinypng.com), `pngquant`

### Ryujin.mp4 Optimization

The current `Ryujin.mp4` uses H.264 codec which is good. To optimize further:

```bash
# Compress with ffmpeg (maintains quality)
ffmpeg -i Ryujin.mp4 -vcodec libx264 -crf 23 -acodec aac Ryujin-optimized.mp4

# Create WebM alternative
ffmpeg -i Ryujin.mp4 -vcodec libvpx-vp9 -b:v 0 -crf 30 -acodec libopus Ryujin.webm
```

---

## Quick Reference

| Format | Best For | Size | Quality | Transparency |
|--------|----------|------|---------|--------------|
| AVIF | Photos | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |
| WebP | General | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ✅ |
| PNG | Graphics | ⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |
| SVG | Icons/Logos | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ✅ |
| JPEG | Legacy | ⭐⭐⭐ | ⭐⭐⭐ | ❌ |
| MP4 | Video | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | N/A |
| WebM | Video | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | N/A |
