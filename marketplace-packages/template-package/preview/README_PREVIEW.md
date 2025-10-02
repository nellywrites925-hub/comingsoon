# 🖼 Preview Asset Preparation Guide

This folder helps you generate professional marketplace preview images from your raw screenshots.

## 📂 Included

- `index.html` – Collage layout & feature highlight board
- (You add) Raw screenshots in a temporary folder (replace REPLACE_WITH paths)
- Output: Exported JPG/PNG images sized per marketplace specs

---

## 🔧 How to Use

1. Copy your screenshots into `preview/raw/` (create the folder) or reuse the existing path
2. Open `preview/index.html` in a browser
3. Edit the `img src` attributes to point to your actual filenames (Desktop.JPG, iphone19pm.JPG, etc.)
4. Use browser dev tools (device pixel ratio 1) and zoom = 100%
5. Capture full or clipped regions with a screenshot tool
6. Crop to exact target dimensions listed below
7. Optimize images (TinyPNG, Squoosh) before packaging

### ✨ Advanced Tools (New)

The preview page now includes two productivity helpers placed in the sticky control bar:

1. Export Overlay

- Choose a preset: 1160x580, 1160x870, 1600x900
- Or pick Custom… then enter width/height and click Set
- Drag the dashed overlay to frame exactly what you want to capture
- Use the Center button to re-align overlay to screen center
- Hide it by selecting None

2. Per-Image Scaling

- Click any tile to open the Per-Image Scale panel (bottom-left)
- Adjust local scale (50%–160%) to fine-tune that screenshot only
- Local scale multiplies with the global Scale slider value
- Reset returns the tile to 100%
- Press ESC or click outside tiles to close the panel

Recommended workflow: first set a global scale (for uniform feel), then micro-adjust individual tiles if a heading or feature is cropped undesirably.

---

## 🖼 Required Image Set (ThemeForest-Oriented)

| Purpose               | File Name (suggested)  | Dimensions       | Notes                                  |
| --------------------- | ---------------------- | ---------------- | -------------------------------------- |
| Main Preview          | `preview-main.jpg`     | 1160x870         | Show desktop hero + key elements       |
| Features Panel        | `preview-features.jpg` | 1160x580         | Use highlight tile area + feature list |
| Mobile Composite      | `preview-mobile.jpg`   | 1600x900 (flex)  | Arrange two phone frames + text badges |
| Contact Section       | `preview-contact.jpg`  | 1160x580         | Show contact + subscription form       |
| Progress Section      | `preview-progress.jpg` | 1160x580         | Show progress bars & countdown         |
| Thumbnail (if needed) | `thumbnail.jpg`        | 80x80 or 200x200 | Simple logo or gradient                |

> Creative Market & Gumroad are more flexible – you can repurpose the same assets.

---

## 🎨 Visual Tips

- Keep consistent spacing & alignment
- Use subtle gradient or dark background (already provided)
- Avoid heavy watermarks; add small footer credit if desired
- Highlight variety: desktop + mobile + features
- Use checkmark lists to communicate value quickly

---

## 🛠 Recommended Tools

| Task                    | Tool                                  |
| ----------------------- | ------------------------------------- |
| Screenshot              | Built-in OS tool / CleanShot / ShareX |
| Cropping & Layout       | Figma / Canva / Photoshop             |
| Optimization            | Squoosh / TinyPNG                     |
| Mock Devices (optional) | Figma community frames                |

---

## 🧪 Quality Checklist Before Upload

- [ ] Correct pixel dimensions
- [ ] Under 1MB (main preview) where possible
- [ ] No typos in visible text
- [ ] Color contrast accessible
- [ ] Mobile views clearly legible
- [ ] Consistent font usage (Poppins)

---

## 📦 Packaging

Place final exported images into:

```
preview/
  preview-main.jpg
  preview-features.jpg
  preview-mobile.jpg
  preview-contact.jpg
  preview-progress.jpg
  thumbnail.jpg
```

Do NOT include raw working files or huge PSD exports unless a marketplace expects them.

---

## 🚀 Fast Workflow Example

1. Open `index.html`
2. Right-click each section → "Capture node" (Chrome dev tools) or use a selection screenshot
3. Open in Figma → create frames with target dimensions → drop captures → crop → export JPG @1x quality 70–80%
4. Optimize with Squoosh → Save

---

## 🔄 Updating Later

When you add new features (e.g., dark mode), create an additional composite: `preview-darkmode.jpg` and add a bullet in your item description: “Now includes Dark Mode Variant.”

---

## ❓ Need Ideas?

Add a marketing band image with text overlay:

> "Modern Coming Soon Template – Countdown • Email Capture • Responsive"

---

**You now have a repeatable system to produce professional previews quickly.**
