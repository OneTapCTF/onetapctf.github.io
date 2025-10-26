// Apply page specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('applicationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        
        if (name.trim() === '' || description.trim() === '') {
            alert('Please fill in all fields');
            return;
        }
        
        // Simulate form submission
        showLoading();
        
        setTimeout(() => {
            hideLoading();
            alert('Application submitted successfully! We will review your application and get back to you soon.');
            form.reset();
        }, 2000);
    });
});

// Add character counter for textarea
document.getElementById('description').addEventListener('input', function() {
    const maxLength = 1000;
    const currentLength = this.value.length;
    
    // Create or update character counter
    let counter = document.getElementById('charCounter');
    if (!counter) {
        counter = document.createElement('div');
        counter.id = 'charCounter';
        counter.style.cssText = 'text-align: right; color: #8b5cf6; font-size: 0.9rem; margin-top: 0.5rem;';
        this.parentNode.appendChild(counter);
    }
    
    counter.textContent = `${currentLength}/${maxLength} characters`;
    
    if (currentLength > maxLength) {
        counter.style.color = '#ff6b6b';
        this.style.borderColor = '#ff6b6b';
    } else {
        counter.style.color = '#8b5cf6';
        this.style.borderColor = '#555';
    }
});