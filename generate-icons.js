import fs from 'fs';

// Create a simple colored square as SVG for PWA icons
const createIcon = (size, color = '#3b82f6') => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${size}" height="${size}" rx="${size * 0.125}" fill="${color}"/>
    <g transform="translate(${size * 0.25}, ${size * 0.3})">
      <rect width="${size * 0.5}" height="${size * 0.05}" fill="white"/>
      <rect y="${size * 0.08}" width="${size * 0.5}" height="${size * 0.05}" fill="white"/>
      <rect y="${size * 0.16}" width="${size * 0.375}" height="${size * 0.05}" fill="white"/>
      <rect y="${size * 0.24}" width="${size * 0.5}" height="${size * 0.05}" fill="white"/>
      <rect y="${size * 0.32}" width="${size * 0.33}" height="${size * 0.05}" fill="white"/>
    </g>
    <circle cx="${size * 0.75}" cy="${size * 0.25}" r="${size * 0.08}" fill="white"/>
    <path d="M${size * 0.71} ${size * 0.21}l${size * 0.04} ${size * 0.04} ${size * 0.08} -${size * 0.08}" stroke="${color}" stroke-width="${size * 0.015}" fill="none"/>
  </svg>`;
};

// Write icon files  
fs.writeFileSync('public/icon.svg', createIcon(192));
fs.writeFileSync('public/pwa-192x192.png', ''); // Placeholder
fs.writeFileSync('public/pwa-512x512.png', ''); // Placeholder
console.log('Created icon files');