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
        this.setState({ theme });
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
            }
        ];

        return mockRoles.filter(role => 
            role.name.toLowerCase().includes(query.toLowerCase()) ||
            role.description.toLowerCase().includes(query.toLowerCase()) ||
            role.permissions.some(perm => perm.toLowerCase().includes(query.toLowerCase()))
        );
    }

    setupEventListeners() {
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('theme-toggle')) {
                this.toggleTheme();
            }
        });

        document.addEventListener('submit', (e) => {
            if (e.target.classList.contains('search-form')) {
                this.handleSearch(e);
            }
        });

        document.addEventListener('input', (e) => {
            if (e.target.classList.contains('search-input')) {
                this.setState({ searchQuery: e.target.value });
            }
        });
    }

    render() {
        const { theme, searchQuery, results, loading, error, hasSearched } = this.state;
        
        const app = `
            <div class="app-container">
                <header class="header">
                    <div class="logo">
                        <div class="logo-icon">
                            <i data-lucide="shield-check"></i>
                        </div>
                        <span class="logo-text">Entra ID Role Finder</span>
                    </div>
                    <button class="theme-toggle">
                        <i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>
                        ${theme === 'dark' ? 'Light' : 'Dark'}
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
                                    ${loading ? '<i data-lucide="loader-2"></i> Searching...' : '<i data-lucide="search"></i> Find Role'}
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
        
        // Initialize Lucide icons after DOM update
        if (window.lucide) {
            lucide.createIcons();
        }
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
