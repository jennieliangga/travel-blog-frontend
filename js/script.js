// js/script.js
// Visitor Counter for Azure Resume Project

class VisitorCounter {
    constructor() {
        this.counterElement = document.getElementById('visitor-counter');
        // This will be updated to your actual Azure Function URL later
        this.functionUrl = 'https://visitor-counter-api-d3e2e9c9fjfzc3bs.switzerlandnorth-01.azurewebsites.net/api/VisitorCounter';
    }

    // Method to update the counter display
    updateDisplay(count) {
        // Target the inner container, not the main wrapper
        const counterContainer = this.counterElement.querySelector('.counter-container');
        if (counterContainer) {
            counterContainer.innerHTML = `
                <span class="counter-icon">👁️</span>
                <span class="counter-text">Visitors: </span>
                <span class="counter-number">${count}</span>
            `;
            
            // Add animation
            counterContainer.classList.add('counter-update');
            setTimeout(() => {
                counterContainer.classList.remove('counter-update');
            }, 500);
        }
    }

    // Method to show loading state
    showLoading() {
        const counterContainer = this.counterElement.querySelector('.counter-container');
        if (counterContainer) {
            counterContainer.innerHTML = `
                <span class="counter-icon">⏳</span>
                <span class="counter-text">Loading visitor count...</span>
            `;
        }
    }

    // Method to show error state
    showError(message = 'Visitor count unavailable') {
        const counterContainer = this.counterElement.querySelector('.counter-container');
        if (counterContainer) {
            counterContainer.innerHTML = `
                <span class="counter-icon">❌</span>
                <span class="counter-text">${message}</span>
            `;
            counterContainer.classList.add('error');
        }
    }

    // Make sure updateCounter() calls the real function, not the simulation
    async updateCounter() {
        this.showLoading();
        
        try {
            const response = await this.callRealAzureFunction();
            this.updateDisplay(response.count);
            
        } catch (error) {
            console.error('Failed to update visitor counter:', error);
            this.showError('Counter temporarily unavailable');
        }
    }

    // SIMULATION: This will be replaced with real Azure Function call
    // async simulateApiCall() {
    //     // Simulate network delay (800ms - 1.5s)
    //     const delay = Math.random() * 700 + 800;
    //     await new Promise(resolve => setTimeout(resolve, delay));
        
    //     // Simulate occasional API failures (10% chance)
    //     if (Math.random() < 0.1) {
    //         throw new Error('Simulated API failure');
    //     }
        
    //     // Generate realistic-looking visitor count
    //     const baseCount = 127; // Starting point
    //     const randomVariation = Math.floor(Math.random() * 50);
    //     const count = baseCount + randomVariation;
        
    //     // Simulate successful API response
    //     return {
    //         count: count,
    //         timestamp: new Date().toISOString(),
    //         status: 'success'
    //     };
    // }

    // REAL IMPLEMENTATION - Use this now!
    async callRealAzureFunction() {
        try {
            // Use GET method since your function doesn't need a request body
            const response = await fetch(this.functionUrl, {
                method: 'GET', // Changed from POST to GET
                headers: {
                    'Content-Type': 'application/json',
                }
                // No body needed for GET request
            });
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            
            const data = await response.json();
            return data;
            
        } catch (error) {
            console.error('Azure Function call failed:', error);
            throw error;
        }
    }
}

// Additional utility functions
const VisitorCounterUtils = {
    // Format large numbers with commas
    formatNumber: (num) => {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    
    // Get a random emoji for fun
    // getRandomEmoji: () => {
    //     const emojis = ['👁️', '👀', '🌎', '🚀', '💫', '⭐', '🔥', '✨'];
    //     return emojis[Math.floor(Math.random() * emojis.length)];
    // },
    
    // Check if we're in a development environment
    isDevelopment: () => {
        return window.location.hostname === 'localhost' || 
               window.location.hostname === '127.0.0.1';
    }
};

// Initialize visitor counter when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if visitor counter element exists on this page
    const counterElement = document.getElementById('visitor-counter');
    
    if (counterElement) {
        const visitorCounter = new VisitorCounter();
        
        // Update counter immediately
        visitorCounter.updateCounter();
        
        // Optional: Update every 30 seconds to show real-time changes
        // setInterval(() => {
        //     visitorCounter.updateCounter();
        // }, 30000);
        
        // For development: Add a reset button to test different states
        if (VisitorCounterUtils.isDevelopment()) {
            addDevelopmentTools(visitorCounter);
        }
    }
});

// Development tools - only added in local development
function addDevelopmentTools(visitorCounter) {
    const devTools = document.createElement('div');
    devTools.style.cssText = `
        position: fixed;
        bottom: 10px;
        right: 10px;
        background: #333;
        color: white;
        padding: 10px;
        border-radius: 5px;
        font-size: 12px;
        z-index: 10000;
    `;
    
    devTools.innerHTML = `
        <div style="margin-bottom: 5px;"><strong>Counter Dev Tools</strong></div>
        <button onclick="simulateSuccess()" style="margin: 2px; padding: 2px 5px;">Simulate Success</button>
        <button onclick="simulateError()" style="margin: 2px; padding: 2px 5px;">Simulate Error</button>
        <button onclick="simulateLoading()" style="margin: 2px; padding: 2px 5px;">Simulate Loading</button>
    `;
    
    document.body.appendChild(devTools);
    
    // Add global functions for testing
    window.simulateSuccess = () => {
        visitorCounter.updateDisplay(Math.floor(Math.random() * 1000));
    };
    
    window.simulateError = () => {
        visitorCounter.showError('Simulated error for testing');
    };
    
    window.simulateLoading = () => {
        visitorCounter.showLoading();
    };
}

// Export for potential module usage (if you convert to ES6 modules later)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { VisitorCounter, VisitorCounterUtils };
}