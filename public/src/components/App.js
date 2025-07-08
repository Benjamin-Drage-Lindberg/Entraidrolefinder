class App {
    constructor() {
        this.state = {
            theme: 'dark',
            searchQuery: '',
            results: [],
            loading: false,
            error: null,
            hasSearched: false
        };
        
        this.init();
    }

    init() {
        this.render();
        this.setupEventListeners();
        this.setTheme(this.state.theme);
    }

    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        this.updateFavicon(theme);
        this.setState({ theme });
    }

    updateFavicon(theme) {
        const faviconLink = document.querySelector('link[rel="icon"]');
        if (faviconLink) {
            faviconLink.href = theme === 'dark' ? 'entra-id-favicon-admin-dark.svg' : 'entra-id-favicon-admin-light.svg';
        }
    }

    toggleTheme() {
        const newTheme = this.state.theme === 'dark' ? 'light' : 'dark';
        this.setTheme(newTheme);
    }

    async handleSearch(e) {
        e.preventDefault();
        const query = this.state.searchQuery.trim();
        
        if (!query) {
            this.setState({ error: 'Please enter a search term' });
            return;
        }

        this.setState({ loading: true, error: null, hasSearched: true });

        try {
            // Simulate API call - replace with actual API endpoint
            const mockResults = this.getMockResults(query);
            
            // Simulate loading delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            this.setState({ 
                results: mockResults,
                loading: false 
            });
        } catch (error) {
            this.setState({ 
                error: 'Failed to search roles. Please try again.',
                loading: false 
            });
        }
    }

    getMockResults(query) {
        const mockRoles = [
            {
                id: 1,
                name: 'Identity User Administrator',
                description: 'Limited management of user access and permissions.',
                permissions: ['User.ReadWrite.All', 'Group.ReadWrite.All']
            },
            {
                id: 2,
                name: 'Help Desk Administrator',
                description: 'Perform common troubleshooting tasks for users.',
                permissions: ['User.Read.All', 'Group.Read.All']
            },
            {
                id: 3,
                name: 'Application Manager',
                description: 'Manage applications with specific restrictions.',
                permissions: ['Application.ReadWrite.OwnedBy', 'Directory.Read.All']
            },
            {
                id: 4,
                name: 'Security Reader',
                description: 'Read security metrics and reports without making changes.',
                permissions: ['SecurityEvents.Read.All', 'Directory.Read.All']
            },
            {
                id: 5,
                name: 'Compliance Data Administrator',
                description: 'Manage compliance settings in a limited capacity.',
                permissions: ['ComplianceData.ReadWrite', 'Directory.ReadWrite.All']
            },
            {
                id: 6,
                name: 'Billing Administrator',
                description: 'Administer billing and subscription settings.',
                permissions: ['Billing.ReadWrite', 'Subscription.Read']
            },
            {
                id: 7,
                name: 'User Access Administrator',
                description: 'Manage user access to applications and resources.',
                permissions: ['RoleManagement.ReadWrite.Directory', 'User.Invite.All']
            },
            {
                id: 8,
                name: 'Device Administrator',
                description: 'Manage devices and perform device configurations.',
                permissions: ['Device.ReadWrite.All', 'Directory.ReadWrite.All']
            },
            {
                id: 9,
                name: 'Data Scientist',
                description: 'Analyze and work with organizational data.',
                permissions: ['Data.Read.All', 'Data.ScienceTools.ReadWrite']
            }
        ];

        return mockRoles.filter(role => 
            role.name.toLowerCase().includes(query.toLowerCase()) ||
            role.description.toLowerCase().includes(query.toLowerCase()) ||
            role.permissions.some(perm => perm.toLowerCase().includes(query.toLowerCase()))
        );
    }

    setupEventListeners() {
        // Use event delegation with more specific handling
        document.addEventListener('click', (e) => {
            if (e.target.closest('.theme-toggle')) {
                this.toggleTheme();
            }
        });

        document.addEventListener('submit', (e) => {
            if (e.target.closest('.search-form')) {
                this.handleSearch(e);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.matches('.search-input')) {
                // Update the state directly without re-rendering
                this.state.searchQuery = e.target.value;
            }
        });
    }

    render() {
        const { theme, searchQuery, results, loading, error, hasSearched } = this.state;
        
        // Store current focus element before re-render
        const activeElement = document.activeElement;
        const wasSearchInputFocused = activeElement && activeElement.classList.contains('search-input');
        const cursorPosition = wasSearchInputFocused ? activeElement.selectionStart : null;
        
        const app = `
            <div class="app-container">
                <header class="header">
                    <div class="logo">
                        <div class="logo-icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24">
                                <!-- Search icon within shield - matches favicon -->
                                <path d="M16 2 L26 6 L26 16 C26 22 21 28 16 30 C11 28 6 22 6 16 L6 6 Z" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linejoin="round"/>
                                <circle cx="14" cy="14" r="4" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                                <path d="m17 17 3 3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                        </div>
                        <span class="logo-text">Entra ID Role Finder</span>
                    </div>
                    <button class="theme-toggle">
                        <i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>
                        <span>${theme === 'dark' ? 'Light' : 'Dark'}</span>
                    </button>
                </header>

                <main class="main-content">
                    <section class="hero-section">
                        <h1>Find the Least Privileged Role</h1>
                        <p class="hero-subtitle">Enter an administrative task and discover the minimum required Entra ID role</p>
                    </section>

                    <section class="search-section">
                        <form class="search-form">
                            <div class="search-container">
                                <div class="search-icon">
                                    <i data-lucide="search"></i>
                                </div>
                                <input 
                                    type="text" 
                                    id="search-input"
                                    class="search-input"
                                    placeholder="e.g., Reset user password, Create security group, Manage app registrations"
                                    value="${searchQuery}"
                                >
                                <button type="submit" class="search-button" ${loading ? 'disabled' : ''}>
                                    ${loading ? '<i data-lucide="loader-2"></i> <span>Searching...</span>' : '<i data-lucide="search"></i> <span>Find Role</span>'}
                                </button>
                            </div>
                        </form>
                        ${error ? `<div class="error"><i data-lucide="alert-circle"></i> ${error}</div>` : ''}
                    </section>

                    ${hasSearched ? `
                        <section class="results-section">
                            <div class="results-header">
                                <h2><i data-lucide="shield"></i> Recommended Roles</h2>
                                <span class="results-count">
                                    ${loading ? 'Searching...' : `${results.length} role${results.length !== 1 ? 's' : ''} found`}
                                </span>
                            </div>
                            
                            ${loading ? `
                                <div class="loading">
                                    <div class="loading-spinner">
                                        <i data-lucide="loader-2"></i>
                                    </div>
                                    <p>Finding the least privileged role...</p>
                                </div>
                            ` : ''}
                            
                            ${!loading && results.length === 0 ? `
                                <div class="no-results">
                                    <i data-lucide="search-x"></i>
                                    <p>No roles found for this task.</p>
                                    <p class="no-results-hint">Try rephrasing your task or using different keywords.</p>
                                </div>
                            ` : ''}
                            
                            ${!loading && results.length > 0 ? `
                                <div class="results-list">
                                    ${results.map((role, index) => `
                                        <div class="result-item ${index === 0 ? 'recommended' : ''}">
                                            <div class="result-header">
                                                <div class="result-name">
                                                    ${index === 0 ? '<i data-lucide="star"></i>' : '<i data-lucide="shield"></i>'}
                                                    ${role.name}
                                                </div>
                                                ${index === 0 ? '<div class="recommended-badge">Recommended</div>' : ''}
                                            </div>
                                            <div class="result-description">${role.description}</div>
                                            <div class="result-permissions">
                                                <div class="permissions-header">
                                                    <i data-lucide="key"></i>
                                                    <span>Key Permissions</span>
                                                </div>
                                                <div class="permissions-list">
                                                    ${role.permissions.map(perm => `
                                                        <span class="permission-tag">${perm}</span>
                                                    `).join('')}
                                                </div>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            ` : ''}
                        </section>
                    ` : ''}
                </main>
            </div>
        `;

        document.getElementById('root').innerHTML = app;
        
        // Restore focus and cursor position if search input was focused
        if (wasSearchInputFocused) {
            const searchInput = document.querySelector('.search-input');
            if (searchInput) {
                searchInput.focus();
                if (cursorPosition !== null) {
                    searchInput.setSelectionRange(cursorPosition, cursorPosition);
                }
            }
        }
        
        // Initialize Lucide icons after DOM update
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Prevent multiple initializations
    if (!window.appInstance) {
        window.appInstance = new App();
    }
});
