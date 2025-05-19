# Bazeesh Water Company Website

A modern, responsive website for Bazeesh Water Company showcasing water products and company information.

## Setup Instructions

1. Clone or download this repository to your local machine.

2. Required Images:
   - Create an `images` folder in the root directory
   - Add the following images to the `images` folder:
     - `hero-bg.jpg` - A high-quality water-related background image for the hero section
     - `water-plant.jpg` - An image of your water treatment plant or facility
     - `500ml.jpg` - Image of your 500ml water bottle
     - `1.5L.jpg` - Image of your 1.5L water bottle
     - `19L.jpg` - Image of your 19L water bottle

3. To view the website:
   - Double-click the `index.html` file to open it in your default web browser
   - Or use a local development server:
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js
     npx http-server
     ```
   Then visit `http://localhost:8000` in your web browser.

## Features

- Responsive design that works on all devices
- Modern purple and blue theme
- Smooth scrolling navigation
- Interactive product cards with hover effects
- Contact form with validation
- Mobile-friendly navigation menu
- Fade-in animations on scroll

## Customization

You can customize the website by:

1. Modifying colors in the `styles.css` file:
   - Look for the `:root` section to change the color scheme
   - Current colors:
     - Primary: #6b5b95 (Purple)
     - Secondary: #4682b4 (Steel Blue)
     - Accent: #8a2be2 (Blue Violet)

2. Updating content in `index.html`:
   - Replace text content
   - Update contact information
   - Modify product descriptions

3. Adding more features in `script.js`:
   - Enhance form functionality
   - Add more animations
   - Implement additional interactive features

## Browser Support

The website is compatible with:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Opera (latest)

## Contact Form Integration

The contact form currently shows a success message but doesn't send data. To make it functional:
1. Set up a server to handle form submissions
2. Update the form handling code in `script.js`
3. Add your server endpoint URL
4. Implement proper form validation and error handling 