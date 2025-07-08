# Entra ID Role Finder

A modern frontend application to find the least privileged Entra ID admin role for specific administrative tasks. Built with vanilla JavaScript for simplicity and performance.

## 🔍 Features

- **🎯 Smart Search**: Find the least privileged role for any administrative task
- **🎨 Modern UI**: Clean, responsive design with dark/light theme support
- **⚡ Fast & Lightweight**: Pure JavaScript with no framework dependencies
- **📱 Mobile Friendly**: Responsive design that works on all devices
- **🛡️ Security Focused**: Emphasizes least privilege principle
- **🔄 Theme-Aware**: Beautiful dark/light mode with matching favicons

## 🏗️ Tech Stack

- **Frontend**: Vanilla JavaScript (ES6+)
- **Styling**: CSS3 with CSS Variables
- **Icons**: Lucide Icons
- **Fonts**: Inter (Google Fonts)
- **Server**: Python HTTP Server (for development)
- **Deployment**: Any static hosting (GitHub Pages, Netlify, Vercel)

## 📁 Project Structure

```
entraidrolefinder/
├── src/
│   ├── components/
│   │   └── App.js                  # Main application component
│   ├── styles/
│   │   └── theme.css               # CSS styles and themes
│   └── index.js                    # Application entry point
├── entra-id-favicon-admin-*.svg     # Theme-aware favicons
├── index.html                      # Main HTML file
├── package.json                    # Project metadata and scripts
├── .gitignore                      # Git ignore rules
└── README.md                       # This file
```

## 🚀 Getting Started

### Prerequisites
- Python 3.6+ (for development server)
- Modern web browser

### Installation & Running

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/entraidrolefinder.git
   cd entraidrolefinder
   ```

2. **Start the development server**
   ```bash
   # Using Python (recommended)
   python -m http.server 8080
   
   # Or using npm script
   npm run dev
   ```

3. **Open in browser**
   Navigate to `http://localhost:8080`

### Available Scripts

- `npm run start` - Start development server on port 8000
- `npm run dev` - Start development server on port 8080

## 🧪 Testing the Search

Try these sample queries to test the search functionality:

### Basic Searches
- `user` - Find user-related roles
- `password` - Find password reset capabilities
- `billing` - Find billing administration roles
- `security` - Find security-related roles
- `device` - Find device management roles

### Permission-Based Searches
- `User.ReadWrite` - Find roles with user read/write permissions
- `Directory.Read` - Find roles with directory read permissions
- `Application.ReadWrite` - Find application management roles

### Task-Based Searches
- `reset password` - Find roles that can reset user passwords
- `create group` - Find roles that can create security groups
- `manage devices` - Find device administration roles

## 🎨 Design Features

### Visual Design
- **Modern Search Interface**: Integrated search container with icon and button
- **Theme Support**: Automatic dark/light mode switching
- **Responsive Layout**: Mobile-first design approach
- **Consistent Branding**: Matching favicon and header icons

### User Experience
- **Smart Input Handling**: No focus loss while typing
- **Visual Feedback**: Loading states and error handling
- **Accessibility**: Proper focus management and keyboard navigation
- **Performance**: Lightweight and fast loading

## 🔧 Customization

### Adding New Roles
Edit the `getMockResults()` method in `public/src/components/App.js` to add new roles:

```javascript
const mockRoles = [
    {
        id: 10,
        name: 'Your Custom Role',
        description: 'Description of what this role can do.',
        permissions: ['Permission.Name', 'Another.Permission']
    },
    // ... existing roles
];
```

### Theming
Modify CSS variables in `public/src/styles/theme.css`:

```css
:root {
    --primary-color: #your-color;
    --surface-color: #your-surface;
    /* ... other variables */
}
```

## 🚀 Deployment

### GitHub Pages
1. Push your code to GitHub
2. Go to repository Settings → Pages
3. Select source branch (usually `main`)
4. Your site will be available at `https://yourusername.github.io/entraidrolefinder`

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: (leave empty for static sites)
3. Set publish directory: `.` (root directory)
4. Deploy!

### Vercel
1. Import your GitHub repository to Vercel
2. Set framework preset: "Other"
3. Set output directory: `.` (root directory)
4. Deploy!

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Lucide Icons](https://lucide.dev/) for the beautiful icons
- [Inter Font](https://rsms.me/inter/) for the clean typography
- Microsoft for Entra ID documentation and role definitions

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](https://github.com/yourusername/entraidrolefinder/issues) page
2. Create a new issue if your problem isn't already reported
3. Provide as much detail as possible about your environment and the issue

---

**Made with ❤️ for the security community**
