# Universal Web Link Loader (s.js)

A versatile JavaScript snippet that can be embedded in any website to load remote content in an iframe with history spoofing, URL normalization, and customizable browser metadata.

## Features

✨ **URL Normalization** - Automatically detects and corrects URLs
- Recognizes `http://`, `https://`, `data:`, and `blob:` protocols
- Auto-prepends `https://` to domain-like URLs
- Handles edge cases gracefully

🎭 **History Spoofing** - Masks iframe content with custom tab properties
- Custom browser tab titles
- Custom favicon support
- History API manipulation to hide navigation

🔒 **Sandboxed Iframe** - Secure content isolation
- Fine-grained sandbox permissions
- Safe cross-origin content loading
- Prevents content breakout

⚠️ **Error Handling** - User-friendly warnings
- Beautiful error modal for misconfiguration
- Clear usage instructions
- Validation of required parameters

## Installation & Usage

### Basic Usage

Add this single line to any website:

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://example.com`' />
```

### With Custom Tab Title

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://example.com`;tab-name`My Custom Title`' />
```

### With Custom Favicon

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://example.com`;tab-image`https://example.com/favicon.ico`' />
```

### Full Example

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link`https://example.com`;tab-name`Secret Portal`;tab-image`https://example.com/icon.png`' />
```

### Supported Formats

The script accepts **three different formatting styles** for the `data` attribute:

#### Format 1: Backticks (Recommended)
```html
data='link`value`;tab-name`value`;tab-image`value`'
```

#### Format 2: Backticks with Colons
```html
data='link:`value`;tab-name:`value`;tab-image:`value`'
```

#### Format 3: Simple Colons
```html
data='link:value;tab-name:value;tab-image:value;'
```

All three formats work identically. Use whichever is most convenient for your use case.

## Parameters

### `link` (Required)

The URL to load in the iframe. Supports multiple formats:

| Format | Example | Notes |
|--------|---------|-------|
| HTTPS URL | `https://example.com` | Direct HTTPS link |
| HTTP URL | `http://example.com` | Direct HTTP link |
| Domain only | `example.com` | Auto-prepends `https://` |
| Data URL | `data:text/html,...` | Inline encoded content |
| Blob URL | `blob:https://...` | Pre-created blob objects |
| Relative path | `pages/index.html` | Auto-prepends `https://` |

### `tab-name` (Optional)

Custom title displayed in the browser tab.

```html
data='link:`https://example.com`;tab-name:`My Portal`;'
```

### `tab-image` (Optional)

Custom favicon URL (must be a valid image URL).

```html
data='link:`https://example.com`;tab-image:`https://example.com/favicon.ico`;'
```

## How It Works

1. **Parse Configuration** - Extracts parameters from the `data` attribute using regex pattern matching
2. **Normalize URL** - Intelligently detects protocol and adds `https://` if needed
3. **Validate** - Checks that required `link` parameter exists
4. **Create Blob** - Generates a self-contained HTML blob with embedded iframe
5. **Replace History** - Uses `location.replace()` to seamlessly replace current page
6. **Spoof Metadata** - Updates document title, favicon, and history state

## Technical Details

### Sandbox Permissions

The embedded iframe includes these sandbox permissions:

- `allow-same-origin` - Access to same-origin resources
- `allow-scripts` - Execute JavaScript
- `allow-forms` - Submit forms
- `allow-popups` - Open new windows/tabs
- `allow-popups-to-escape-sandbox` - Popups aren't sandboxed
- `allow-presentation` - Presentation API
- `allow-downloads` - File downloads
- `allow-modals` - Modal dialogs

### History Manipulation

The script uses `window.history.replaceState()` to spoof browser history:

```javascript
window.history.replaceState(
  { page: 1 },
  tabName,
  window.location.href
);
```

This masks the fact that content is being loaded via iframe.

### Blob URL Generation

Content is wrapped in a minimal HTML document:

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>{tabName}</title>
  <link rel="icon" href="{tabImage}">
</head>
<body>
  <iframe src="{normalizedUrl}" sandbox="..."></iframe>
</body>
</html>
```

Then converted to a `blob:` URL via `URL.createObjectURL()`.

## Error Handling

### Missing `link` Parameter

If the `link` parameter is missing, the script displays a warning modal with usage instructions:

```
⚠️ Configuration Error

Missing or invalid `link` parameter

<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:`https://example.com`;tab-name:`My Page`;tab-image:`/icon.png`;' 
/>

Parameters:
  • link (REQUIRED): URL to load (http://, https://, data:, blob:)
  • tab-name (optional): Browser tab title
  • tab-image (optional): Favicon URL
```

### Invalid URL

If the URL cannot be normalized, an error modal appears explaining the issue.

## Browser Compatibility

Works in all modern browsers that support:

- `URL.createObjectURL()` (Blob URLs)
- `window.history.replaceState()` (History API)
- `<iframe>` sandbox attribute
- ES6+ JavaScript (arrow functions, template literals)

**Supported:** Chrome, Firefox, Safari, Edge, Opera
**Not supported:** Internet Explorer 11 and below

## Security Considerations

⚠️ **Important Security Notes:**

1. **CORS Policy** - Content must be CORS-enabled or on the same origin
2. **Content Trust** - Only load URLs from trusted sources
3. **Sandbox Limitations** - While sandboxed, content can still:
   - Execute scripts
   - Make network requests
   - Access localStorage (if same-origin)
   - Open popups

4. **URL Validation** - The script normalizes URLs but doesn't validate their safety
5. **Blob URLs** - Blob URLs are unique per session and can't be shared directly

## Examples

### Example 1: Simple Portal

```html
<html>
<head>
  <title>My Portal</title>
</head>
<body>
  <p>Loading secret content...</p>
  <script src='https://kbsigmaboy67.github.io/-/s.js' data='link:`https://internal-tool.company.com`;tab-name:`Internal Tools`;' />
</body>
</html>
```

### Example 2: Hiding an Iframe

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link:`google.com`;tab-name:`Google`;tab-image:`https://www.google.com/favicon.ico`;' />
```

Browser tab will show "Google" and use Google's favicon, but content is in an iframe.

### Example 3: Loading Data URL

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' data='link:`data:text/html,<h1>Hello World</h1>`;tab-name:`Inline Content`;' />
```

### Example 4: Multiple Scripts (Not Recommended)

Only the first script will execute properly. If you need multiple, use an anchor tag approach or combine into a single call.

## Troubleshooting

### "Configuration Error: Missing or invalid link parameter"

**Solution:** Ensure the `data` attribute includes a `link:` parameter with a backtick-wrapped value.

```html
<!-- ✗ Wrong -->
<script src='s.js' data='url=https://example.com' />

<!-- ✓ Correct -->
<script src='s.js' data='link:`https://example.com`;' />
```

### Content won't load (CORS Error)

**Cause:** The target URL doesn't allow cross-origin requests.

**Solution:** 
- Ensure the target server sends proper CORS headers
- Try using a CORS proxy (at your own risk)
- Check browser console for specific errors

### Tab title not changing

**Ensure:** `tab-name` parameter is provided and properly formatted.

```html
<!-- ✓ Correct -->
data='link:`https://example.com`;tab-name:`Custom Title`;'
```

### Favicon not displaying

**Ensure:** 
- `tab-image` URL is fully qualified (not relative)
- Image is accessible and CORS-enabled
- Format is a standard favicon (ICO, PNG, SVG)

## API Reference

### Script Tag Attributes

```html
<script 
  src="https://kbsigmaboy67.github.io/-/s.js"
  data="link:`URL`;tab-name:`TITLE`;tab-image:`FAVICON`;[async|defer]"
/>
```

### Data Attribute Format

```
key:`value`;key:`value`;
```

The backticks (`) are **required** delimiters for values.

### Supported Keys

| Key | Type | Required | Example |
|-----|------|----------|---------|
| link | string | ✓ | link:`https://example.com` |
| tab-name | string | ✗ | tab-name:`My Page` |
| tab-image | string | ✗ | tab-image:`https://example.com/icon.png` |

## License

MIT - Feel free to use and modify as needed.

## Support

For issues, feature requests, or improvements, provide feedback through your application's issue tracking system.

---

**Last Updated:** February 2025
**Version:** 1.0
