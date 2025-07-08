# Entra ID Role Finder Frontend

A simple, clean frontend application to search and find Entra ID roles and their permissions with a beautiful dark theme (with light theme option).

## Features

- 🔍 **Search Functionality**: Search roles by name, description, or permissions
- 🌙 **Dark Theme**: Beautiful dark theme as default with light theme option
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🎨 **Microsoft Design**: Uses Microsoft's design language and colors
- ⚡ **Fast**: Pure JavaScript with no dependencies
- 🔒 **Role Information**: View detailed role descriptions and permissions

## Project Structure

```
entraidrolefinder/
├── public/
│   ├── index.html              # Main HTML file
│   └── entra-id-favicon.svg     # Entra ID themed favicon
├── src/
│   ├── components/
│   │   └── App.js              # Main application component
│   ├── styles/
│   │   └── theme.css           # Theme styles (dark/light)
│   └── index.js                # Main entry point
├── package.json                # Project metadata
└── FRONTEND_README.md          # This file
```

## Getting Started

### Prerequisites

- Python 3.x (for running the development server)
- A modern web browser

### Installation & Running

1. **Clone or navigate to the project directory:**
   ```bash
   cd entraidrolefinder
   ```

2. **Start the development server:**
   ```bash
   # Using Python (recommended)
   python -m http.server 8000 --directory public
   
   # Or using npm script
   npm start
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:8000
   ```

## Usage

1. **Search for Roles**: Enter a search term in the input field (role name, description, or permission)
2. **View Results**: Results will display with role names, descriptions, and permissions
3. **Theme Toggle**: Click the theme toggle button to switch between dark and light themes

## Sample Search Terms

Try searching for:
- `Global Administrator` - Full admin access
- `User Administrator` - User management permissions
- `Application Administrator` - App management permissions
- `Security Administrator` - Security management permissions
- `User.ReadWrite.All` - Specific permission
- `Directory` - All roles with directory permissions

## Current Features

- **Mock Data**: Currently uses sample Entra ID roles for demonstration
- **Client-side Search**: All filtering happens in the browser
- **Theme Persistence**: Theme preference is maintained during the session
- **Responsive**: Works on mobile and desktop devices

## Future Enhancements

- Connect to actual Entra ID API or database
- Add more comprehensive role information
- Implement role comparison features
- Add export functionality
- User authentication and personalization

## Development

### File Structure

- **`public/index.html`**: Main HTML entry point
- **`src/components/App.js`**: Main application logic and UI
- **`src/styles/theme.css`**: All styling including dark/light themes
- **`src/index.js`**: Application initialization

### Styling

The application uses CSS custom properties (variables) for theming:
- Dark theme is the default
- Light theme can be toggled via the theme button
- Microsoft's design system colors are used throughout

### Adding New Roles

Currently, roles are defined in the `getMockResults()` method in `App.js`. To add new roles, simply add them to the `mockRoles` array.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use and modify as needed.
