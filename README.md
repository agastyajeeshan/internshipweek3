# Week 3 – JavaScript Interactivity

## Project: Northstar Studio

An interactive continuation of the Week 2 responsive Northstar Studio landing page. Built with semantic HTML5, CSS3 and plain JavaScript (ES6).

## Interactive features
- Mobile navigation menu toggled with JavaScript and ARIA state updates
- Light/dark theme switch; preference saved with localStorage
- Portfolio category filtering using data attributes and DOM manipulation
- Contact form validation for name, email and message
- Inline success/error feedback without reloading the page
- Service card buttons with contextual toast notifications
- Scroll-to-top button that appears after scrolling
- Scroll reveal effects using the Intersection Observer API
- Reduced-motion CSS support

## Technologies
- HTML5
- CSS3, Flexbox, Grid and media queries
- Vanilla JavaScript (ES6)
- DOM manipulation and event listeners
- Intersection Observer API
- localStorage

## Run locally
1. Extract the project folder.
2. Open `index.html` in a modern browser, or open the folder in VS Code and use Live Server.
3. Try the menu, theme toggle, project filters, service buttons and contact form.
4. Resize the browser or use Developer Tools to test mobile and tablet layouts.

## Important note about the contact form
The form performs client-side validation and displays a success message for demonstration. It does not send or store messages on a server. A backend or form service is required for real message delivery.

## Project structure
- `index.html` – page structure and interactive elements
- `style.css` – responsive layout and interaction states
- `script.js` – event handling, DOM updates and validation
- `README.md` – project instructions
- `Week3-Report.docx` – technical documentation
