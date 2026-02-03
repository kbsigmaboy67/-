# s.js Format Guide - All 3 Supported Styles

The s.js script now supports **three different formatting styles** for the `data` attribute. All three work identically - choose whichever feels most natural for your use case.

---

## Format Comparison

### Format 1: Backticks Only (Recommended)
**Style:** `key\`value\`; key\`value\`;`

This is the cleanest and most readable format.

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link`https://example.com`;tab-name`My Title`;tab-image`https://example.com/icon.png`' />
```

**Advantages:**
- Clean and minimal
- Easy to read and write
- Backticks clearly delimit values

**Example:**
```html
<!-- Simple -->
<script src='...' data='link`google.com`' />

<!-- With title -->
<script src='...' data='link`example.com`;tab-name`Portal`' />

<!-- Full -->
<script src='...' data='link`https://example.com`;tab-name`My Site`;tab-image`/favicon.ico`' />
```

---

### Format 2: Backticks with Colons
**Style:** `key:\`value\`; key:\`value\`;`

Combines colons with backticks for extra clarity.

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:`https://example.com`;tab-name:`My Title`;tab-image:`https://example.com/icon.png`' />
```

**Advantages:**
- Explicit key:value pairing
- Still readable and clear
- Familiar syntax for some

**Example:**
```html
<!-- Simple -->
<script src='...' data='link:`google.com`' />

<!-- With title -->
<script src='...' data='link:`example.com`;tab-name:`Portal`' />

<!-- Full -->
<script src='...' data='link:`https://example.com`;tab-name:`My Site`;tab-image:`/favicon.ico`' />
```

---

### Format 3: Simple Colons and Semicolons
**Style:** `key:value; key:value;`

Plain key:value format, no special delimiters.

```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:https://example.com;tab-name:My Title;tab-image:https://example.com/icon.png;' />
```

**Advantages:**
- No special characters needed
- Simple and straightforward
- Good for simple URLs

**Example:**
```html
<!-- Simple -->
<script src='...' data='link:google.com;' />

<!-- With title -->
<script src='...' data='link:example.com;tab-name:Portal;' />

<!-- Full -->
<script src='...' data='link:https://example.com;tab-name:My Site;tab-image:/favicon.ico;' />
```

---

## Side-by-Side Comparison

### Example 1: Load Google with Custom Title

| Format | Code |
|--------|------|
| **Backticks** | `<script src='...' data='link\`google.com\`;tab-name\`Google\`' />` |
| **Backticks + Colons** | `<script src='...' data='link:\`google.com\`;tab-name:\`Google\`' />` |
| **Colons + Semicolons** | `<script src='...' data='link:google.com;tab-name:Google;' />` |

### Example 2: Full Featured (URL + Title + Favicon)

| Format | Code |
|--------|------|
| **Backticks** | `<script src='...' data='link\`https://github.com\`;tab-name\`GitHub\`;tab-image\`https://github.com/favicon.ico\`' />` |
| **Backticks + Colons** | `<script src='...' data='link:\`https://github.com\`;tab-name:\`GitHub\`;tab-image:\`https://github.com/favicon.ico\`' />` |
| **Colons + Semicolons** | `<script src='...' data='link:https://github.com;tab-name:GitHub;tab-image:https://github.com/favicon.ico;' />` |

### Example 3: URL with Query Parameters

| Format | Code |
|--------|------|
| **Backticks** | `<script src='...' data='link\`google.com/search?q=test\`;tab-name\`Search\`' />` |
| **Backticks + Colons** | `<script src='...' data='link:\`google.com/search?q=test\`;tab-name:\`Search\`' />` |
| **Colons + Semicolons** | `<script src='...' data='link:google.com/search?q=test;tab-name:Search;' />` |

---

## Which Format Should I Use?

### Use Format 1 (Backticks) if:
- You want the cleanest, most readable code
- You prefer minimal special characters
- You're working with complex URLs with `=` and `&` characters

✅ **RECOMMENDED**

### Use Format 2 (Backticks + Colons) if:
- You want explicit key:value pairs
- You prefer the familiar `key:value` syntax
- You're migrating from other systems

### Use Format 3 (Colons + Semicolons) if:
- You want the simplest format with no backticks
- You're working with very simple URLs
- You prefer plain text over special characters

---

## Format Detection Logic

The script uses regex patterns to automatically detect which format you're using:

```javascript
// Tried in order - first match wins:
1. link:`value`        (Backticks only)
2. link`value`         (Backticks without colon)
3. link:value;         (Colons and semicolons)
```

So you can even **mix formats in the same data attribute** if needed:

```html
<!-- Mixed formats (not recommended but works) -->
<script src='...' data='link`example.com`;tab-name:Portal;tab-image`/icon.png`' />
```

---

## Important Notes

### Backticks vs Quote Marks

The script uses **backticks** (`) not quotation marks (") or apostrophes ('):

```html
✅ Correct:  data='link`example.com`'
❌ Wrong:    data='link"example.com"'
❌ Wrong:    data="link'example.com'"
```

### Escaping in Different Quote Contexts

If you're using the script inside different quote contexts, remember to escape properly:

```html
<!-- Inside single quotes -->
<script data='link`example.com`' />

<!-- Inside double quotes -->
<script data="link`example.com`" />

<!-- Inside template literal (JavaScript) -->
const script = `<script data='link\`example.com\`' />`;
```

### URL Encoding

URLs with special characters should be properly encoded:

```html
<!-- ❌ Unencoded space -->
<script src='...' data='link`https://example.com/my page`' />

<!-- ✅ Encoded space (%20) -->
<script src='...' data='link`https://example.com/my%20page`' />
```

---

## Real-World Examples

### Example 1: Internal Company Portal

**Format 1 (Backticks):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link`https://internal-tools.company.com`;tab-name`Company Portal`;tab-image`https://company.com/logo.png`' />
```

**Format 2 (Backticks + Colons):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:`https://internal-tools.company.com`;tab-name:`Company Portal`;tab-image:`https://company.com/logo.png`' />
```

**Format 3 (Colons + Semicolons):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:https://internal-tools.company.com;tab-name:Company Portal;tab-image:https://company.com/logo.png;' />
```

### Example 2: Search Engine Redirect

**Format 1 (Backticks):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link`https://google.com/search?q=javascript`;tab-name`Google Search`' />
```

**Format 2 (Backticks + Colons):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:`https://google.com/search?q=javascript`;tab-name:`Google Search`' />
```

**Format 3 (Colons + Semicolons):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:https://google.com/search?q=javascript;tab-name:Google Search;' />
```

### Example 3: Data URL with HTML

**Format 1 (Backticks):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link`data:text/html,<h1>Hello World</h1><p>Custom Content</p>`;tab-name`Welcome`' />
```

**Format 2 (Backticks + Colons):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:`data:text/html,<h1>Hello World</h1><p>Custom Content</p>`;tab-name:`Welcome`' />
```

**Format 3 (Colons + Semicolons):**
```html
<script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link:data:text/html,<h1>Hello World</h1><p>Custom Content</p>;tab-name:Welcome;' />
```

---

## Troubleshooting Format Issues

### Problem: Script shows "Missing link parameter" error

**Cause:** The regex couldn't parse your data attribute

**Solutions:**
1. Make sure you're using backticks (`) not quotes (") or apostrophes (')
2. Check that values are properly delimited
3. Try a different format style
4. Use the code generator in demo.html to generate correct syntax

### Problem: Query parameters aren't being passed

**Solution:** Query parameters with `&` and `=` work fine in all formats:
```html
link`https://example.com/search?q=test&sort=date`
```

### Problem: Favicon URL not working with Format 3

**Cause:** Colons in URLs (http://, https://) can confuse simple parsing

**Solution:** Use Format 1 or 2 for URLs with protocols:
```html
✅ Good:  link`https://example.com/favicon.ico`
❌ Bad:   link:https://example.com/favicon.ico;
```

---

## Summary Table

| Aspect | Format 1 | Format 2 | Format 3 |
|--------|----------|----------|----------|
| **Readability** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Minimal Characters** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |
| **Complex URLs** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| **Simplicity** | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| **Recommended** | ✅ YES | OK | Basic Only |

---

**Bottom Line:** Use **Format 1 (Backticks)** unless you have a specific reason to prefer another style. All three formats are fully supported and work identically!
