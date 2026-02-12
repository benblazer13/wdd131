function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            
            navLinks.classList.toggle('active');
        });
        
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }
}


function animateStats() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        const duration = 2000; 
        const increment = target / (duration / 16); 
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            
            if (current < target) {
                if (target >= 1000) {
                    stat.textContent = Math.floor(current).toLocaleString();
                } else {
                    stat.textContent = Math.floor(current) + '%';
                }
                requestAnimationFrame(updateCounter);
            } else {
                if (target >= 1000) {
                    stat.textContent = target.toLocaleString() + '+';
                } else {
                    stat.textContent = target + '%';
                }
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });
        
        observer.observe(stat);
    });
}


function initFeatureFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const featureCards = document.querySelectorAll('.detailed-feature');
    
    if (filterButtons.length === 0) return; 
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            featureCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}


function initCharacterCounters() {
    const subjectInput = document.getElementById('subject');
    const descriptionInput = document.getElementById('description');
    
    if (subjectInput) {
        const subjectCount = document.getElementById('subjectCount');
        
        subjectInput.addEventListener('input', () => {
            const length = subjectInput.value.length;
            subjectCount.textContent = length;
            
            if (length >= 90) {
                subjectCount.style.color = 'var(--danger-color)';
            } else if (length >= 70) {
                subjectCount.style.color = 'var(--warning-color)';
            } else {
                subjectCount.style.color = 'var(--text-secondary)';
            }
        });
    }
    
    if (descriptionInput) {
        const descriptionCount = document.getElementById('descriptionCount');
        
        descriptionInput.addEventListener('input', () => {
            const length = descriptionInput.value.length;
            descriptionCount.textContent = length;
        });
    }
}


function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.name;
    let errorMessage = '';
    let isValid = true;
    
    if (field.hasAttribute('required') && value === '') {
        errorMessage = 'This field is required';
        isValid = false;
    }
    else if (field.type === 'email' && value !== '') {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value)) {
            errorMessage = 'Please enter a valid email address';
            isValid = false;
        }
    }
    else if (field.hasAttribute('minlength')) {
        const minLength = parseInt(field.getAttribute('minlength'));
        if (value.length < minLength && value.length > 0) {
            errorMessage = `Minimum ${minLength} characters required`;
            isValid = false;
        }
    }
    
    const errorElement = document.getElementById(`${fieldName}Error`);
    if (errorElement) {
        if (!isValid) {
            errorElement.textContent = errorMessage;
            errorElement.classList.add('show');
            field.classList.add('error');
        } else {
            errorElement.textContent = '';
            errorElement.classList.remove('show');
            field.classList.remove('error');
        }
    }
    
    return isValid;
}


class Ticket {
    constructor(type, priority, name, email, subject, description, device, appVersion, updates) {
        this.id = this.generateTicketId();
        this.type = type;
        this.priority = priority;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.description = description;
        this.device = device || 'Not specified';
        this.appVersion = appVersion || 'Not specified';
        this.updates = updates;
        this.timestamp = new Date().toISOString();
        this.status = 'submitted';
    }
    
    generateTicketId() {
        const timestamp = Date.now();
        const random = Math.floor(Math.random() * 1000);
        return `TKT-${timestamp}-${random}`;
    }
    
    getFormattedDate() {
        const date = new Date(this.timestamp);
        return date.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'short', 
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}


const TicketStorage = {
    STORAGE_KEY: 'gogrocit_tickets',
    
    saveTicket(ticket) {
        const tickets = this.getAllTickets();
        tickets.push(ticket);
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(tickets));
    },
    
    getAllTickets() {
        const tickets = localStorage.getItem(this.STORAGE_KEY);
        return tickets ? JSON.parse(tickets) : [];
    },
    
    getRecentTickets(count = 5) {
        const tickets = this.getAllTickets();
        return tickets.slice(-count).reverse();
    },
    
    clearAllTickets() {
        localStorage.removeItem(this.STORAGE_KEY);
    }
};


function displayRecentTickets() {
    const ticketsList = document.getElementById('recentTicketsList');
    const noTicketsMessage = document.getElementById('noTickets');
    
    if (!ticketsList) return; 
    
    const recentTickets = TicketStorage.getRecentTickets(5);
    
    if (recentTickets.length === 0) {
        if (noTicketsMessage) {
            noTicketsMessage.classList.remove('hidden');
        }
        return;
    }
    
    if (noTicketsMessage) {
        noTicketsMessage.classList.add('hidden');
    }
    
    const ticketsHTML = recentTickets.map(ticket => {
        const badgeClass = ticket.type === 'bug' ? 'bug' : 'feature';
        const typeLabel = ticket.type.charAt(0).toUpperCase() + ticket.type.slice(1);
        
        return `
            <div class="ticket-card">
                <div class="ticket-header">
                    <span class="ticket-number">${ticket.id}</span>
                    <span class="ticket-badge ${badgeClass}">${typeLabel}</span>
                </div>
                <h3 class="ticket-subject">${ticket.subject}</h3>
                <p class="ticket-meta">
                    Submitted on ${ticket.getFormattedDate()} • Priority: ${ticket.priority}
                </p>
            </div>
        `;
    }).join('');
    
    ticketsList.innerHTML = ticketsHTML;
}


function initTicketForm() {
    const form = document.getElementById('ticketForm');
    
    if (!form) return; 
    
    const formFields = form.querySelectorAll('input, select, textarea');
    
    formFields.forEach(field => {
        field.addEventListener('blur', () => {
            validateField(field);
        });
    });
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isFormValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                isFormValid = false;
            }
        });
        
        if (!isFormValid) {
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }
        
        const ticket = new Ticket(
            form.ticketType.value,
            form.priority.value,
            form.name.value,
            form.email.value,
            form.subject.value,
            form.description.value,
            form.device.value,
            form.appVersion.value,
            form.updates.checked
        );
        
        TicketStorage.saveTicket(ticket);
        
        showSuccessMessage(ticket);
        
        form.reset();
        
        document.getElementById('subjectCount').textContent = '0';
        document.getElementById('descriptionCount').textContent = '0';
    });
    
    form.addEventListener('reset', () => {
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(error => {
            error.textContent = '';
            error.classList.remove('show');
        });
        
        const errorFields = form.querySelectorAll('.error');
        errorFields.forEach(field => {
            field.classList.remove('error');
        });
        
        setTimeout(() => {
            document.getElementById('subjectCount').textContent = '0';
            document.getElementById('descriptionCount').textContent = '0';
        }, 0);
    });
}


function showSuccessMessage(ticket) {
    const form = document.querySelector('.ticket-form');
    const successMessage = document.getElementById('successMessage');
    
    if (form && successMessage) {
        form.classList.add('hidden');
        
        document.getElementById('ticketNumber').textContent = ticket.id;
        document.getElementById('confirmEmail').textContent = ticket.email;
        
        successMessage.classList.remove('hidden');
        
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        displayRecentTickets();
    }
}


function initSubmitAnotherButton() {
    const submitAnotherBtn = document.getElementById('submitAnother');
    
    if (submitAnotherBtn) {
        submitAnotherBtn.addEventListener('click', () => {
            const form = document.querySelector('.ticket-form');
            const successMessage = document.getElementById('successMessage');
            
            successMessage.classList.add('hidden');
            
            form.classList.remove('hidden');
            
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }
}


function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                    }
                    
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}


document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    
    animateStats();
    
    initFeatureFilters();
    
    initCharacterCounters();
    
    initTicketForm();
    
    initSubmitAnotherButton();
    
    displayRecentTickets();
    
    initLazyLoading();
    
    console.log('GoGrocIt website initialized successfully!');
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#') return;
        
        e.preventDefault();
        
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

const updateFooterYear = () => {
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear && footerYear.textContent.includes('2026')) {
        const currentYear = new Date().getFullYear();
        footerYear.textContent = footerYear.textContent.replace('2026', currentYear);
    }
};

updateFooterYear();