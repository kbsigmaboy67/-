/**
 * Universal Web Link Loader with History Spoofing
 * Usage: <script src='https://kbsigmaboy67.github.io/-/s.js' data='link:`url`;tab-name:`optional-title`;tab-image:`optional-favicon-url`;' />
 */

(function() {
  // Get script element and extract data attribute
  const script = document.currentScript || document.scripts[document.scripts.length - 1];
  const dataAttr = script?.getAttribute('data') || '';

  // Parse data attribute - supports multiple formats
  function parseData(dataStr) {
    const result = {
      link: null,
      tabName: null,
      tabImage: null
    };

    if (!dataStr) return result;

    // Support multiple patterns for flexibility
    // Pattern 1: key:`value` (backticks around value)
    // Pattern 2: key`value` (backticks before and after value)
    // Pattern 3: key:value; (simple key:value with semicolon)
    
    const patterns = {
      link: [
        /link:`([^`]+)`/,           // link:`value`
        /link`([^`]+)`/,            // link`value`
        /link:([^;]+);?/            // link:value;
      ],
      tabName: [
        /tab-name:`([^`]+)`/,       // tab-name:`value`
        /tab-name`([^`]+)`/,        // tab-name`value`
        /tab-name:([^;]+);?/        // tab-name:value;
      ],
      tabImage: [
        /tab-image:`([^`]+)`/,      // tab-image:`value`
        /tab-image`([^`]+)`/,       // tab-image`value`
        /tab-image:([^;]+);?/       // tab-image:value;
      ]
    };

    // Try each pattern until one matches
    Object.keys(patterns).forEach(key => {
      for (let pattern of patterns[key]) {
        const match = dataStr.match(pattern);
        if (match && match[1]) {
          result[key] = match[1].trim();
          break; // Stop after first successful match
        }
      }
    });

    return result;
  }

  // Normalize and validate URL
  function normalizeUrl(url) {
    if (!url || typeof url !== 'string') return null;

    url = url.trim();

    // Check for protocol-less URLs and common patterns
    if (url.startsWith('data:')) return url;
    if (url.startsWith('blob:')) return url;
    if (url.startsWith('http://')) return url;
    if (url.startsWith('https://')) return url;

    // Check if it looks like a domain/hostname
    if (url.includes('.') && !url.includes(' ')) {
      return 'https://' + url;
    }

    // If it's a relative path or generic string, prepend https://
    return 'https://' + url;
  }

  // Create warning modal
  function showWarning(message, details) {
    const modal = document.createElement('div');
    modal.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 999999;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    `;

    const box = document.createElement('div');
    box.style.cssText = `
      background: white;
      border-radius: 12px;
      padding: 32px;
      max-width: 500px;
      width: 90%;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      animation: slideIn 0.3s ease-out;
    `;

    const style = document.createElement('style');
    style.textContent = `
      @keyframes slideIn {
        from {
          opacity: 0;
          transform: translateY(-20px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }
      .warning-title {
        font-size: 20px;
        font-weight: 600;
        color: #d32f2f;
        margin: 0 0 12px 0;
      }
      .warning-message {
        font-size: 14px;
        color: #555;
        margin: 0 0 16px 0;
        line-height: 1.6;
      }
      .warning-code {
        background: #f5f5f5;
        border-left: 4px solid #d32f2f;
        padding: 12px;
        border-radius: 4px;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 12px;
        color: #333;
        margin: 16px 0;
        overflow-x: auto;
        line-height: 1.5;
      }
      .warning-button {
        background: #d32f2f;
        color: white;
        border: none;
        padding: 10px 20px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background 0.2s;
      }
      .warning-button:hover {
        background: #b71c1c;
      }
    `;
    document.head.appendChild(style);

    box.innerHTML = `
      <h2 class="warning-title">⚠️ Configuration Error</h2>
      <p class="warning-message">${message}</p>
      <div class="warning-code">${details}</div>
      <button class="warning-button" onclick="this.parentElement.parentElement.remove()">Dismiss</button>
    `;

    modal.appendChild(box);
    document.body.appendChild(modal);
  }

  // Create hidden iframe and redirect
  function loadInIframe(url, tabName, tabImage) {
    // Create a hidden container for the iframe
    const container = document.createElement('div');
    container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
    `;

    const iframe = document.createElement('iframe');
    iframe.style.cssText = `
      width: 100%;
      height: 100%;
      border: none;
      margin: 0;
      padding: 0;
    `;
    iframe.src = url;
    iframe.sandbox.add('allow-same-origin');
    iframe.sandbox.add('allow-scripts');
    iframe.sandbox.add('allow-forms');
    iframe.sandbox.add('allow-popups');
    iframe.sandbox.add('allow-popups-to-escape-sandbox');
    iframe.sandbox.add('allow-presentation');

    container.appendChild(iframe);
    document.documentElement.innerHTML = '';
    document.body.innerHTML = '';
    document.documentElement.appendChild(container);

    // Update document metadata
    if (tabName) {
      document.title = tabName;
    }
    if (tabImage) {
      let favicon = document.querySelector("link[rel='icon']");
      if (!favicon) {
        favicon = document.createElement('link');
        favicon.rel = 'icon';
        document.head.appendChild(favicon);
      }
      favicon.href = tabImage;
    }

    // History spoofing
    if (window.history && window.history.replaceState) {
      try {
        window.history.replaceState(
          { page: 1 },
          tabName || 'Loaded',
          window.location.href
        );
      } catch (e) {
        console.warn('History spoofing unavailable:', e.message);
      }
    }
  }

  // Create blob with HTML containing the iframe
  function createBlobUrl(url, tabName, tabImage) {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${tabName || 'Loading'}</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            border: 0;
          }
          html, body {
            width: 100%;
            height: 100%;
            overflow: hidden;
          }
          iframe {
            width: 100%;
            height: 100%;
            display: block;
          }
        </style>
        ${tabImage ? `<link rel="icon" href="${tabImage}">` : ''}
      </head>
      <body>
        <iframe src="${url}" sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-presentation allow-downloads allow-modals"></iframe>
      </body>
      </html>
    `;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    return URL.createObjectURL(blob);
  }

  // Main execution
  function init() {
    const config = parseData(dataAttr);

    // Validate link parameter
    if (!config.link) {
      const usage = `
&lt;script src='https://kbsigmaboy67.github.io/-/s.js' 
  data='link\`https://example.com\`;tab-name\`My Page\`;tab-image\`/icon.png\`;' 
/&gt;

Supported Formats:
  • link\`url\` - Backticks style (recommended)
  • link:\`url\` - Backticks with colons
  • link:url; - Simple colons with semicolons

Parameters:
  • link (REQUIRED): URL to load (http://, https://, data:, blob:)
  • tab-name (optional): Browser tab title
  • tab-image (optional): Favicon URL
      `;
      showWarning(
        'Missing or invalid <code>link</code> parameter',
        usage
      );
      return;
    }

    // Normalize the URL
    const normalizedUrl = normalizeUrl(config.link);

    if (!normalizedUrl) {
      showWarning(
        'Could not parse the provided link URL',
        `Attempted to normalize: "${config.link}"`
      );
      return;
    }

    // Create blob URL and redirect
    const blobUrl = createBlobUrl(normalizedUrl, config.tabName, config.tabImage);

    // Replace current page with blob-based iframe
    try {
      window.location.replace(blobUrl);
    } catch (e) {
      // Fallback: use assignment if replace fails
      console.warn('location.replace failed, using assignment:', e.message);
      window.location = blobUrl;
    }
  }

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
