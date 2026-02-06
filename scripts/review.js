function incrementReviewCounter() {
    let reviewCount = localStorage.getItem('reviewCount');
    
    if (reviewCount === null) {
        reviewCount = 0;
    } else {
        reviewCount = parseInt(reviewCount);
    }
    
    reviewCount++;
    
    localStorage.setItem('reviewCount', reviewCount);
    
    const counterElement = document.getElementById('reviewCounter');
    if (counterElement) {
        counterElement.textContent = reviewCount;
    }
}

function updateLastModified() {
    const lastModifiedElement = document.getElementById('lastModified');
    if (lastModifiedElement) {
        const now = new Date();
        const formattedDate = now.toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        });
        lastModifiedElement.textContent = formattedDate.replace(',', '');
    }
}

document.addEventListener('DOMContentLoaded', function() {
    incrementReviewCounter();
    updateLastModified();
});