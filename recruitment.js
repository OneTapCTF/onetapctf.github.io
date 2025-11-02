const recruitmentConfig = {
    isRecruiting: false, // true = active recruitment
    activeSkills: [] // Skills currently being recruited for
};

function updateRecruitmentStatus() {
    const recruitmentSection = document.querySelector('.recruitment-status');
    const recruitmentTitle = document.querySelector('.recruitment-title');
    const recruitmentTags = document.querySelector('.recruitment-tags');
    const recruitmentNote = document.querySelector('.recruitment-note');
    
    if (!recruitmentConfig.isRecruiting || recruitmentConfig.activeSkills.length === 0) {

        recruitmentSection.classList.add('no-recruitment');
        recruitmentTitle.textContent = 'Currently Not Recruiting';
        recruitmentTags.innerHTML = '<span class="tag inactive-recruitment">No Open Positions</span>';
        recruitmentNote.textContent = 'We are not actively recruiting at this time. Check back later!';
    } else {
   
        recruitmentSection.classList.remove('no-recruitment');
        recruitmentTitle.textContent = 'Currently Recruiting For:';
        
        const tagColors = {
            'pwn': '#ff6b6b',
            'reverse': '#4ecdc4',
            'crypto': '#45b7d1',
            'forensics': '#96ceb4',
            'web': '#feca57',
            'network': '#ff9ff3',
            'osint': '#54a0ff',
            'steganography': '#5f27cd',
            'pen-testing': '#00d2d3'
        };
        
        recruitmentTags.innerHTML = recruitmentConfig.activeSkills
            .map(skill => `<span class="tag active-recruitment" data-skill="${skill}">${skill.charAt(0).toUpperCase() + skill.slice(1)}</span>`)
            .join('');
            
        recruitmentNote.textContent = 'We are actively looking for skilled players in these categories';
    }
}

document.addEventListener('DOMContentLoaded', updateRecruitmentStatus);