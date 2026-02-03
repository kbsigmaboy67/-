# s.js - Quick Reference Card

## Copy & Paste Templates

### Basic
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://example.com`' />
```

### With Custom Tab Title
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://example.com`;tab-name`My Title`' />
```

### Full (Title + Favicon)
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://example.com`;tab-name`My Title`;tab-image`https://example.com/icon.png`' />
```

### Domain Only (Auto HTTPS)
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`google.com`' />
```

### Inline HTML
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`data:text/html,<h1>Hello</h1>`' />
```

---

## Supported Format Styles

### Style 1: Backticks (Most Common)
```html
data='link`value`;tab-name`value`;tab-image`value`'
```

### Style 2: Backticks with Colons
```html
data='link:`value`;tab-name:`value`;tab-image:`value`'
```

### Style 3: Simple Colons
```html
data='link:value;tab-name:value;tab-image:value;'
```

All three styles work identically! The script auto-detects the format.

---

## Parameters Cheat Sheet

| Parameter | Required | Format | Example |
|-----------|----------|--------|---------|
| `link` | ✓ | `link\`URL\`` | `link\`https://example.com\`` |
| `tab-name` | ✗ | `tab-name\`TEXT\`` | `tab-name\`Google\`` |
| `tab-image` | ✗ | `tab-image\`URL\`` | `tab-image\`https://google.com/icon.png\`` |

**Note:** Use backticks (`) to wrap values for clarity, though semicolons work too.

---

## URL Format Detection

| Format | Input | Output | Notes |
|--------|-------|--------|-------|
| HTTPS | `https://ex.com` | ✓ Used as-is | Direct |
| HTTP | `http://ex.com` | ✓ Used as-is | Direct |
| Domain | `google.com` | → `https://google.com` | Auto-detected |
| Path | `pages/index.html` | → `https://pages/index.html` | Auto-detected |
| Data | `data:text/html,...` | ✓ Used as-is | Inline |
| Blob | `blob:https://...` | ✓ Used as-is | Pre-made |

---

## Common Use Cases

### 1. Load Another Website
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://reddit.com`' />
```

### 2. Fake Browser Tab
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://youtube.com`;tab-name`YouTube`;tab-image`https://youtube.com/favicon.ico`' />
```

### 3. Portal with Branding
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://internal-app.company.com`;tab-name`Company Portal`;tab-image`https://company.com/logo.png`' />
```

### 4. Inline Content
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`data:text/html,<h1>Welcome</h1><p>Hello World</p>`;tab-name`Welcome`' />
```

### 5. Shorthand Domain
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`github.com`;tab-name`GitHub`' />
```

---

## Troubleshooting

### ❌ "Configuration Error: Missing or invalid link parameter"
- **Fix:** Ensure you have `link\`...\`` in your data attribute
- **Wrong:** `data='url=https://example.com'`
- **Right:** `data='link\`https://example.com\`'`
- **Also Works:** `data='link:https://example.com;'`

### ❌ Content won't load (CORS)
- Target server doesn't allow cross-origin loading
- Check browser console for CORS errors
- Add CORS headers to your server or use a CORS proxy

### ❌ Tab title not updating
- Add `tab-name\`Your Title\`` parameter
- Make sure to use backticks or colons properly

### ❌ Favicon not showing
- Ensure URL is fully qualified: `https://example.com/favicon.ico`
- Image must be accessible and CORS-enabled
- Use standard formats: ICO, PNG, SVG

---

## Sandbox Permissions

The iframe includes these security settings:
- ✓ `allow-scripts` - Execute JavaScript
- ✓ `allow-forms` - Submit forms
- ✓ `allow-same-origin` - Same-origin resources
- ✓ `allow-popups` - Open new windows
- ✓ `allow-downloads` - File downloads
- ⚠️ Still can make network requests
- ⚠️ Still can execute scripts

---

## How It Works (30-Second Version)

1. **Parses** your `data` attribute for parameters
2. **Normalizes** the URL (adds https:// if needed)
3. **Creates** a blob with your URL in an iframe
4. **Replaces** the current page with the blob (using location.replace)
5. **Spoofs** metadata (title, favicon, history)
6. **Shows** your content seamlessly in an iframe

Result: The page looks normal but content loads in iframe with custom tab info.

---

## Browser Support

✅ Chrome, Firefox, Safari, Edge, Opera, Brave, Vivaldi

❌ Internet Explorer 11 and below

Requires:
- `URL.createObjectURL()` support
- History API support
- Iframe sandbox attribute

---

## Pro Tips

💡 **Tip 1:** Domain-only URLs auto-prepend https://
```html
link`example.com` → https://example.com
```

💡 **Tip 2:** Tab names can include emojis
```html
tab-name`🔐 Secure Portal`
```

💡 **Tip 3:** Multiple scripts won't work, only first executes

💡 **Tip 4:** Blob URLs are session-unique, can't be shared

💡 **Tip 5:** Use in hidden elements for sneakier embedding
```html
<div style="display:none;">
  <script src='...' data='link`https://example.com`' />
</div>
```

💡 **Tip 6:** All three format styles work identically
```html
<!-- Format 1: Backticks -->
data='link`url`;tab-name`title`'

<!-- Format 2: Backticks + Colons -->
data='link:`url`;tab-name:`title`'

<!-- Format 3: Colons + Semicolons -->
data='link:url;tab-name:title;'
```

---

## Example Full HTML Page

```html
<!DOCTYPE html>
<html>
<head>
  <title>Welcome</title>
</head>
<body>
  <p>Loading content...</p>
  <script src='https://kbsigmaboy67.github.io/-/s.js' 
    data='link`https://example.com`;tab-name`Example`' />
</body>
</html>
```

When loaded, the page immediately replaces with embedded content.

---

## Version Info

- **Version:** 1.0
- **Last Updated:** February 2025
- **License:** MIT
- **Size:** ~4KB minified

---

**Ready to use!** Copy any template above and customize with your URL.
