// E-Commerce Hub - Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize form validation
    initializeFormValidation();
    
    // Initialize table enhancements
    initializeTableEnhancements();
    
    // Initialize interactive elements
    initializeInteractiveElements();
});

/**
 * Initialize form validation for the registration form
 */
function initializeFormValidation() {
    const form = document.getElementById('registrationForm');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            
            // Custom validation logic
            let isValid = true;
            
            // Check password match
            const password = document.getElementById('password');
            const confirmPassword = document.getElementById('confirm_password');
            
            if (password && confirmPassword) {
                if (password.value !== confirmPassword.value) {
                    confirmPassword.setCustomValidity('Passwords do not match');
                    isValid = false;
                } else {
                    confirmPassword.setCustomValidity('');
                }
            }
            
            // Check form validity
            if (form.checkValidity() && isValid) {
                // Show loading state
                const submitButton = form.querySelector('button[type="submit"]');
                const originalText = submitButton.innerHTML;
                
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Creating Account...';
                
                // Simulate processing time then submit
                setTimeout(() => {
                    form.submit();
                }, 1000);
            } else {
                form.classList.add('was-validated');
            }
        });
        
        // Real-time password matching validation
        const confirmPassword = document.getElementById('confirm_password');
        if (confirmPassword) {
            confirmPassword.addEventListener('input', function() {
                const password = document.getElementById('password');
                if (password && this.value !== password.value) {
                    this.setCustomValidity('Passwords do not match');
                } else {
                    this.setCustomValidity('');
                }
            });
        }
    }
}

/**
 * Initialize table enhancements
 */
function initializeTableEnhancements() {
    const productTable = document.getElementById('productTable');
    
    if (productTable) {
        // Add click handlers for table rows
        const tableRows = productTable.querySelectorAll('tbody tr');
        
        tableRows.forEach(row => {
            row.style.cursor = 'pointer';
            
            row.addEventListener('click', function() {
                // Highlight selected row
                tableRows.forEach(r => r.classList.remove('table-active'));
                this.classList.add('table-active');
                
                // Show product details (could be expanded to show modal)
                const productName = this.cells[2].textContent.trim();
                showToast(`Selected: ${productName}`, 'info');
            });
        });
        
        // Add search functionality
        addTableSearch();
    }
}

/**
 * Add search functionality to the product table
 */
function addTableSearch() {
    const tableContainer = document.querySelector('.table-responsive').parentElement;
    
    // Create search input
    const searchContainer = document.createElement('div');
    searchContainer.className = 'mb-3';
    searchContainer.innerHTML = `
        <div class="input-group">
            <span class="input-group-text">
                <i class="fas fa-search"></i>
            </span>
            <input type="text" id="tableSearch" class="form-control" placeholder="Search products...">
        </div>
    `;
    
    tableContainer.insertBefore(searchContainer, tableContainer.querySelector('.table-responsive'));
    
    // Add search functionality
    const searchInput = document.getElementById('tableSearch');
    const table = document.getElementById('productTable');
    const rows = table.querySelectorAll('tbody tr');
    
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            if (text.includes(searchTerm)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
        
        // Update visible count
        const visibleRows = Array.from(rows).filter(row => row.style.display !== 'none');
        updateSearchResults(visibleRows.length, rows.length);
    });
}

/**
 * Update search results count
 */
function updateSearchResults(visible, total) {
    let resultElement = document.getElementById('searchResults');
    
    if (!resultElement) {
        resultElement = document.createElement('small');
        resultElement.id = 'searchResults';
        resultElement.className = 'text-muted';
        document.getElementById('tableSearch').parentElement.parentElement.appendChild(resultElement);
    }
    
    if (visible < total) {
        resultElement.textContent = `Showing ${visible} of ${total} products`;
    } else {
        resultElement.textContent = '';
    }
}

/**
 * Initialize interactive elements
 */
function initializeInteractiveElements() {
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add loading states for buttons
    document.querySelectorAll('.btn').forEach(button => {
        if (button.type !== 'submit') {
            button.addEventListener('click', function() {
                // Add visual feedback for button clicks
                this.style.transform = 'scale(0.98)';
                setTimeout(() => {
                    this.style.transform = '';
                }, 150);
            });
        }
    });
    
    // Initialize tooltips if Bootstrap tooltips are available
    if (typeof bootstrap !== 'undefined' && bootstrap.Tooltip) {
        const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
        tooltipTriggerList.map(function (tooltipTriggerEl) {
            return new bootstrap.Tooltip(tooltipTriggerEl);
        });
    }
}

/**
 * Show toast notification
 */
function showToast(message, type = 'info') {
    // Create toast container if it doesn't exist
    let toastContainer = document.getElementById('toastContainer');
    if (!toastContainer) {
        toastContainer = document.createElement('div');
        toastContainer.id = 'toastContainer';
        toastContainer.className = 'toast-container position-fixed top-0 end-0 p-3';
        toastContainer.style.zIndex = '9999';
        document.body.appendChild(toastContainer);
    }
    
    // Create toast element
    const toastId = 'toast-' + Date.now();
    const toastHtml = `
        <div id="${toastId}" class="toast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <i class="fas fa-info-circle text-${type} me-2"></i>
                <strong class="me-auto">E-Commerce Hub</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                ${message}
            </div>
        </div>
    `;
    
    toastContainer.insertAdjacentHTML('beforeend', toastHtml);
    
    // Initialize and show toast
    const toastElement = document.getElementById(toastId);
    if (typeof bootstrap !== 'undefined' && bootstrap.Toast) {
        const toast = new bootstrap.Toast(toastElement);
        toast.show();
        
        // Remove toast element after it's hidden
        toastElement.addEventListener('hidden.bs.toast', function () {
            this.remove();
        });
    }
}

/**
 * Utility function to format currency
 */
function formatCurrency(amount, currency = 'USD') {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency
    }).format(amount);
}

/**
 * Utility function to format date
 */
function formatDate(date) {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).format(new Date(date));
}

// Export functions for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeFormValidation,
        initializeTableEnhancements,
        initializeInteractiveElements,
        showToast,
        formatCurrency,
        formatDate
    };
}
