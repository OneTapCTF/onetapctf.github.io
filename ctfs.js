// CTF page specific JavaScript

// Function to load writeup from markdown file
async function loadWriteup(ctfName) {
    try {
        const response = await fetch(`writeups/${ctfName}.md`);

        if (!response.ok) {
            throw new Error('Writeup not found');
        }

        const markdown = await response.text();
        const html = parseMarkdown(markdown);

        document.getElementById('writeupContent').innerHTML = html;
        document.getElementById('writeupModal').style.display = 'block';

    } catch (error) {
        console.log('No writeup found for:', ctfName);
        showNoWriteupPopup();
    }
}

// Simple markdown parser
function parseMarkdown(markdown) {
    let html = markdown;

    // Headers
    html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
    html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
    html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');

    // Bold
    html = html.replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>');

    // Italic
    html = html.replace(/\*(.*)\*/gim, '<em>$1</em>');

    // Code blocks
    html = html.replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>');

    // Inline code
    html = html.replace(/`([^`]*)`/gim, '<code>$1</code>');

    // Images (must come before links)
    // HTML img tags
    html = html.replace(/<img\s+src="([^"]*)"(?:\s+alt="([^"]*)")?(?:\s+width="([^"]*)")?[^>]*>/gim, function (match, src, alt, width) {
        const altText = alt || 'Image';
        const widthAttr = width ? ` style="max-width: ${width}px; width: 100%; height: auto;"` : ' style="max-width: 100%; height: auto;"';
        const fullSrc = src.startsWith('http') ? src : `writeups/${src}`;
        return `<img src="${fullSrc}" alt="${altText}"${widthAttr} loading="lazy">`;
    });

    // Markdown style images ![alt](src)
    html = html.replace(/!\[([^\]]*)\]\(([^\)]*)\)/gim, function (match, alt, src) {
        const altText = alt || 'Image';
        const fullSrc = src.startsWith('http') ? src : `writeups/${src}`;
        return `<img src="${fullSrc}" alt="${altText}" style="max-width: 100%; height: auto;" loading="lazy">`;
    });

    // Links
    html = html.replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank">$1</a>');

    // Line breaks
    html = html.replace(/\n/gim, '<br>');

    return html;
}

// Close modal
function closeModal() {
    document.getElementById('writeupModal').style.display = 'none';
}

// Show no writeup popup
function showNoWriteupPopup() {
    document.getElementById('noWriteupPopup').style.display = 'block';
}

// Close popup
function closePopup() {
    document.getElementById('noWriteupPopup').style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function (event) {
    const modal = document.getElementById('writeupModal');
    const popup = document.getElementById('noWriteupPopup');

    if (event.target === modal) {
        closeModal();
    }

    if (event.target === popup) {
        closePopup();
    }
}