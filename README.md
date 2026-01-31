# Kshiteej Ramgundewar - Premium Portfolio

A high-performance, interactive portfolio website built with modern web technologies.

## Tech Stack
- **HTML5 & CSS3**: Semantic structure and styling.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **GSAP (GreenSock Animation Platform)**: Powering complex animations and ScrollTrigger.
- **Locomotive Scroll**: For that premium "smooth scroll" feel.
- **Three.js**: WebGL library for the 3D particle background in the Hero section.

## Features
- 🌌 **Immersive Hero**: 3D particle system reacting to mouse movement.
- 🖱️ **Custom Cursor**: Interactive cursor follower with blend modes.
- 📜 **Smooth Scrolling**: Momentum-based scrolling.
- ↔️ **Horizontal Scroll**: Unique project showcase that scrolls horizontally while you scroll down.
- 📱 **Fully Responsive**: Adapts seamlessy to mobile devices (horizontal scroll becomes vertical).

## Customization Guide

### 1. Personal Information
Open `index.html` and search for the text you want to change.
- **Name/Bio**: Update the text inside the `#hero` and `#about` sections.
- **Links**: Update `href` attributes for social links in the `#contact` section.

### 2. Images
Replace the images in the `public/images` folder.
- `project1.jpg`, `project2.jpg`, `project3.jpg`: Project thumbnails.
- Ideally use images with 16:9 aspect ratio.

### 3. Projects
To add more projects, duplicate the `.project-card` div inside the `#projects` section in `index.html`.
*Note: If you add many projects, you might need to adjust the width of `.pin-wrap` in `css/style.css` (currently `200vw` or `300vw`).*

## Deployment

### Option 1: Netlify (Recommended)
1. Drag and drop the `public` folder into Netlify's "Sites" dashboard.
2. Done!

### Option 2: GitHub Pages
1. Push this repository to GitHub.
2. Go to Settings > Pages.
3. Select the `public` folder (or root if you move files up) as the source.

## License
Free to use for personal portfolios.
