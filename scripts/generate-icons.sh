#!/bin/bash
# Generates placeholder PWA icons
mkdir -p public/icons

# Create a simple SVG icon
cat > /tmp/mello-icon.svg << 'EOF'
<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="96" fill="#f87b4d"/>
  <text x="256" y="340" font-family="Arial Black, sans-serif" font-size="280" font-weight="900" text-anchor="middle" fill="white">E</text>
</svg>
EOF

echo "SVG icon created at /tmp/mello-icon.svg"
echo "To generate PNGs, run: npx svg2png /tmp/mello-icon.svg --width 192 --output public/icons/icon-192.png"
echo "For now, the app will work without the icon PNGs in development."
